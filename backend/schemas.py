from pydantic import BaseModel
from typing import Optional

class cadastro_schema(BaseModel):
    nome: str  
    telefone: str         
    bairro: str
    diagnostico: str
    disciplina: str
    hospital: str
    doutor: str
    dataProcura: str

class fila_schema(BaseModel):
    nome: str  
    tel1: str
    tel2: Optional[str]         
    bairro: Optional[str]
    diagnostico: Optional[str]
    disciplina: str
    hospital: Optional[str]
    doutor: Optional[str]
    procura: str
    situacao: Optional[str]
    obs: Optional[str]