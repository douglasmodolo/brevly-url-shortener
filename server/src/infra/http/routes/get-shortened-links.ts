import { getAllShortenedLinks } from "@/app/functions/get-all-shortened-links";
import { isRight, unwrapEither } from "@/shared/either";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const getShortenedLinksRoute: FastifyPluginAsyncZod = async server => {
    server.get(
        '/shortened-links',
        {
            schema: {
                summary: 'Get all shortened links',
                tags: ['Shortened Links'],
                response: {
                    200: z.array(
                        z.object({
                            id: z.string().describe('ID of the shortened link'),
                            shortenedLink: z.string().describe('Shortened link'),
                            originalLink: z.string().describe('Original link'),
                            accessCount: z.number().optional().describe('Number of times the shortened link has been accessed'),
                            createdAt: z.string().describe('Creation timestamp of the shortened link'),
                        })
                    ).describe('List of all shortened links'),
                    404: z.object({ message: z.string() }).describe('No shortened links found'),
                    500: z.object({ message: z.string() }).describe('Internal server error'),
                },
            },
        },
        async (request, reply) => {
            const result = await getAllShortenedLinks();

            if (isRight(result)) {                    
                const links = unwrapEither(result);
                return reply.status(200).send(
                    links.map(link => ({
                        ...link,
                        createdAt: link.createdAt.toISOString(), // Convert Date to ISO string for JSON compatibility
                    }))
                )
            }

            const error = unwrapEither(result);

            switch (error) {
                case 'SHORTENED_LINKS_NOT_FOUND':
                    return reply.status(404).send({ message: 'No shortened links found' });
                case 'UNKNOWN_ERROR':
                default:
                    console.error('[GetShortenedLinks] Unknown error:', error);
                    return reply.status(500).send({ message: 'An unknown error occurred' });
            }
        }
    );
}