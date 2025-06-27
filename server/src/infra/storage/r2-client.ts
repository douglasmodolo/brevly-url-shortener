import { env } from "@/env";
import { S3Client } from "@aws-sdk/client-s3";

export const r2Client = new S3Client({
    region: 'auto',
    //endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    endpoint: 'https://34c87ab1613a1afc6567344b2e5c1088.r2.cloudflarestorage.com/brevly',
    credentials: {
        accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID,
        secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY,
    },
})