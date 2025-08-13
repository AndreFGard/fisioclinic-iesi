from typing import Optional
from pydantic import BaseModel
from sqlalchemy import *
from sqlalchemy.orm import *
from sqlalchemy.sql import *

Base = declarative_base()

class Fila(Base):
    """NAO MUDE SEM MUDAR O MODELO EM SCHEMAS.PY"""
    __tablename__ = "fila"
    id = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String, nullable=False)
    tel1 = Column(String, nullable=False)
    tel2 = Column(String)
    bairro = Column(String)
    diagnostico = Column(String)
    disciplina = Column(String, nullable=False)
    hospital = Column(String)
    doutor = Column(String)
    procura = Column(Date, nullable=False)
    situacao = Column(String)
    obs = Column(String)

    def __init__(self, nome, tel1, disciplina, procura, **kwargs):
        # obrigatórios
        self.nome = nome
        self.tel1 = tel1
        self.disciplina = disciplina
        self.procura = procura
        
        # opcionais
        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)


metadata = MetaData()

#formato_instanciado devia ser uma foreign key
#conteudo é um json
ProntuarioTable = Table(
    "PRONTUARIO",
    metadata,
    Column("id", Integer, primary_key=True,autoincrement=True),
    Column("user_id", Integer, nullable=True), #foreign key, mas ha incompatibilidade com o ORM
    Column("conteudo", String, nullable=True),
    Column("eh_formato", Boolean,default=False),
    Column("formato_instanciado", Integer, nullable=True)
)

VersionamentoProntuarioTable = Table(
    "VERSIONAMENTO_PRONTUARIO",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("versao", Integer, primary_key=True),
    Column("conteudo", String, nullable=True),
    Column("data", DateTime, default=func.now())
)


