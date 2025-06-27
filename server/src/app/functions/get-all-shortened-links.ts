import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { Either, makeLeft, makeRight } from "@/shared/either";
import { desc } from "drizzle-orm";

type ShortenedLinkError = 'SHORTENED_LINKS_NOT_FOUND' | 'UNKNOWN_ERROR';
type ShortenedLink = {
  id: string;
  shortenedLink: string;
  originalLink: string;
  accessCount?: number;
  createdAt: Date;
};

export async function getAllShortenedLinks(): Promise<Either<ShortenedLinkError, ShortenedLink[]>> {
  const shortenedLinksSchema = schema.shortenedLinks;
  
  try {
    const result = await db
      .select({
        id: shortenedLinksSchema.id,
        shortenedLink: shortenedLinksSchema.shortenedLink,
        originalLink: shortenedLinksSchema.originalLink,
        accessCount: shortenedLinksSchema.accessCount,
        createdAt: shortenedLinksSchema.createdAt,
      })
      .from(shortenedLinksSchema)
      .orderBy(desc(shortenedLinksSchema.createdAt));

    if (result.length === 0) {
      return makeLeft('SHORTENED_LINKS_NOT_FOUND');
    }

    return makeRight(result);
  } catch (error: unknown) {
    console.error('[getAllShortenedLinks] Unknown error:', error);
    return makeLeft('UNKNOWN_ERROR');
  }
}