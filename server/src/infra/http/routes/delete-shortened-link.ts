import { deleteShortenedLink } from "@/app/functions/delete-shortened-link"
import { isRight, unwrapEither } from "@/shared/either"
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { z } from "zod"

const paramsSchema = z.object({
  id: z.string().describe('ID of the shortened link to delete')
})

export const deleteShortenedLinkRoute: FastifyPluginAsyncZod = async server => {
    server.delete(
        '/shortened-links/:id',
        {
            schema: {
                summary: 'Delete a shortened link',
                tags: ['Shortened Links'],
                params: paramsSchema,
                response: {
                    204: z
                        .undefined()
                        .describe('Shortened link has been successfully deleted.'),
                    404: z
                        .object({ message: z.string() })
                        .describe(
                        'No shortened link was found for the shortened link provided in the URL path.',
                        ),
                    500: z
                        .object({ message: z.string() })
                        .describe('An unknown error occurred while deleting the shortened link.'),
                }
            }
        },
        async (request, reply) => {
            const { id } = request.params as z.infer<typeof paramsSchema>

            const result = await deleteShortenedLink(id)

            if (isRight(result)) {
                return reply.status(204).send()
            }

            const error = unwrapEither(result)

            switch (error) {
                case 'SHORTENED_LINK_NOT_FOUND':
                    return reply.status(404).send({ message: 'Shortened link not found' })
                case 'UNKNOWN_ERROR':
                default:
                    console.error('[DeleteShortenedLink] Unknown error:', error);
                    return reply.status(500).send({ message: 'An unknown error occurred' })
            }
        }
    )
}

