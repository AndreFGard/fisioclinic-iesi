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

user_grupo = Table(
    "user_grupos", Base.metadata,
    Column("user_id", Integer, ForeignKey("user.id"), primary_key=True),
    Column("grupo_id", Integer, ForeignKey("grupo.id"), primary_key=True),
    Column("eh_manager", Boolean, nullable=False, default=False)
)

class User(Base):
    __tablename__ = "user"
    id = Column(String, primary_key=True)
    senha = Column(String, nullable=False)
    email = Column(String, nullable=False)
    grupos = relationship("Grupo", secondary=user_grupo, back_populates="usuarios")
    prontuarios = relationship("Prontuario", back_populates="dono")

    def __init__(self, nome, senha, email):
        self.id = nome
        self.senha = senha
        self.email = email

class Grupo(Base):
    __tablename__ = "grupo"
    id = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String, nullable=False)
    criador = Column(String, ForeignKey("user.id"), nullable=False)
    usuarios = relationship("User", secondary=user_grupo, back_populates="grupos")
    prontuarios = relationship("Prontuario", back_populates="grupo")

    def __init__(self, nome, criador):
        self.nome = nome
        self.criador = criador

class Prontuario(Base):
    __tablename__ = "prontuario"

    id = Column(Integer, primary_key=True, autoincrement=True)
    titulo = Column(String, nullable=False)
    conteudo = Column(Text, nullable=False)
    grupo_id = Column(Integer, ForeignKey("grupo.id"), nullable=True)
    dono_id = Column(String, ForeignKey("user.id"), nullable=False)
    #todo: adicionar paciente id quando tiver tabeka de 

    grupo = relationship("Grupo", back_populates="prontuarios")
    dono = relationship("User", back_populates="prontuarios")

    def __init__(self, titulo, conteudo, grupo, dono):
        self.titulo = titulo
        self.conteudo = conteudo
        self.grupo = grupo
        self.dono = dono