import { resolveShortenedLinkAndCountAccess } from "@/app/functions/resolve-shortened-link-and-count-access"
import { isRight, unwrapEither } from "@/shared/either"
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { z } from "zod"

const paramsSchema = z.object({
    shortenedLink: z.string()
})

export const redirectRoute: FastifyPluginAsyncZod = async server => {
    server.get(
        '/r/:shortenedLink',
        {
            schema: {
                summary: 'Redirect to the original link from a shortened link and increment the click count',
                description: 'This route performs a redirect (302). Swagger cannot follow redirects; use browser or curl to test.',
                tags: ['Shortened Links'],
                params: paramsSchema,
                response: {
                    302: z.object({}).describe('Redirected successfully'),
                    404: z.object({ message: z.string() }).describe('Shortened link not found'),
                    500: z.object({ message: z.string() }).describe('Internal server error'),
                },
            },
        },
        async (request, reply) => {
            const { shortenedLink } = request.params as z.infer<typeof paramsSchema>

            const result = await resolveShortenedLinkAndCountAccess(shortenedLink)

            if (isRight(result)) {
                const originalLink = unwrapEither(result)
                
                return reply.redirect(originalLink)
            }

            const error = unwrapEither(result)

            if (error === 'SHORTENED_LINK_NOT_FOUND') {
                return reply.status(404).send({ message: 'Shortened link not found' })
            }

            return reply.status(500).send({ message: 'An unknown error occurred' })
        }
    )
}