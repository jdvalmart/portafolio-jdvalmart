import json
import httpx
from src.config import settings

GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"


def build_messages(
    context: str,
    history: list[dict],
    query: str,
    lang: str,
) -> list[dict]:
    is_spanish = lang == "es"

    system = (
        "Eres el asistente del portafolio de Juan David Valencia, "
        "AI Developer en Trajectory Inc. Responde de forma profesional, "
        "concisa y util. Usa SOLO la informacion del contexto proporcionado. "
        "Si el contexto no contiene la respuesta, admítelo honestamente y "
        "sugiere preguntar sobre sus habilidades, proyectos, experiencia o "
        "educacion. NUNCA inventes informacion. Responde siempre en español."
        if is_spanish
        else "You are Juan David Valencia's portfolio assistant, "
        "AI Developer at Trajectory Inc. Respond professionally, concisely, "
        "and helpfully. Use ONLY the information from the provided context. "
        "If the context does not contain the answer, admit it honestly and "
        "suggest asking about his skills, projects, experience, or education. "
        "NEVER fabricate information. Always respond in English."
    )

    messages: list[dict] = [{"role": "system", "content": system}]

    for msg in history[-6:]:
        role = "user" if msg["role"] == "user" else "assistant"
        messages.append({"role": role, "content": msg["content"]})

    user_content = f"Context:\n{context}\n\nQuestion: {query}" if context else query
    messages.append({"role": "user", "content": user_content})

    return messages


async def chat_response(
    messages: list[dict],
    groq_api_key: str | None = None,
) -> str | None:
    api_key = groq_api_key or settings.groq_api_key
    if not api_key:
        return None

    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            response = await client.post(
                GROQ_URL,
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": settings.llm_model,
                    "messages": messages,
                    "max_tokens": 512,
                    "temperature": 0.7,
                    "top_p": 0.95,
                },
            )

            if response.status_code != 200:
                return None

            data = response.json()
            choices = data.get("choices", [])
            if choices and len(choices) > 0:
                return choices[0]["message"]["content"].strip()

            return None

    except Exception:
        return None


async def chat_response_stream(
    messages: list[dict],
    groq_api_key: str | None = None,
):
    api_key = groq_api_key or settings.groq_api_key
    if not api_key:
        yield "data: [DONE]\n\n"
        return

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            async with client.stream(
                "POST",
                GROQ_URL,
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": settings.llm_model,
                    "messages": messages,
                    "max_tokens": 512,
                    "temperature": 0.7,
                    "top_p": 0.95,
                    "stream": True,
                },
            ) as response:
                if response.status_code != 200:
                    yield "data: [DONE]\n\n"
                    return

                async for line in response.aiter_lines():
                    if not line or not line.startswith("data: "):
                        continue

                    data_str = line[6:]
                    if data_str == "[DONE]":
                        yield "data: [DONE]\n\n"
                        return

                    try:
                        data = json.loads(data_str)
                        choices = data.get("choices", [])
                        if choices and len(choices) > 0:
                            delta = choices[0].get("delta", {})
                            content = delta.get("content", "")
                            if content:
                                yield f"data: {json.dumps({'token': content})}\n\n"
                    except json.JSONDecodeError:
                        continue

                yield "data: [DONE]\n\n"

    except Exception:
        yield "data: [DONE]\n\n"
