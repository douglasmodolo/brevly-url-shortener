import { db, pg } from '@/infra/db';
import { schema } from '@/infra/db/schemas';
import { desc } from 'drizzle-orm';
import { stringify } from 'csv-stringify';
import { pipeline } from 'node:stream/promises';
import { PassThrough, Transform } from 'node:stream';
import { uploadCsvToStorage } from '@/infra/storage/upload-csv-to-storage';
import { Either, makeRight, makeLeft } from '@/shared/either';

type ExportShortenedLinksOutput = {
  reportUrl: string
}

export async function exportShortenedLinksToCsv(): Promise<
    Either<never, ExportShortenedLinksOutput>
> {
    const shortenedLinksSchema = schema.shortenedLinks

    const { sql, params } = db
        .select({
            id: shortenedLinksSchema.id,
            shortenedLink: shortenedLinksSchema.shortenedLink,
            originalLink: shortenedLinksSchema.originalLink,
            accessCount: shortenedLinksSchema.accessCount,
            createdAt: shortenedLinksSchema.createdAt,
        })
        .from(shortenedLinksSchema)
        .orderBy(desc(shortenedLinksSchema.createdAt))
        .toSQL()

    const cursor = pg.unsafe(sql, params as string[]).cursor(30)

    const csv = stringify({
        delimiter: ',',
        header: true,
        columns: [
            { key: 'id', header: 'ID' },
            { key: 'shortened_link', header: 'Shortened Link' },
            { key: 'original_link', header: 'Original Link' },
            { key: 'access_count', header: 'Access Count' },
            { key: 'created_at', header: 'Created At' },
        ],
    })

    const uploadToStorageStream = new PassThrough();    

    const convertToCsvPipeline = pipeline(
        cursor,
        new Transform({
            objectMode: true,
            transform(chunks: unknown[], _, callback) {
                for (const chunk of chunks) {
                    this.push(chunk)
                }
                callback();
            }
        }),
        csv,
        uploadToStorageStream
    )
 
    const uploadToStorage = uploadCsvToStorage({
        contentType: 'text/csv',
        folder: 'downloads',
        fileName: 'links.csv',
        contentStream: uploadToStorageStream,
    });

    const [{ url }] = await Promise.all([
        uploadToStorage,
        convertToCsvPipeline,
    ])    

    return makeRight({ reportUrl: url })
}