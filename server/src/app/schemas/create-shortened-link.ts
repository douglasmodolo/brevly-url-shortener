import { z } from "zod";

export const createShortenedLinkInputSchema = z.object({
    shortenedUrl: z
        .string()
        .min(3, "Shortened URL must be at least 3 character long")
        .regex(/^[a-zA-Z0-9_-]+$/, {
            message: 'Shortened URL must only contain letters, numbers, _ or -',
        }),
    originalUrl: z
        .string()
        .url("Original URL must be a valid URL"),
})

export type CreateShortenedLinkInput = z.infer<typeof createShortenedLinkInputSchema>