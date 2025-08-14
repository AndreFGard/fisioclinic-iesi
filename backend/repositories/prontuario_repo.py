
from pydantic.type_adapter import P
from sqlalchemy import Engine,text
from sqlalchemy.orm import query
from sqlalchemy.sql.functions import user
from schemas import Prontuario
from repositories.tabelas import Fila, ProntuarioTable,VersionamentoProntuarioTable,metadata
import sqlalchemy as sql
from datetime import datetime


class RepoProntuario:
    def __init__(self, engine: Engine):
        self.engine = engine
        self.create_tables()
        self.prontTable = ProntuarioTable
        self.versaoTable = VersionamentoProntuarioTable

    def create_tables(self):
        metadata.create_all(self.engine)
    
    def criar_prontuario(self, prontuario: Prontuario):
        with self.engine.begin() as conn:

            queryStmt= sql.insert(self.prontTable).values(
                user_id=prontuario.user_id,
                conteudo=prontuario.conteudo,
                eh_formato=prontuario.eh_formato,
                formato_instanciado=prontuario.formato_instanciado
            )
            result = conn.execute(queryStmt)
            id = result.inserted_primary_key[0] #type:ignore
    
            verStmt = sql.insert(self.versaoTable).values(
                id=id,
                versao=1,
                conteudo=prontuario.conteudo
            )
            conn.execute(verStmt)
            return id

    def get_n_versao_atual(self, conn:sql.Connection, id_prontuario: int):
        query = text("""
            SELECT MAX(versao) 
            FROM VERSIONAMENTO_PRONTUARIO
            WHERE id = :id
        """)
        res = conn.execute(query, {"id": id_prontuario})
        max_versao = res.scalar()
        return max_versao or 0


    def atualizar_prontuario(self, prontuario: Prontuario):
        if prontuario.id is None:
            raise ValueError("Prontuario ID is required for update")

        with self.engine.begin() as conn:
            updateStmt = sql.update(self.prontTable).where(
                self.prontTable.c.id == prontuario.id
            ).values(
                user_id=prontuario.user_id,
                conteudo=prontuario.conteudo,
                eh_formato=prontuario.eh_formato,
                formato_instanciado=prontuario.formato_instanciado
            )
            verAtual = self.get_n_versao_atual(conn, prontuario.id)

            versioningStmt = sql.insert(self.versaoTable).values(
                id=prontuario.id,
                versao = verAtual+1,
                conteudo=prontuario.conteudo
            )

            x = conn.execute(updateStmt).rowcount
            if not x: 
                raise ValueError(f"prontuary id {prontuario.id} is not present in the DB")
            conn.execute(versioningStmt)

    def get_prontuarios_usuario(self, user_id: int, disciplina:str|None=None) -> list[Prontuario]:
        with self.engine.connect() as conn:
            stmt = sql.select(self.prontTable).where(self.prontTable.c.user_id == user_id)
            if disciplina:
                stmt = stmt.where(self.prontTable.c.disciplina == disciplina)
            result = conn.execute(stmt)
            rows = result.mappings().fetchall()
            prontuarios = [Prontuario(**dict(row)) for row in rows]
            return prontuarios
    
    @classmethod
    def test(cls, db_url="sqlite:///fisio.db"):
        testP = RepoProntuario(sql.create_engine(db_url))
        testPront = Prontuario(id=1,user_id=1,conteudo='{"oi":"eae"}', formato_instanciado=2)
        try:
            id = testP.criar_prontuario(testPront)
            testPront.id = id
            print(testP.get_prontuarios_usuario(1))
            print("get ok")
            now = datetime.now()
            hours = now.hour
            minutes = now.minute
            testPront.conteudo = f"{hours}:{minutes}  updated"
            testP.atualizar_prontuario(testPront)
        except Exception as e:
            print(e)



RepoProntuario.test()