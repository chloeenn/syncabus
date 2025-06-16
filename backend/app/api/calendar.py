from fastapi import APIRouter, Response
from pydantic import BaseModel
from typing import List, Optional
from ics import Calendar, Event
import datetime

router = APIRouter()

class EventSchema(BaseModel):
    title: str
    date: str  # "YYYY-MM-DD"
    startTime: str  # "HH:mm"
    endTime: str    # "HH:mm"
    location: Optional[str] = None

class EventsWrapper(BaseModel):
    events: List[EventSchema]

@router.post("/calendar")
def generate_ics(data: EventsWrapper):
    calendar = Calendar()

    for e in data.events:
        event = Event()
        event.name = e.title

        date_parts = [int(x) for x in e.date.split("-")]
        start_hour, start_minute = [int(x) for x in e.startTime.split(":")]
        end_hour, end_minute = [int(x) for x in e.endTime.split(":")]

        event.begin = datetime.datetime(*date_parts, start_hour, start_minute)
        event.end = datetime.datetime(*date_parts, end_hour, end_minute)

        event.location = e.location or "TBD"

        calendar.events.add(event)

    ics_content = str(calendar)
    return Response(content=ics_content, media_type="text/calendar")
