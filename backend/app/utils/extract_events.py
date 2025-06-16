import os
import re
import json
import openai
import asyncio


openai.api_key = os.environ.get("OPENAI_API_KEY")

def call_openai(text: str) -> list:
    systemPrompt = """
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
"""
    try:
        userPrompt = f"Extract events from this syllabus:\n\n{text}"

        response = openai.ChatCompletion.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": systemPrompt},
                {"role": "user", "content": userPrompt},
            ],
            temperature=0,
        )

        raw = response.choices[0].message.content.strip()
        cleaned = re.sub(r"^```json\s*|```$", "", raw).strip()

        events = json.loads(cleaned)
        if isinstance(events, list):
            return events
    except Exception as e:
        print(f"Error calling OpenAI API or parsing response: {e}")
    
    return []

async def extract_events(text: str) -> list:
    return await asyncio.to_thread(call_openai, text)
