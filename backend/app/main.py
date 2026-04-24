from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.rag.pipeline import ask

app = FastAPI()

origins = [
    "https://my-portfolio-git-main-kgodisos-projects.vercel.app",
    "http://localhost:5173",  # optional for local dev
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(req: ChatRequest):
    response = ask(req.message)
    return {"response": response}