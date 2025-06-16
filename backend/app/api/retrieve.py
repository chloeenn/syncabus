from fastapi import APIRouter, Query, HTTPException
from app.utils import s3

router = APIRouter()


@router.get("/retrieve")
async def retrieve_file(key: str = Query(...)):
    try:
        print(f"Trying to retrieve key: {key}")
        signed_url = s3.get_signed_url(key)
        return {"url": signed_url}
    except Exception as e:
        print(f"Error in /retrieve: {e}")
        raise HTTPException(status_code=500, detail=str(e))
