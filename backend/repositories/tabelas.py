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
    Column("user_id", String, ForeignKey("user.id"), primary_key=True),
    Column("grupo_id", Integer, ForeignKey("grupo.id"), primary_key=True),
    Column("eh_manager", Boolean, nullable=False, default=False)
)

user_paciente = Table(
    "user_paciente", Base.metadata,
    Column("user_id", String, ForeignKey("user.id"), primary_key=True),
    Column("paciente_id", Integer, ForeignKey("paciente.id"), primary_key=True),
)

class User(Base):
    __tablename__ = "user"
    id = Column(String, primary_key=True)
    senha = Column(String, nullable=False)
    email = Column(String, nullable=False)
    grupos = relationship("Grupo", secondary=user_grupo, back_populates="usuarios")
    prontuarios = relationship("Prontuario", back_populates="dono")

    pacientes = relationship("Paciente", secondary=user_paciente, back_populates="users")
    agendamentos = relationship("Agendamento", back_populates="user")
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
    conteudo = Column(JSON, nullable=False)
    grupo_id = Column(Integer, ForeignKey("grupo.id"), nullable=True)
    dono_id = Column(String, ForeignKey("user.id"), nullable=False)
    paciente_id = Column(Integer, ForeignKey("paciente.id"), nullable=False)

    grupo = relationship("Grupo", back_populates="prontuarios")
    dono = relationship("User", back_populates="prontuarios")
    paciente = relationship("Paciente", back_populates="prontuarios")

    def __init__(self, titulo, conteudo, grupo, dono, paciente):
        self.titulo = titulo
        self.conteudo = conteudo
        self.grupo = grupo
        self.dono = dono
        self.paciente = paciente

class Paciente(Base):
    __tablename__ = "paciente"
    '''
    class cadastro_schema(BaseModel):
    nome: str  
    cpf : str | None = None
    genero : str | None = None
    nascimento: str | date
    tel1: str  
    tel2: str | None = None                
    bairro: str
    cidade: str
    diagnostico: str | None = None
    disciplina: str 
    hospital: str | None = None
    doutor: str | None = None
    procura: str
    situacao: str
    obs: str | None = None
    '''
    id = Column(Integer, primary_key=True)
    nome = Column(String, nullable=False)
    cpf = Column(String)
    genero = Column(String)
    nascimento = Column(Date)
    tel1 = Column(String)
    tel2 = Column(String)
    bairro = Column(String)
    cidade = Column(String)
    diagnostico = Column(String)
    disciplina = Column(String)
    hospital = Column(String)
    doutor = Column(String)
    procura = Column(String)
    situacao = Column(String)
    obs = Column(String)

    users = relationship("User", secondary=user_paciente, back_populates="pacientes")

    agendamentos = relationship("Agendamento", back_populates="paciente")
    prontuarios = relationship("Prontuario", back_populates="paciente")

    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)

class Agendamento(Base):
    __tablename__ = "agendamento"
    id = Column(Integer, primary_key=True)
    nome = Column(String, nullable=False)
    user_id = Column(String, ForeignKey("user.id"), nullable=False)       # <<< ADICIONADO
    paciente_id = Column(Integer, ForeignKey("paciente.id"), nullable=False)

    user = relationship("User", back_populates="agendamentos")
    paciente = relationship("Paciente", back_populates="agendamentos")

    def __init__(self, id, nome, user_id, paciente_id):
        self.id = id
        self.nome = nome
        self.user_id = user_id
        self.paciente_id = paciente_id