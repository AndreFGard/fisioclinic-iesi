from fastapi import FastAPI

from services import *

app = FastAPI()

@app.get("/")
def read_root():
    return {"status": "ok"}

@app.post("/cadastro_paciente")
def cadastro_paciente(cadastro: cadastro_schema):
    return {}