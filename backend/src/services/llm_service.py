import json
import httpx
from fastapi.responses import StreamingResponse
from src.config import settings

LLM_URL = f"https://api-inference.huggingface.co/models/{settings.hf_model}"


def build_prompt(context: str, history: list[dict], query: str, lang: str) -> str:
    is_spanish = lang == "es"

    system = (
        "Eres el asistente del portafolio de Juan David Valencia. "
        "Responde en español usando SOLO el contexto proporcionado. "
        "Si el contexto no contiene la respuesta, di que no tienes "
        "esa informacion y sugiere preguntar sobre sus habilidades, "
        "proyectos, experiencia o educacion."
        if is_spanish
        else "You are Juan David Valencia's portfolio assistant. "
        "Answer questions using ONLY the context provided below. "
        "If the context does not contain the answer, say you don't "
        "have that information and suggest asking about his skills, "
        "projects, experience, or education."
    )

    history_text = ""
    if history:
        lines = []
        for msg in history[-6:]:
            role = "User" if msg["role"] == "user" else "Assistant"
            lines.append(f"{role}: {msg['content']}")
        history_text = "\n".join(lines) + "\n"

    return (
        f"<s>[INST] {system}\n\n"
        f"Context:\n{context}\n\n"
        f"{'Conversation history:\n' + history_text if history_text else ''}"
        f"Question: {query} [/INST]"
    )


async def chat_response(
    prompt: str,
    hf_api_key: str | None = None,
) -> str | None:
    api_key = hf_api_key or settings.hf_api_key
    if not api_key:
        return None

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                LLM_URL,
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json",
                },
                json={
                    "inputs": prompt,
                    "parameters": {
                        "max_new_tokens": 256,
                        "temperature": 0.7,
                        "top_p": 0.95,
                        "return_full_text": False,
                    },
                },
            )

            if response.status_code == 429:
                return None
            if response.status_code >= 500:
                return None
            response.raise_for_status()

            data = response.json()

            if isinstance(data, list) and len(data) > 0 and isinstance(data[0], dict):
                text = data[0].get("generated_text", "")
                if text:
                    return text.strip()

            if isinstance(data, dict):
                text = data.get("generated_text", "")
                if text:
                    return text.strip()

            return None

    except Exception:
        return None


async def chat_response_stream(
    prompt: str,
    hf_api_key: str | None = None,
):
    api_key = hf_api_key or settings.hf_api_key
    if not api_key:
        yield "data: [DONE]\n\n"
        return

    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            async with client.stream(
                "POST",
                LLM_URL,
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json",
                },
                json={
                    "inputs": prompt,
                    "parameters": {
                        "max_new_tokens": 256,
                        "temperature": 0.7,
                        "top_p": 0.95,
                        "return_full_text": False,
                    },
                },
            ) as response:
                if response.status_code == 429 or response.status_code >= 500:
                    yield "data: [DONE]\n\n"
                    return

                buffer = ""
                async for chunk in response.aiter_bytes():
                    if not chunk:
                        continue

                    buffer += chunk.decode(errors="replace")

                    while "\n" in buffer:
                        line, buffer = buffer.split("\n", 1)
                        line = line.strip()
                        if not line:
                            continue

                        try:
                            data = json.loads(line)
                            token = data.get("token", {})
                            text = token.get("text", "")
                            if text:
                                yield f"data: {json.dumps({'token': text})}\n\n"
                        except json.JSONDecodeError:
                            continue

                if buffer.strip():
                    try:
                        data = json.loads(buffer)
                        token = data.get("token", {})
                        text = token.get("text", "")
                        if text:
                            yield f"data: {json.dumps({'token': text})}\n\n"
                    except json.JSONDecodeError:
                        pass

                yield "data: [DONE]\n\n"

    except Exception:
        yield "data: [DONE]\n\n"
