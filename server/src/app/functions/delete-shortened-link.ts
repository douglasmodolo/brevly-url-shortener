import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { Either, makeLeft, makeRight } from "@/shared/either";
import { eq } from "drizzle-orm";

export async function deleteShortenedLink(
    input: string
): Promise<Either<'SHORTENED_LINK_NOT_FOUND' | 'UNKNOWN_ERROR', { id: string }>> {
    const shortenedLinksSchema = schema.shortenedLinks;

    try {
        const result = await db
            .delete(shortenedLinksSchema)
            .where(eq(shortenedLinksSchema.id, input))
            .returning();

        if (result.length === 0) {
            return makeLeft('SHORTENED_LINK_NOT_FOUND')
        }

        return makeRight(result[0])
    } catch (error: any) {
        console.error('[DeleteShortenedLink] Unknown error:', error)
        return makeLeft('UNKNOWN_ERROR')
    }
}