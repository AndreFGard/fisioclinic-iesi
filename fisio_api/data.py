from tabelas import *
from datetime import date

db = create_engine("sqlite:///fisio.db")
Session = sessionmaker(bind=db)
Base.metadata.create_all(bind=db)

with Session() as session:
    def emfileirar(dados: dict) -> Fila:
        """
        Insere uma instância de Fila no banco a partir de um dicionário.
        - dados: dicionário com todos os campos da tabela (obrigatórios + opcionais)
        todos os campos devem estar com os nomes adequados
        """
        # validação básica de obrigatórios
        obrigatorios = ["nome", "tel1", "disciplina", "procura"]
        for campo in obrigatorios:
            if campo not in dados:
                raise ValueError(f"Campo obrigatório '{campo}' faltando")

        if isinstance(dados["procura"], str):
            dados["procura"] = date.fromisoformat(dados["procura"])

        try:
            fila = Fila(**dados)
            session.add(fila)
            session.commit()
            session.refresh(fila)
            return
        except:
            session.rollback()
            raise
