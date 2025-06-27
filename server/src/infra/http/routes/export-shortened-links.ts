import { exportShortenedLinksToCsv } from "@/app/functions/export-shortened-links-to-csv"
import { isRight, unwrapEither } from "@/shared/either"
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { z } from "zod"

export const exportShortenedLinksRoute: FastifyPluginAsyncZod = async server => {
    server.get(
        '/shortened-links/export',
        {
            schema: {
                summary: 'Export all shortened links',
                tags: ['Shortened Links'],
                response: {
                    200: z.object({
                        reportUrl: z.string().url().describe('URL to download the exported report'),
                    }),
                    500: z.object({ message: z.string() }).describe('Internal server error'),
                },
            },
        },
        async ( _, reply) => {
            const result = await exportShortenedLinksToCsv()

            const { reportUrl } = unwrapEither(result)

            return reply.status(200).send({ reportUrl })
        }
    )
}
