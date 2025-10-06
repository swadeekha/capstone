from fastapi import FastAPI
from pydantic import BaseModel
from model import Generator
from utils import extract_choices

app = FastAPI()
gen = Generator()

class GenRequest(BaseModel):
    prompt: str
    max_new_tokens: int = 120

class ChoiceRequest(BaseModel):
    context: str

@app.post('/generate')
async def generate(payload: GenRequest):
    continuation = gen.generate(payload.prompt, max_new_tokens=payload.max_new_tokens)
    return {"continuation": continuation}

@app.post('/choices')
async def choices(payload: ChoiceRequest):
    cont = gen.generate(payload.context, max_new_tokens=80)
    choices = extract_choices(cont, n=3)
    return {"choices": choices, "raw": cont}

@app.get('/health')
async def health():
    return {"status": "ok"}
