from sqlalchemy import *
from sqlalchemy.orm import *
from sqlalchemy.sql import *

Base = declarative_base()

class Fila(Base):
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