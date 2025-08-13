from pydantic import BaseModel

class cadastro_schema(BaseModel):
    nome: str  
    telefone: str         
    bairro: str
    diagnostico: str
    disciplina: str
    hospital: str
    doutor: str
    dataProcura: str