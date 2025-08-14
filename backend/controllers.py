from operator import index
from fastapi import FastAPI, File, HTTPException,Body
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from repositories.data import *
from services.rabbitmq_utils import envia_para_fila
from services.consumidor_cadastro import iniciar_consumidor
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
    # Configure CORS to accept requests from any origin



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
    "obs": str({"diagnostico" : cadastro.diagnostico, "observacao" : cadastro.observacao,"situacao" : cadastro.situacao}),
    "sex": "",
    "dateOfBirth": cadastro.dataNascimento,
    "country": "BR",
    "profession":cadastro.disciplina,  
    "educationLevel": "",
    "education": "",
    "idHealthInsurance": "",
    "healthProfessionalResponsible":cadastro.doutor,
    "healthInsurancePlan": "",
    "healthInsurancePlanCardNumber": "",
    "indicatedBy": str({"hospital" :cadastro.hospital,"data" :cadastro.dataProcura}),
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
    envia_para_fila(body)
    return {"status": "ok"}

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
    if(editar(id, new_data.model_dump())):
        return {"editado": "ok"}
    else:
        raise HTTPException(status_code=400, detail="ID inexistente")

@app.patch('/fila/{id}')
def patch_fila(id:int, change: dict):
    #WIP
    print(change)


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