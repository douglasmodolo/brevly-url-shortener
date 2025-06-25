import { type Either, makeLeft, makeRight } from "@/shared/either";
import { CreateShortenedLinkInput, createShortenedLinkInputSchema } from "../schemas/create-shortened-link";
import { ShortenedLinkCreationError } from "../errors/shortened-link-errors";
import { schema } from "@/infra/db/schemas";
import { db } from "@/infra/db";

export async function createShortenedLink(
    input: CreateShortenedLinkInput
): Promise<Either<ShortenedLinkCreationError, { id: string }>> {
    const { shortenedUrl, originalUrl } = createShortenedLinkInputSchema.parse(input);

    const shortenedLinksSchema = schema.shortenedLinks;

    try {
        const [newShortenedUrl] = await db
            .insert(shortenedLinksSchema)
            .values({ shortenedUrl, originalUrl,})
            .returning({ id: shortenedLinksSchema.id })

        return makeRight({ id: newShortenedUrl.id })
    } catch (error: any) {
        const isUniqueViolation =
            error?.code === "23505" || error?.message?.includes("shortened_url")

        if (isUniqueViolation) {
            return makeLeft("SHORTENED_URL_ALREADY_EXISTS")
        }

        console.error("[CreateShortenedLink] Unknown error:", error)
        return makeLeft("UNKNOWN_ERROR")
    }
}