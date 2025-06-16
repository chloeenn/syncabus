# 📅 Syncabus

**From syllabus to calendar — in seconds.**

Syncabus is a web app that helps students turn course syllabi (PDFs) into `.ics` calendar files.

---

## Project Preview
<img width="1422" alt="Screenshot 2025-05-24 at 4 17 32 AM" src="https://github.com/user-attachments/assets/28cc927b-5e4f-4c07-b95b-793ff1db7408" />
<img width="1422" alt="Screenshot 2025-06-16 at 3 23 53 AM" src="https://github.com/user-attachments/assets/079c952d-6309-456f-a9cc-d337b7d0cb43" />
<img width="1422" alt="Screenshot 2025-06-16 at 3 24 10 AM" src="https://github.com/user-attachments/assets/c66182bd-c78b-4fa5-86fb-6157a8934407" />


---

### Prerequisites

- Node.js (v16+)
- Python 3.10+ (for FastAPI backend)
- OpenAI API key
- AWS credentials for S3 bucket access

### Installation

```bash
git clone https://github.com/chloeenn/syncabus.git
cd syncabus
```
```bash
cd syncabus/frontend
npm install
npm run dev
```
```bash
cd ../backend
pip install -r requirements.txt
uvicorn main:app --reload
```
#### Environment Variables
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
AWS_S3_BUCKET=xxxx
AWS_ACCESS_KEY_ID=xxxx
AWS_SECRET_ACCESS_KEY=xxxx
S3_BUCKET_NAME=xxxx
OPENAI_API_KEY=xxxx
```

