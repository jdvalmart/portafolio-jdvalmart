from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
import uuid
from src.services.rag_service import run_rag

router = APIRouter(prefix="/api/chat", tags=["chat"])


class ChatRequest(BaseModel):
    query: str = Field(..., min_length=1, max_length=500, description="User question")
    session_id: str = Field(
        default_factory=lambda: uuid.uuid4().hex[:12],
        description="Session ID for conversation history",
    )
    lang: str = Field(default="en", pattern="^(en|es)$")


class ChatResponse(BaseModel):
    response: str
    session_id: str


@router.post("", response_model=ChatResponse)
async def chat(req: ChatRequest):
    try:
        answer = await run_rag(
            query=req.query.strip(),
            session_id=req.session_id,
            lang=req.lang,
        )
        return ChatResponse(response=answer, session_id=req.session_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
