from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from app.utils.extract_events import extract_events
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

class ExtractRequest(BaseModel):
    text: str

class EventSchema(BaseModel):
    title: str
    date: str
    startTime: str
    endTime: str
    location: Optional[str]

class ExtractResponse(BaseModel):
    events: List[EventSchema]

@router.post("/extract", response_model=ExtractResponse)
async def extract(request: ExtractRequest):
    try:
        events = await extract_events(request.text)
        validated_events = [EventSchema(**event) for event in events]
        return ExtractResponse(events=validated_events)
    except Exception as e:
        logger.error("Error in extract endpoint", exc_info=True)
        raise HTTPException(status_code=500, detail="Failed to extract events.")
