import { NextRequest, NextResponse } from "next/server";
import { getSignedS3URL } from "@/lib/s3";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const fileKey = searchParams.get("key");
        if (!fileKey) {
            return NextResponse.json({ error: "Missing file key" }, { status: 400 });
        }
        const signedUrl = await getSignedS3URL(fileKey);
        console.log(`/retrieve url: ${signedUrl}`)
        return NextResponse.json({ url: signedUrl });
    } catch (error) {
        console.error("Error in /retrieve:", error);
        return NextResponse.json({ error: "Failed to retrieve S3 URL" }, { status: 500 });
    }
}
