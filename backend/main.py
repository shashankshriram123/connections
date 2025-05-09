from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from instagram_handle_checker import is_instagram_username_taken
import sqlite3

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup
conn = sqlite3.connect("db.sqlite3", check_same_thread=False)
cursor = conn.cursor()
cursor.execute("""
CREATE TABLE IF NOT EXISTS connections (
    user TEXT,
    friend TEXT
)
""")
conn.commit()

class UserData(BaseModel):
    user: str
    friends: list[str]

@app.post("/add_user")
def add_user(data: UserData):
    # Validate Instagram handles
    if not is_instagram_username_taken(data.user):
        raise HTTPException(status_code=400, detail=f"IG handle '{data.user}' does not exist")

    for friend in data.friends:
        if not is_instagram_username_taken(friend):
            raise HTTPException(status_code=400, detail=f"Friend IG handle '{friend}' does not exist")

    # Save to DB
    for friend in data.friends:
        cursor.execute("INSERT INTO connections (user, friend) VALUES (?, ?)", (data.user, friend))
    conn.commit()

    return {"status": "added"}

@app.get("/graph")
def get_graph():
    cursor.execute("SELECT user, friend FROM connections")
    edges = cursor.fetchall()

    nodes = set()
    links = []

    for user, friend in edges:
        nodes.add(user)
        nodes.add(friend)
        links.append({"source": user, "target": friend})

    return {
        "nodes": [{"id": n} for n in nodes],
        "links": links
    }
