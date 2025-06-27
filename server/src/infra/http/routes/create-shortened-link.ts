import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createShortenedLink } from '@/app/functions/create-shortened-link';
import { createShortenedLinkInputSchema } from '@/app/schemas/create-shortened-link';
import { isRight, unwrapEither } from '@/shared/either';
import { z } from 'zod';

export const createShortenedLinkRoute: FastifyPluginAsyncZod = async server => {
    server.post(
        '/shortened-links',
        {
            schema: {
                summary: 'Create a new shortened link',
                tags: ['Shortened Links'],
                body: createShortenedLinkInputSchema,
                response: {
                    201: z.object({ id: z.string() }).describe('Shortened Link Created'),
                    400: z.object({ message: z.string() }).catchall(z.any()).describe('Bad Request'),
                    500: z.object({ message: z.string() }).describe('Internal server error'),
                }
            }
        },
        async (request, reply) => {
            const { shortenedLink, originalLink } = request.body as z.infer<typeof createShortenedLinkInputSchema>

            const result = await createShortenedLink({
                shortenedLink,
                originalLink
            })

            if (isRight(result)) {
                const { id } = unwrapEither(result)

                return reply
                    .header('location', `/shortened-links/${id}`)
                    .status(201)
                    .send({ id })
            }

            const error = unwrapEither(result)

            switch (error) {
                case 'SHORTENED_LINK_ALREADY_EXISTS':
                    return reply.status(400).send({ message: 'Shortened link already exists' })
                case 'UNKNOWN_ERROR':
                default:
                    console.error('[CreateShortenedLink] Unknown error:', error);
                    return reply.status(500).send({ message: 'An unknown error occurred' })
            }        
        }
    )
}