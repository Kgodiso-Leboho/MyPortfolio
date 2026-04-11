import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

def load_context():
    data_dir = os.path.join(os.path.dirname(__file__), "..", "data")
    context = ""
    for filename in ["about.txt"]:
        filepath = os.path.join(data_dir, filename)
        if os.path.exists(filepath):
            with open(filepath, "r", encoding="utf-8") as f:
                context += f"\n\n--- {filename} ---\n{f.read()}"
    return context.strip()

CONTEXT = load_context()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def ask(question: str) -> str:
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        temperature=0.2,
        messages=[
            {
                "role": "system",
                "content": f"""You are an AI assistant for a developer portfolio website.
Use ONLY the information below to answer questions. If the answer is not in the context, say you don't have that information.
When listing multiple items (like degrees, skills, or projects), always present each one on its own line clearly separated.
Keep answers concise but complete.

{CONTEXT}"""
            },
            {
                "role": "user",
                "content": question
            }
        ]
    )
    return (response.choices[0].message.content or "").strip()