import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { Either, makeLeft, makeRight } from "@/shared/either";
import { eq } from "drizzle-orm";

export async function getOriginalLinkByShortenedLink(
    input: string
): Promise<Either<'SHORTENED_LINK_NOT_FOUND' | 'UNKNOWN_ERROR', { originalLink: string }>> {
    const shortenedLinksSchema = schema.shortenedLinks;

    try {
        const result = await db
            .select({ originalLink: shortenedLinksSchema.originalLink })
            .from(shortenedLinksSchema)
            .where(eq(shortenedLinksSchema.shortenedLink, input ))
            .limit(1)

        if (result.length === 0) {
            return makeLeft('SHORTENED_LINK_NOT_FOUND')
        }

        return makeRight({ originalLink: result[0].originalLink });
    } catch (error: any) {
        console.error('[GetOriginalLinkByShortenedLink] Unknown error:', error)
        return makeLeft('UNKNOWN_ERROR')
    }
}