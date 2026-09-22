from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import shutil
import os
import requests  

app = FastAPI()

class ChatRequest(BaseModel):
    question: str


@app.post("/chat")
async def chat(request: ChatRequest):

    payload = {
        "question": request.question
    }

    response = requests.post(
        RAG_WEBHOOK_URL,
        json=payload,
        timeout=60
    )

    return {
        "status": response.status_code,
        "body": response.json()
    }

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

WEBHOOK_URL = "Your_webhook_URL"
RAG_WEBHOOK_URL="Your_RAG_webhook_URL"

@app.post("/upload")
async def upload_invoice(file: UploadFile = File(...)):

    print("Received:", file.filename)
    allowed_types = {
        "application/pdf",
        "image/png",
        "image/jpeg",
        "image/jpg"
    }

    if file.content_type not in allowed_types:
        return {
            "status": 400,
            "body": "Only PDF, PNG, and JPG/JPEG files are allowed."
        }

    filepath = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    print("Saved.")

    with open(filepath, "rb") as f:

        files = {
            "invoice": (
                file.filename,
                f,
                file.content_type
            )
        }

        print("Sending to n8n...")

        response = requests.post(
            WEBHOOK_URL,
            files=files,
            timeout=30
        )

        print("Status:", response.status_code)
        print(response.text)

    return {
        "status": response.status_code,
        "body": response.text
    }
