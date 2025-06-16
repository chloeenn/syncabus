from fastapi import APIRouter, Query
from app.utils import s3
import fitz 

router = APIRouter()

@router.get("/parse")
async def parse_pdf(key: str = Query(...)):
    print(f"key received at parse_pdf.py: {key}")
    pdfBuffer = await s3.download_from_s3(key)

    doc = fitz.open(stream=pdfBuffer, filetype="pdf")
    text = ""

    for page in doc:
        text += page.get_text()

    print(f"pdf_parse.py text content: {text[:500]}")

    return {"text": text}   
