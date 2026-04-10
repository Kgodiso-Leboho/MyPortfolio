from fastapi import FastAPI
from pydantic import BaseModel
from app.rag.pipeline import ask

app = FastAPI()

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(req: ChatRequest):
    response = ask(req.message)
    return {"response": response}