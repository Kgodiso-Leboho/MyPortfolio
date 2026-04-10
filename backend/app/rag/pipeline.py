from langchain_groq import ChatGroq
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.chains.retrieval_qa.base import RetrievalQA
from pydantic import SecretStr

from .loader import load_and_index

import os
from dotenv import load_dotenv

load_dotenv()

def build_pipeline():

    # Vector DB
    vectorstore = load_and_index()

    retriever = vectorstore.as_retriever(search_kwargs={"k": 3})


    # Inside your build_pipeline function
    api_key_val = os.getenv("GROQ_API_KEY")
    if not api_key_val:
        raise ValueError("GROQ_API_KEY not found in environment variables")

    llm = ChatGroq(
        api_key=SecretStr(api_key_val),
        model="llama-3.3-70b-versatile",
        temperature=0.2
    )

    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        retriever=retriever
    )

    return qa_chain


qa_chain = build_pipeline()

def ask(question: str):
    return qa_chain.run(question)