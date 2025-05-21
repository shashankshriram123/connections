import os
import random
import string
import smtplib
from email.message import EmailMessage

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
import redis

# ── Load .env ────────────────────────────────────────────────────────────
load_dotenv()  # make sure .env is next to this file

REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
REDIS_DB   = int(os.getenv("REDIS_DB", 0))

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER")       # your full Gmail address
SMTP_PASS = os.getenv("SMTP_PASS")       # your 16-char App Password (spaces OK if quoted)
FROM_ADDR = SMTP_USER                    # or any no-reply@yourdomain.com

# ── Redis client ─────────────────────────────────────────────────────────
r = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DB, decode_responses=True)

# ── FastAPI app ──────────────────────────────────────────────────────────
app = FastAPI()

class EmailRequest(BaseModel):
    email: EmailStr

    @classmethod
    def __get_validators__(cls):
        yield from EmailStr.__get_validators__()
        yield cls.check_domain

    @classmethod
    def check_domain(cls, v: str) -> str:
        if not v.endswith("@ucmerced.edu"):
            raise ValueError("Email must end with @ucmerced.edu")
        return v

@app.post("/verify/send")
def send_code(req: EmailRequest):
    # 1) Generate a 6-digit code
    code = "".join(random.choices(string.digits, k=6))

    # 2) Store it in Redis with a 15-minute TTL
    key = f"verify:{req.email}"
    r.setex(key, 15 * 60, code)

    # 3) Compose the email
    msg = EmailMessage()
    msg["From"] = FROM_ADDR
    msg["To"] = req.email
    msg["Subject"] = "Your Ember verification code"
    msg.set_content(f"Hello!\n\nYour verification code is: {code}\nIt expires in 15 minutes.\n\n— Ember team")

    # 4) Send via Gmail SMTP
    try:
        with smtplib.SMTP(host=SMTP_HOST, port=SMTP_PORT, timeout=10) as smtp:
            smtp.ehlo()
            smtp.starttls()
            smtp.ehlo()
            smtp.login(SMTP_USER, SMTP_PASS)
            smtp.send_message(msg)
    except Exception as e:
        # If sending fails, remove the code so they can retry
        r.delete(key)
        raise HTTPException(500, f"Error sending email: {e}")

    return {"success": True}

@app.post("/verify/check")
def check_code(req: EmailRequest, code: str):
    key = f"verify:{req.email}"
    stored = r.get(key)
    if not stored:
        raise HTTPException(400, "No code found or code expired")
    if stored != code:
        raise HTTPException(400, "Incorrect code")
    # Consume the code
    r.delete(key)
    return {"verified": True}
