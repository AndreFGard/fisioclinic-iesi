from sqlalchemy import Engine,text
from sqlalchemy.orm import query
from schemas import Prontuario
from repositories.tabelas import ProntuarioTable,VersionamentoProntuarioTable,metadata
import sqlalchemy as sql


class RepoProntuario:
    def __init__(self, engine: Engine):
        self.engine = engine
        self.create_tables()
        self.prontTable = ProntuarioTable
        self.versaoTable = VersionamentoProntuarioTable

    def create_tables(self):
        metadata.create_all(self.engine)
    
    def criar_prontuario(self, prontuario: Prontuario):
        with self.engine.connect() as conn:
            conn.begin()

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
            conn.commit()

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

        with self.engine.connect() as conn:
            conn.begin()

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

            conn.execute(updateStmt)
            conn.execute(versioningStmt)
            conn.commit()

p = Prontuario(id=1,user_id=1,conteudo="""{"oi":"eae"}""", formato_instanciado=2)
en = sql.create_engine("sqlite:///fisio.db")
RepoProntuario(en)