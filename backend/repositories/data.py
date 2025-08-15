from .tabelas import *
import json
from datetime import date
from schemas import fila_schema
db = create_engine("sqlite:///fisio.db")
Session = sessionmaker(bind=db)
Base.metadata.create_all(bind=db)

OPS = {
    "eq": lambda col, v: col == v,
    "ne": lambda col, v: col != v,
    "lt": lambda col, v: col < v,
    "lte": lambda col, v: col <= v,
    "gt": lambda col, v: col > v,
    "gte": lambda col, v: col >= v,
    "like": lambda col, v: col.like(v),
    "ilike": lambda col, v: col.ilike(v),
    "in": lambda col, v: col.in_(v),
    "is_null": lambda col, v: col.is_(None) if v else col.isnot(None),
}

def todict(obj):
    mapper = inspect(obj.__class__)
    cols = [c.key for c in mapper.column_attrs]
    out = {}
    for c in cols:
        v = getattr(obj, c)
        if isinstance(v, date):
            out[c] = v.isoformat()
        else:
            out[c] = v
    return out

with Session() as session:
    def emfileirar(dados: dict) -> Fila:
        """
        Insere uma instância de Fila no banco a partir de um dicionário.
        - dados: dicionário com todos os campos da tabela (obrigatórios + opcionais)
        todos os campos devem estar com os nomes adequados
        """
        obrigatorios = ["nome", "tel1", "disciplina", "procura"]
        for campo in obrigatorios:
            if campo not in dados:
                raise ValueError(f"Campo obrigatório '{campo}' faltando")

        if isinstance(dados["procura"], str):
            dados["procura"] = date.fromisoformat(dados["procura"])

        fila = Fila(**dados)
        session.add(fila)
        session.commit()
        session.refresh(fila)
        return True


    def filtrar_filas(filters: dict = None, limit: int = 0):
        """
        Recebe um dicionário de filtros e aplica na tabela de fila
        O dicionário deve conter o nome da coluna como chave
        O item pode ser um valor (se for só pra ser igual) ou uma operação
        que tem em OPS
        exemplo: pra filtrar da data x pra y
        "procura": {
                    "lt": upper_bound,
                    "gt": lower_bound
                }
        """
        q = session.query(Fila)
        conditions = []

        if filters:
            for field, spec in filters.items():
                col = getattr(Fila, field)

                if isinstance(spec, dict):
                    for op, raw_val in spec.items():
                        if op not in OPS:
                            raise ValueError(f"Operador desconhecido: {op}")
                        val = raw_val
                        if op == "in" and not isinstance(val, (list, tuple, set)):
                            val = [val]
                        if col == "procura" and isinstance(val, str):
                            val = date.fromisoformat(val)
                        conditions.append(OPS[op](col, val))
                else:
                    #se so tem o elemento ao inves de dict
                    #é igyaldade
                    val = spec
                    if col == "procura" and isinstance(val, str):
                        val = date.fromisoformat(val)
                    conditions.append(col == val)

        if conditions:
            q = q.filter(and_(*conditions))
        
        q = q.order_by(asc(Fila.procura))
        if limit:
            q = q.limit(limit)

        rows = q.all()
        result = [todict(r) for r in rows]

        return result
    
    def get_id(nome: str):
        fila = session.query(Fila).filter(Fila.nome == nome).first()
        if fila:
            return fila.id
        return None

    def get_base():
        """
        Visualização padrão da fila que deve aparecer no site,
        ordenado por data de procura.
        Retorna uma lista de objetos compatíveis com o schema `fila_schema`.
        """
        q = session.query(Fila).order_by(asc(Fila.procura))
        rows = q.all()
        return [fila_schema(**todict(r)) for r in rows]

    def pop(id: int):
        fila = session.get(Fila, id)
        if fila is None:
            return False

        try:
            session.delete(fila)
            session.commit()
            return True
        except:
            session.rollback()
            return False
    
    def editar(id: int, updates: dict):
        fila = session.query(Fila).filter(Fila.id == id).first()
        if not fila:
            return False

        for key, value in updates.items():
            if(value == None):
                continue
            if key == "procura" and isinstance(value, str):
                value = date.fromisoformat(value)
            setattr(fila, key, value)
        
        session.commit()
        return True

    def create_user(nome: str, senha: str, email: str):
        existing = session.get(User, nome)
        if existing:
            return False

        try:
            u = User(nome, senha, email)
            session.add(u)
            session.commit()
            session.refresh(u)
            return True
        except:
            session.rollback()
            return False

    def create_group(nome: str, criador_id: str):
        criador = session.get(User, criador_id)
        if criador is None:
            return False

        try:
            g = Grupo(nome, criador_id)
            session.add(g)
            session.commit()
            session.refresh(g)
            return g.id
        except:
            session.rollback()
            return False

    def add_user_to_group(user_id: str, grupo_id: int, eh_manager: bool = False):
        user = session.get(User, user_id)
        if not user:
            raise ValueError(f"User '{user_id}' não encontrado")

        grupo = session.get(Grupo, grupo_id)
        if not grupo:
            raise ValueError(f"Grupo id={grupo_id} não encontrado")

        stmt_check = select(user_grupo).where(
            user_grupo.c.user_id == user_id,
            user_grupo.c.grupo_id == grupo_id
        )
        existing = session.execute(stmt_check).first()
        if existing:
            return False

        try:
            session.execute(
                user_grupo.insert(),
                {"user_id": user_id, "grupo_id": grupo_id, "eh_manager": eh_manager}
            )
            session.commit()
            return True
        except:
            session.rollback()
            raise

    def get_grupos(user_id: str):
        user = session.query(User).filter(User.id == user_id).first()
        if not user:
            print(f"Nenhum usuário com id {user_id}")
            return []
        grupos = user.grupos
        
        return [todict(r) for r in grupos]
    
    def create_prontuario(titulo: str, conteudo: Any, dono_id: str, paciente_id: int, grupo_id: int = None, check_membership: bool = False):
        dono = session.get(User, dono_id)
        if dono is None:
            raise ValueError(f"Dono (User) com id='{dono_id}' não encontrado")

        grupo = None
        if grupo_id is not None:
            grupo = session.get(Grupo, grupo_id)
            if grupo is None:
                raise ValueError(f"Grupo com id={grupo_id} não encontrado")

        paciente = None
        paciente = session.get(Paciente, paciente_id)
        if paciente is None:
            raise ValueError(f"Paciente com id={paciente_id} não encontrado")

        try:
            pront = Prontuario(titulo=titulo, conteudo=conteudo, grupo=grupo, dono=dono, paciente=paciente)
            session.add(pront)
            session.commit()
            session.refresh(pront)
            return True
        except:
            session.rollback()
            return False

    def get_prontuarios_permitidos(user_id: str, grupo_id: int):
        stmt = (
            select(user_grupo.c.eh_manager)
            .where(user_grupo.c.user_id == user_id)
            .where(user_grupo.c.grupo_id == grupo_id)
        )
        result = session.execute(stmt).scalar()
        
        if result is None:
            return []
        
        if result:
            #manager -> todos
            tabela = session.query(Prontuario).filter(Prontuario.grupo_id == grupo_id).all()
        else:
            #n manager -> proprios e no grupo
            tabela = session.query(Prontuario).filter(
                Prontuario.grupo_id == grupo_id,
                Prontuario.dono_id == user_id
            ).all()

        return [todict(r) for r in tabela]

    def get_proprios(user_id: str):
        tabela = session.query(Prontuario).filter(Prontuario.dono_id == user_id).all()
        return [todict(r) for r in tabela]

    def get_alunos(manager_id):
        stmt_groups = select(user_grupo.c.grupo_id).where(
            user_grupo.c.user_id == manager_id,
            user_grupo.c.eh_manager == True
        )
        group_ids = session.execute(stmt_groups).scalars().all()
        if not group_ids:
            return []

        stmt_users = (
            select(User.id)
            .join(user_grupo, User.id == user_grupo.c.user_id)
            .where(
                user_grupo.c.grupo_id.in_(group_ids),
                user_grupo.c.eh_manager == False
            )
            .distinct()
        )

        users = session.execute(stmt_users).scalars().all()
        return [r for r in users]
    
    def get_agendamentos_do_user(user_id: str):
        """
        Retorna lista de Agendamento onde agendamento.user_id == user_id
        """
        stmt = select(Agendamento).where(Agendamento.user_id == user_id)
        aa = session.execute(stmt).scalars().all()
        return [todict(r) for r in aa]


    def get_agendamentos_do_paciente(paciente_id: int):
        """
        Retorna lista de Agendamento onde agendamento.paciente_id == paciente_id
        """
        stmt = select(Agendamento).where(Agendamento.paciente_id == paciente_id)
        aa = session.execute(stmt).scalars().all()
        return [todict(r) for r in aa]


    def get_pacientes_do_user(user_id: str):
        """
        Retorna lista de Paciente associados ao user via tabela user_paciente (N:N).
        """
        stmt = (
            select(Paciente)
            .join(user_paciente, Paciente.id == user_paciente.c.paciente_id)
            .where(user_paciente.c.user_id == user_id)
        )
        aa = session.execute(stmt).scalars().all()
        return [todict(r) for r in aa]

    def get_agendamentos_do_paciente_por_responsavel(paciente_id: int, user_id: str):
        """
        Retorna os Agendamento onde paciente_id == paciente_id e user_id == user_id.
        """
        stmt = select(Agendamento).where(
            Agendamento.paciente_id == paciente_id,
            Agendamento.user_id == user_id
        )
        aa = session.execute(stmt).scalars().all()
        return [todict(r) for r in aa]
    
    def get_prontuarios_by_paciente(paciente_id):
        x = session.query(Prontuario).filter_by(paciente_id=paciente_id).all()
        return [todict(r) for r in x]
    
    def get_paciente_by_id(paciente_id):
        """Retorna o objeto Paciente ou None."""
        paciente = session.get(Paciente, paciente_id)
        if paciente is None:
            return {}
        return todict(paciente)

    # ---------- INSERÇÕES ----------

    def create_paciente(etc: dict):
        with Session() as session:
            p = Paciente(**etc)
            session.add(p)
            session.commit()
            session.refresh(p)
            return p.id


    def create_agendamento(agendamento_id: int, nome: str, user_id: str, paciente_id: int):
        """
        Cria ou atualiza um Agendamento.
        - Se a tua model usa id vindo da API como PK (como está), passamos agendamento_id -> id.
        - Se quiser usar external_id + id interno, ajusta o model e muda `use_external_id`.
        Retorna o objeto Agendamento criado/atualizado.
        """
        # valida existência de user e paciente
        if session.get(User, user_id) is None:
            return False
        if session.get(Paciente, paciente_id) is None:
            return False

        try:
            ag = session.get(Agendamento, agendamento_id)
            if ag:
                ag.nome = nome
                ag.user_id = user_id
                ag.paciente_id = paciente_id
                session.commit()
                session.refresh(ag)
                return ag
            ag = Agendamento(id=agendamento_id, nome=nome, user_id=user_id, paciente_id=paciente_id)
            session.add(ag)
            session.commit()
            session.refresh(ag)
            return True
        except:
            return False