import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
    try {
        //Parse form data
        const data = await req.formData();
        const file = data.get("file") as File;
        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }
        const arrayBuffer = await file.arrayBuffer(); // Convert to ArrayBuffer
        const buffer = Buffer.from(arrayBuffer); // Convert to Node.js Buffer

        //Initialize S3 Client
        const s3 = new S3Client({
            region: `${process.env.S3_AWS_REGION}`,
            credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY!,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!
            },
            // ToDo: Remove workaround once https://github.com/aws/aws-sdk-js-v3/issues/6834 is fixed.
            requestChecksumCalculation: "WHEN_REQUIRED",
        })
        //PUT file
        const fileName = file.name.replace(/\s+/g, "-");
        const fileKey = `uploads/${Date.now().toString()}-${fileName}`;
        const input = {
            Bucket: process.env.S3_BUCKET_NAME!,
            Key: fileKey,
            Body: buffer,
            ContentType: file.type,
        }
        const command = new PutObjectCommand(input)
        await s3.send(command)
        return NextResponse.json({ fileName,fileKey }, { status: 200 });
    } catch (error) {
        console.error("Failed to upload file to S3:", error);
        return NextResponse.json({ error: "Failed to upload file to S3" }, { status: 500 });
    }
}