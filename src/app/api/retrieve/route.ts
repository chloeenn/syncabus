import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";

const s3 = new S3Client({
    region: process.env.S3_AWS_REGION!,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    },
});

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const fileKey = searchParams.get("key");
        if (!fileKey) {
            return NextResponse.json({ error: "Missing file key" }, { status: 400 });
        }
        const command = new GetObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME!,
            Key: fileKey,
        });
        const signedUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
        return NextResponse.json({ url: signedUrl });
    } catch (error) {
        console.error("S3 retrieve error:", error);
        return NextResponse.json({ error: "Failed to generate S3 URL" }, { status: 500 });
    }
}
