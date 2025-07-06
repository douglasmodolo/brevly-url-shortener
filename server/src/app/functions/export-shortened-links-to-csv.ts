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

function formatDateToBrTimestamp(date: Date): string {
  const localDate = new Date(date.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));

  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, '0');
  const day = String(localDate.getDate()).padStart(2, '0');
  const hours = String(localDate.getHours()).padStart(2, '0');
  const minutes = String(localDate.getMinutes()).padStart(2, '0');
  const seconds = String(localDate.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
                    const c = chunk as any;
                    this.push({
                    id: c.id,
                    shortened_link: c.shortened_link,
                    original_link: c.original_link,
                    access_count: c.access_count,
                    created_at: formatDateToBrTimestamp(new Date(c.created_at)),
                    });
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
        fileName: 'links',
        contentStream: uploadToStorageStream,
    });

    const [{ url }] = await Promise.all([
        uploadToStorage,
        convertToCsvPipeline,
    ])    

    return makeRight({ reportUrl: url })
}