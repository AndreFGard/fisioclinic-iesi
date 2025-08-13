from fastapi import FastAPI, HTTPException
from repositories.data import *
from services.rabbitmq_utils import envia_para_fila
from schemas import *

app = FastAPI()

@app.get("/")
def read_root():
    return {"status": "ok"}

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
    "cellphone":cadastro.telefone1,
    "phone": cadastro.telefone2,
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

@app.get("/fila")
def fila_all():
    return get_base()

@app.post("/fila/filter")
def filtro_fila(filtros: dict):
    return filtrar_filas(filtros)

@app.post("/fila")
def add_fila(c: fila_schema):
    if(emfileirar(c)):
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
def edit_fila(id: int, change: edicao_schema):
    if(editar(id, change)):
        return {"editado": "ok"}
    else:
        raise HTTPException(status_code=400, detail="ID inexistente")