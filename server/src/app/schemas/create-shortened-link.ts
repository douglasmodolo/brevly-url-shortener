import { z } from "zod";

export const createShortenedLinkInputSchema = z.object({
    shortenedLink: z
        .string()
        .min(3, "Shortened link must be at least 3 character long")
        .regex(/^[a-zA-Z0-9_-]+$/, {
            message: 'Shortened link must only contain letters, numbers, _ or -',
        }),
    originalLink: z
        .string()
        .url("Original URL must be a valid URL"),
})

export type CreateShortenedLinkInput = z.infer<typeof createShortenedLinkInputSchema>