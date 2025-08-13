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
    tel2: Optional[str] = None         
    bairro: Optional[str] = None
    diagnostico: Optional[str] = None
    disciplina: str 
    hospital: Optional[str] = None
    doutor: Optional[str] = None
    procura: str
    situacao: Optional[str] = None
    obs: Optional[str] = None

class edicao_schema(BaseModel):
    nome: Optional[str] = None  
    tel1: Optional[str] = None
    tel2: Optional[str] = None         
    bairro: Optional[str] = None
    diagnostico: Optional[str] = None
    disciplina: Optional[str] = None
    hospital: Optional[str] = None
    doutor: Optional[str] = None
    procura: Optional[str] = None
    situacao: Optional[str] = None
    obs: Optional[str] = None