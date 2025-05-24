import { z } from "zod";
import { OpenAI } from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const eventSchema = z.object({
    title: z.string(),
    date: z.string(),         // format: YYYY-MM-DD
    startTime: z.string(),    // format: HH:mm
    endTime: z.string(),      // format: HH:mm
    location: z.string().optional(),
});

export const eventListSchema = z.array(eventSchema);

export type CalendarEvent = z.infer<typeof eventSchema>;

export async function extractEventsFromText(text: string): Promise<CalendarEvent[]> {
    const systemPrompt = `
You are a helpful assistant that extracts calendar events from course syllabi.
Return a JSON array of events in this format:
[
  {
    "title": "Lecture 1",
    "date": "2025-09-10",
    "startTime": "10:00",
    "endTime": "11:30",
    "location": "Room 101"
  },
  ...
]
Make sure:
- All dates are in YYYY-MM-DD
- All times are in 24-hour HH:mm
- Skip events without valid date/time.
`;

    const userPrompt = `Extract events from this syllabus:\n\n${text}`;

    const response = await openai.chat.completions.create({
        model: "gpt-4o", // or "gpt-3.5-turbo" if preferred
        temperature: 0,
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
        ],
    });

    try {
        const raw = response.choices[0].message.content?.trim();
        if (!raw) throw new Error("No response content from OpenAI");

        const json = JSON.parse(raw);
        return eventListSchema.parse(json);
    } catch (err) {
        console.error("Failed to parse events:", err);
        throw new Error("Invalid format returned from OpenAI");
    }
}
