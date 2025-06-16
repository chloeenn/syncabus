FROM python:3.11-slim

WORKDIR /app

# Install system deps for pymupdf
RUN apt-get update && apt-get install -y \
    libmupdf-dev \
    mupdf-tools \
    build-essential \
    python3-dev \
    libffi-dev \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Upgrade packaging tools first
RUN pip install --upgrade pip setuptools wheel

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
