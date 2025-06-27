import { type Either, makeLeft, makeRight } from "@/shared/either";
import { CreateShortenedLinkInput, createShortenedLinkInputSchema } from "../schemas/create-shortened-link";
import { ShortenedLinkCreationError } from "../errors/shortened-link-errors";
import { schema } from "@/infra/db/schemas";
import { db } from "@/infra/db";

export async function createShortenedLink(
    input: CreateShortenedLinkInput
): Promise<Either<ShortenedLinkCreationError, { id: string }>> {
    const { shortenedLink, originalLink } = createShortenedLinkInputSchema.parse(input);

    const shortenedLinksSchema = schema.shortenedLinks;

    try {
        const [newShortenedLink] = await db
            .insert(shortenedLinksSchema)
            .values({ shortenedLink, originalLink,})
            .returning({ id: shortenedLinksSchema.id })

        return makeRight({ id: newShortenedLink.id })
    } catch (error: any) {
        const isUniqueViolation =
            error?.code === "23505" || error?.message?.includes("shortened_link")

        if (isUniqueViolation) {
            return makeLeft("SHORTENED_LINK_ALREADY_EXISTS")
        }

        console.error("[CreateShortenedLink] Unknown error:", error)
        return makeLeft("UNKNOWN_ERROR")
    }
}