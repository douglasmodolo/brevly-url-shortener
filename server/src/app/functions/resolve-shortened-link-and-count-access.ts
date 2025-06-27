import { Either, makeLeft, makeRight } from '@/shared/either';
import { shortenedLinks } from './../../infra/db/schemas/shortened-links';
import { db } from '@/infra/db';
import { eq } from 'drizzle-orm';

export async function resolveShortenedLinkAndCountAccess(
    shortenedLink: string
): Promise<Either<string, string>> {
    try {
        const link = await db.query.shortenedLinks.findFirst({
            where: (shortenedLinks, { eq }) => eq(shortenedLinks.shortenedLink, shortenedLink),
        })

        if (!link) {
            return makeLeft('SHORTENED_LINK_NOT_FOUND');
        }

        // Increment the access count
        await db.update(shortenedLinks)
            .set({ accessCount: (link.accessCount || 0) + 1 })
            .where(eq(shortenedLinks.id, link.id));

        return makeRight(link.originalLink);

    } catch (error) {
        console.error('[ResolveShortenedLinkAndCountAccess] Unknown error:', error);
        return makeLeft('UNKNOWN_ERROR');
    }
}