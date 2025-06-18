#uvicorn main:app --reload

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import retrieve, parse_pdf, extract,calendar,analyze,clean

app = FastAPI()

# CORS configuration
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://192.168.2.165:3000",  
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(retrieve.router, prefix="/api")
app.include_router(parse_pdf.router, prefix="/api")
app.include_router(extract.router, prefix="/api")
app.include_router(calendar.router, prefix="/api")
app.include_router(analyze.router, prefix="/api")
app.include_router(clean.router, prefix="/api")
@app.get("/")
async def root():
    return {"message": "Hello from FastAPI!"}
