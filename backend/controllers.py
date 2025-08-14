from operator import index
from fastapi import FastAPI, File, HTTPException,Body
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from repositories.data import *
from services.rabbitmq_utils import *
from services.consumidor_cadastro import iniciar_consumidor
from services.consumidor_get_paciente import iniciar_consumidor_busca_paciente
from schemas import *


app = FastAPI() 
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)
  

import threading

@app.on_event("startup")
def startup_event():
    threading.Thread(target=iniciar_consumidor, daemon=True).start()
    threading.Thread(target=iniciar_consumidor_busca_paciente, daemon=True).start()

@app.post("/cadastro_paciente")
def cadastro_paciente(cadastro:cadastro_schema):
    body = {
    "name":cadastro.nome,
    "birthName": None,
    "flagWhatsapp": False,
    "cns": "",
    "sns": "",
    "address":cadastro.bairro,
    "number": "",
    "rg": "",
    "cpf": cadastro.cpf,
    "passport": "",
    "passport_valid_date": "",
    "apartment": "",
    "neighborhood": "",
    "city": cadastro.cidade,
    "state": "",
    "zip": "",
    "cellphone":cadastro.tel1,
    "phone": cadastro.tel2,
    "email": "",
    "obs": str({"diagnostico" : cadastro.diagnostico, "observacao" : cadastro.obs,"situacao" : cadastro.situacao}),
    "sex": "",
    "dateOfBirth": cadastro.nascimento,
    "country": "BR",
    "profession":cadastro.disciplina,  
    "educationLevel": "",
    "education": "",
    "idHealthInsurance": "",
    "healthProfessionalResponsible":cadastro.doutor,
    "healthInsurancePlan": "",
    "healthInsurancePlanCardNumber": "",
    "indicatedBy": str({"hospital" :cadastro.hospital,"data" :cadastro.procura}),
    "genre": cadastro.genero,
    "bloodType": "",
    "bloodFactor": "",
    "maritalStatus": "",
    "religion": "",
    "healthInsurancePlanCardNumberExpiry": "",
    "kinships": [],
    "responsibleName1": "",
    "kinship": "",
    "relationship": "",
    "acceptDuplicate": False,
    "acceptDuplicateCpf": False,
    "acceptMinorPatient": False,
    "cellphoneCountry": "BR"
    }
    try:
        response = envia_para_fila_rpc(body)
    except:
        print("rabbit mq error")
    response = 200
    return {"resposta": response}

@app.get("/buscar_paciente/{id_paciente}")
def buscar_paciente(id_paciente: str):
    resposta = envia_para_fila_rpc_busca_paciente(id_paciente)
    return resposta

@app.post("/agendar_paciente")
def agendar_paciente(agendamento: agendamento_schema):
    body = {
        "idPatient": agendamento.idPatient,
        "name": agendamento.name,
        "schedule": [
            {
                "id": item.id,
                "idScheduleReturn": item.idScheduleReturn,
                "dateSchudule": item.dateSchudule,
                "local": item.local,
                "idCalendar": item.idCalendar,
                "procedures": item.procedures,
                "hour": item.hour
            }
            for item in agendamento.schedule
        ]
    }
    return {"status": "ok"}

from placeholders import filaData
@app.get("/fila")
def fila_all():
    x =  get_base()
    print(x)
    return x

@app.post("/fila/filter")
def filtro_fila(filtros: dict):
    return filtrar_filas(filtros)

@app.post("/fila")
def add_fila(c: fila_schema):
    if(emfileirar(c.model_dump())):
        return {"add": "ok"}
    else:
        raise HTTPException(status_code=400, detail="Informações faltando ou mal formatadas")

@app.delete("/fila/{id}")
def pop_fila(id: int):
    if(pop(id)):
        return {"removido": "ok"}
    else:
        raise HTTPException(status_code=400, detail="ID inexistente")
    
@app.put("/fila/{id}")
def edit_fila(id: int, new_data: fila_schema):
    print(new_data)
    if(editar(id, new_data.model_dump())):
        return {"editado": "ok"}
    else:
        raise HTTPException(status_code=400, detail="ID inexistente")

@app.get("/grupo/{id}")
def own_grupos(id:str):
    return (get_grupos(id))

@app.get("/pront/{id}")
def own_pront(id:str):
    return get_proprios(id)

@app.get("/pront/group/{grupo}/{id}")
def pront_em_grupo(grupo: int, id: str):
    return get_prontuarios_permitidos(id, grupo)

@app.post("/pront")
def new_pront(u: pront_schema):
    if(create_prontuario(u.titulo, u.conteudo, u.user, u.grupo, True)):
        return {"criado": "ok"}
    else:
        raise HTTPException(status_code=400, detail="Grupo não existe ou não é membro")
    


@app.post("/grupo/new")
def new_user(u: grupo_schema):
    a = create_group(u.nome)
    if(a != False):
        add_user_to_group(u.criador, a, True)
        return {"criado": "ok"}
    else:
        raise HTTPException(status_code=400, detail="Usuário não existe")
    
@app.post("/grupo/add")
def add_to(u: add_schema):
    if(add_user_to_group(u.user, u.grupo, u.give_manager)):
        return {"adicionado": "ok"}
    else:
        raise HTTPException(status_code=400, detail="Usuário ou grupo não existem")

@app.get("/alunos/{id}")
def alunos(id: str):
    return get_alunos(id)

@app.get("/pacientes/{id}")
def pacientesof(id: str):
    return get_pacientes_do_user(id)

@app.get("agendamentos/user/{id}")
def agendofuser(id: str):
    return get_agendamentos_do_user(id)

@app.get("agendamento/paciente/{id}")
def agendofpac(id:int):
    return get_agendamentos_do_paciente(id)

@app.get("agendamento/paciente/of/{id_p}/{id_u}")
def agendofon(id_p: int, id_u: str):
    return get_agendamentos_do_paciente_por_responsavel(id_p, id_u)

@app.post("agendamento//new")
def agnew(u: ag_schema):
    if(create_agendamento(u.id, u.nome, u.user_id, u.pac_id)):
        return {"criado": "ok"}
    else:
        raise HTTPException(status_code=400, detail="Ocorreu um erro")

#rota catch all pra produção
from pathlib import Path
from placeholders import filaData
build_path = Path(__file__).parent / "dist"

try:
    app.mount("/", StaticFiles(directory=build_path, html=True), name="static")
except:
    print("Dist files not found on root.")
@app.get("/{full_path:path}")
def catch_all(full_path: str):

    index_file = build_path / "index.html"
    print(index_file)
    if index_file.exists():
        return FileResponse(index_file)
    return {"error": "index.html não encontrado. Tente em :8080"}