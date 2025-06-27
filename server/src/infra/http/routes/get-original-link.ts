import { getOriginalLinkByShortenedLink } from "@/app/functions/get-original-link-by-shortened-link";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { isRight, unwrapEither } from '@/shared/either';

const paramsSchema = z.object({
  shortenedLink: z.string().describe('Shortened link to retrieve the original link for')
})

export const getOriginalLinkRoute: FastifyPluginAsyncZod = async server => {
    server.get(
        '/shortened-links/:shortenedLink',
        {
            schema: {
                summary: 'Get the original link from a shortened link',
                tags: ['Shortened Links'],
                params: paramsSchema,
                response: {
                    200: z.object({ originalLink: z.string() }).describe('Original link retrieved successfully'),
                    404: z.object({ message: z.string() }).describe('Shortened link not found'),
                    500: z.object({ message: z.string() }).describe('Internal server error'),
                },
            },
        },
        async (request, reply) => {
            const { shortenedLink } = request.params as z.infer<typeof paramsSchema>;

            
            const result = await getOriginalLinkByShortenedLink(shortenedLink);

            if (isRight(result)) {
                const { originalLink } = unwrapEither(result)

                return reply.status(200).send({ originalLink })
            }

            const error = unwrapEither(result);

            switch (error) {
                case 'SHORTENED_LINK_NOT_FOUND':
                    return reply.status(404).send({ message: 'Shortened link not found' })
                case 'UNKNOWN_ERROR':
                default:
                    console.error('[DeleteShortenedLink] Unknown error:', error);
                    return reply.status(500).send({ message: 'An unknown error occurred' })
            }
        }
    );
}