from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import pandas as pd
import io
import base64
import matplotlib.pyplot as plt

router = APIRouter()

class EventSchema(BaseModel):
    title: str
    date: str  # YYYY-MM-DD
    startTime: Optional[str]
    endTime: Optional[str]
    location: Optional[str]

class EventsWrapper(BaseModel):
    events: List[EventSchema]

class WeeklyDeadlineResponse(BaseModel):
    week: int
    deadline_count: int

class AnalysisResponse(BaseModel):
    weekly_deadlines: List[WeeklyDeadlineResponse]
    deadlines_per_week_chart_base64: str

@router.post("/analyze")
async def analyze_events(payload: EventsWrapper) -> AnalysisResponse:
    events = payload.events

    if not events:
        raise HTTPException(status_code=400, detail="No events provided")

    df = pd.DataFrame([e.dict() for e in events])
    df['date'] = pd.to_datetime(df['date'], errors='coerce')

    if df['date'].isnull().any():
        raise HTTPException(status_code=400, detail="Invalid date format in events")

    df['week'] = df['date'].dt.isocalendar().week

    weekly_counts = df.groupby('week').size().reset_index(name='deadline_count')

    plt.figure(figsize=(8, 4))
    plt.bar(weekly_counts['week'], weekly_counts['deadline_count'], color='teal')
    plt.xlabel("Week Number")
    plt.ylabel("Number of Deadlines")
    plt.title("Deadlines Per Week")
    plt.tight_layout()

    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    plt.close()
    buf.seek(0)

    img_base64 = base64.b64encode(buf.read()).decode('utf-8')

    weekly_deadlines = [
        WeeklyDeadlineResponse(week=int(row['week']), deadline_count=int(row['deadline_count']))
        for _, row in weekly_counts.iterrows()
    ]

    return AnalysisResponse(
        weekly_deadlines=weekly_deadlines,
        deadlines_per_week_chart_base64=img_base64
    )
