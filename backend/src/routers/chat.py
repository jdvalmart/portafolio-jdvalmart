from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
import uuid
from src.services.rag_service import run_rag, search_context, build_chat_prompt
from src.services.llm_service import chat_response_stream

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


@router.post("/stream")
async def chat_stream(req: ChatRequest):
    try:
        context, history = await search_context(
            query=req.query.strip(),
            session_id=req.session_id,
            lang=req.lang,
        )
        prompt = build_chat_prompt(context, history, req.query.strip(), req.lang)

        async def generate():
            full = ""
            async for event in chat_response_stream(prompt):
                yield event
                if "data:" in event and "[DONE]" not in event:
                    try:
                        import json
                        token = json.loads(event.split("data: ")[1]).get("token", "")
                        full += token
                    except Exception:
                        pass
                elif "[DONE]" in event:
                    from src.services.rag_service import record_exchange
                    record_exchange(
                        query=req.query.strip(),
                        response=full,
                        session_id=req.session_id,
                        lang=req.lang,
                    )

        return StreamingResponse(
            generate(),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "X-Accel-Buffering": "no",
            },
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
