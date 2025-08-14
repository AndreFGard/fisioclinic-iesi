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

class user_schema(BaseModel):
    username: str
    senha: str
    email: str

class grupo_schema(BaseModel):
    criador: str
    nome: str

class add_schema(BaseModel):
    user: str
    grupo: int
    give_manager: bool = False

class pront_schema(BaseModel):
    titulo: str
    conteudo: str
    user: str
    grupo: Optional[int] = None

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
class ScheduleItem(BaseModel):
    id: int
    idScheduleReturn: Optional[int] = None
    dateSchudule: str  # or datetime if you want to parse dates
    local: str
    idCalendar: int
    procedures: str  # or List[str] if it's a list
    hour: str  # or time

class agendamento_schema(BaseModel):
    idPatient: int
    name: str
    schedule: list[ScheduleItem]