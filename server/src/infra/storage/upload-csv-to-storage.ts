import { Upload } from '@aws-sdk/lib-storage';
import { env } from "@/env";
import { basename, extname } from "node:path";
import { r2Client } from "./r2-client";
import { uuidv7 } from "uuidv7";
import { z } from "zod";
import { Readable } from "node:stream";
import { randomUUID } from 'node:crypto';

const uploadFileInputSchema = z.object({
    folder: z.enum(['downloads']),
    fileName: z.string(),
    contentType: z.enum([
        'text/csv',
        'image/png',
        'image/jpeg',
        'application/pdf',
        'application/json',
        'text/html',
        'text/plain',
        'application/zip',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]),
    contentStream: z.instanceof(Readable)
})

export type UploadFileToStorageInput = z.infer<typeof uploadFileInputSchema>;

export type UploadFileToStorageOutput = {
    key: string;
    url: string;
}

export async function uploadCsvToStorage(
    input: UploadFileToStorageInput
): Promise<UploadFileToStorageOutput> {
    const { folder, fileName, contentType, contentStream } = uploadFileInputSchema.parse(input)

    const fileExtension = extname(fileName)
    const fileNameWithoutExtension = basename(fileName)
    const sanitizedFileName = fileNameWithoutExtension.replace(
        /[^a-zA-Z0-9]/gi,
        ''
    )
    const sanitizedFileNameWithExtension = sanitizedFileName.concat(fileExtension)

    const uniqueFileName = `${folder}/${randomUUID()}-${sanitizedFileNameWithExtension}`

    const upload = new Upload({
        client: r2Client,
        params: {
            Bucket: env.CLOUDFLARE_BUCKET,
            Key: uniqueFileName,
            Body: contentStream,
            ContentType: contentType,
        },
    })

    console.log('[Upload] Iniciando upload para o R2...');
    try {
        await upload.done();
        console.log('[Upload] Upload concluído com sucesso.');
    } catch (err) {
        console.error('[Upload] Erro durante upload:', err);
        throw err;
    }

    return {
        key: uniqueFileName,
        url: new URL(uniqueFileName, env.CLOUDFLARE_PUBLIC_URL).toString()
    }
}
