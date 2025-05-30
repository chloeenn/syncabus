import { NextRequest, NextResponse } from "next/server";
import { extractEventsFromText } from "@/lib/extractEvent";

export async function POST(req: NextRequest) {
  const { text } = await req.json();
  const events = await extractEventsFromText(text);
  console.log("Extracted events:", events);
  return NextResponse.json({ events });
}
