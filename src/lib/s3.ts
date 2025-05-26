// lib/s3.ts
import { S3Client, GetObjectCommand, GetObjectCommandInput } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Readable } from "stream";
export const s3 = new S3Client({
  region: process.env.S3_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
});

export async function downloadFromS3(key: string): Promise<Buffer> {
  console.log(`Downloaded ${key} from S3.`);
  const input: GetObjectCommandInput = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key,
  };
  const command = new GetObjectCommand(input);
  const response = await s3.send(command);
  const stream = response.Body as Readable;
  const chunks : Buffer[] = [];
  for await(const chunk of stream){
    chunks.push(chunk);
  }
  console.log(`Downloaded ${key} from S3. Buffer size: ${Buffer.concat(chunks).length} bytes`);
  return Buffer.concat(chunks);
}

export async function getSignedS3URL(fileKey: string, expiresIn: number = 300): Promise<string>{
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: fileKey,
  });
  return await getSignedUrl(s3, command, { expiresIn: expiresIn });
}