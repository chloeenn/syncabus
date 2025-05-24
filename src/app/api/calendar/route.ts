// src/app/api/generateICS/route.ts (or wherever your Next.js API routes live)

import { NextRequest, NextResponse } from "next/server";
import { generateICSFile } from "@/lib/generateICS";

export async function POST(req: NextRequest) {
  try {
    const { events } = await req.json();

    if (!events || !Array.isArray(events)) {
      return NextResponse.json({ error: "Invalid events array" }, { status: 400 });
    }

    const icsContent = generateICSFile(events);

    return NextResponse.json({ ics: icsContent });
  } catch (error: any) {
    console.error("Failed to generate ICS file:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
