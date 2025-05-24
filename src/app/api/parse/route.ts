import { NextRequest, NextResponse } from "next/server";
import parseDocument from "@/lib/parseDocument";

export async function GET(req: NextRequest) {
  const fileKey = req.nextUrl.searchParams.get("key");
 console.log("/parse api received key:", fileKey);
  if (!fileKey) {
    return NextResponse.json({ error: "Missing file key" }, { status: 400 });
  }

  try {
    const text = await parseDocument(fileKey);
    return NextResponse.json({ text });
  } catch (error) {
    return NextResponse.json({ error: "Failed to parse document" }, { status: 500 });
  }
}
