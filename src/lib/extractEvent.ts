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
You are a helpful assistant that extracts calendar events from course syllabi or assessment schedules.

Your task is to return a JSON array of event objects. Each event must have the following fields:

- "title": the name of the event or assessment
- "date": in ISO format "YYYY-MM-DD"
- "startTime": 24-hour "HH:mm" format
- "endTime": 24-hour "HH:mm" format
- "location": optional, use "TBD" if unknown

Follow these instructions strictly:

1. Parse dates that may include ordinal suffixes (e.g., "January 16th" or "Feb 3rd") and convert them to ISO format. Assume the current year if not specified.
2. If no specific start/end time is provided, default to startTime "09:00" and endTime "10:00".
3. Skip any events with vague, unknown, or TBD dates.
4. Extract events regardless of whether they are lectures, quizzes, tests, assignments, or other assessment types.
5. Ignore weighting or percentages—only extract events with dates.
6. Return valid JSON only — an array of event objects. No extra explanation or text.
7. If no valid events are found, return an empty array.

Example output:

[
  {
    "title": "Syllabus Quiz",
    "date": "2025-01-16",
    "startTime": "09:00",
    "endTime": "10:00",
    "location": "TBD"
  },
  {
    "title": "Test 1",
    "date": "2025-02-13",
    "startTime": "09:00",
    "endTime": "10:00",
    "location": "TBD"
  }
]
`;

    const userPrompt = `Extract events from this syllabus:\n\n${text}`;

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        temperature: 0,
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
        ],
    });

    try {
        const raw = response.choices[0].message.content?.trim();
        if (!raw) throw new Error("No response content from OpenAI");
        const cleaned = raw
            .replace(/^```json\s*/, "")   
            .replace(/```$/, "")          
            .trim();

        const json = JSON.parse(cleaned);

        return eventListSchema.parse(json);
    } catch (err) {
        console.error("Failed to parse events:", err, "\nRaw response:", response.choices[0].message.content);
        throw new Error("Invalid format returned from OpenAI");
    }

}
