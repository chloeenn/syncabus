import os
from dotenv import load_dotenv
import boto3
from botocore.exceptions import BotoCoreError, ClientError

load_dotenv()
s3_client = boto3.client("s3")

BUCKET_NAME = os.getenv("S3_BUCKET_NAME")


async def download_from_s3(file_key: str) -> bytes:
    try:
        response = s3_client.get_object(Bucket=BUCKET_NAME, Key=file_key)
        file_bytes = response['Body'].read()
        print(f"Downloaded {file_key} from S3. Size: {len(file_bytes)} bytes")
        return file_bytes
    except (BotoCoreError, ClientError) as e:
        print(f"Error downloading {file_key} from S3: {e}")
        raise RuntimeError(f"S3 download failed: {e}")

def get_signed_url(file_key:str, expiration: int = 3600) -> str:
    try:
        response = s3_client.generate_presigned_url(
            ClientMethod="get_object",
            Params={"Bucket": BUCKET_NAME, "Key": file_key},
            ExpiresIn=expiration, 
        )
        return response
    except(BotoCoreError, ClientError) as e:
        print(f"Error retrieving signed url for pdf from S3: {e}")
        raise RuntimeError(f"S3 retrieving signed URL failed: {e}")
    
    
    
        