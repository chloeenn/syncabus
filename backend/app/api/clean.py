from fastapi import APIRouter
from typing import List, Optional
from pydantic import BaseModel

router = APIRouter()

class EventSchema(BaseModel):
    title: str
    date: str  # "YYYY-MM-DD"
    startTime: Optional[str] = None  # "HH:mm"
    endTime: Optional[str] = None    # "HH:mm"
    location: Optional[str] = None

@router.post("/clean", response_model=List[EventSchema])
async def clean_events(events: List[EventSchema]):
    cleaned_events = []
    seen = set()

    for event in events:
        event.title = event.title.strip().title()
        event.location = (event.location or "").strip().title()

        if event.startTime == "00:00":
            event.startTime = None
        if event.endTime == "00:00":
            event.endTime = None

        key = (event.title, event.date)
        if key not in seen:
            cleaned_events.append(event)
            seen.add(key)

    return cleaned_events
