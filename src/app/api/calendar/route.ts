import { NextRequest, NextResponse } from "next/server";
import { generateICSFile } from "@/lib/generateICS";

export async function POST(req: NextRequest) {
  const { events } = await req.json();

  if (!events || !Array.isArray(events)) {
    return NextResponse.json({ error: "Invalid events array" }, { status: 400 });
  }

  const icsContent = generateICSFile(events);

  return NextResponse.json({ ics: icsContent });
}
