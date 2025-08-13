from pydantic import BaseModel
from typing import Optional

class cadastro_schema(BaseModel):
    nome: str  
    cpf : str | None = None
    genero : str | None = None
    dataNascimento: str
    telefone1: str  
    telefone2: str | None = None                
    bairro: str
    cidade: str
    diagnostico: str | None = None
    disciplina: str 
    hospital: str | None = None
    doutor: str | None = None
    dataProcura: str
    situacao: str
    observacao: str | None = None

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
    data_procura: Optional[str] = None

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

class Prontuario(BaseModel):
    id: Optional[int] = None
    user_id: Optional[int] = None
    conteudo: Optional[str|dict] = None
    eh_formato: bool = False
    formato_instanciado: Optional[int] = None

Prontuario(id=1,user_id=1,conteudo='{"oi":"eae"}', formato_instanciado=2)