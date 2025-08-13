from fastapi import FastAPI

from schemas import *

app = FastAPI()

@app.get("/")
def read_root():
    return {"status": "ok"}

@app.post("/cadastro_paciente")
def cadastro_paciente(cadastro:cadastro_schema):
    #algumas informaçoes tiveram que ser colocadas em campos improvisados 
    data = {
    "name":cadastro.nome,
    "birthName": None,
    "flagWhatsapp": False,
    "cns": "",
    "sns": "",
    "address":cadastro.bairro,
    "number": "",
    "rg": "",
    "cpf": "",
    "passport": "",
    "passport_valid_date": "",
    "apartment": "",
    "neighborhood": "",
    "city": "",
    "state": "",
    "zip": "",
    "cellphone":cadastro.telefone,
    "phone": "",
    "email": "",
    "obs":cadastro.diagnostico,
    "sex": "",
    "dateOfBirth": "15/06/1985",
    "country": "BR",
    "profession":cadastro.disciplina,  
    "educationLevel": "",
    "education": "",
    "idHealthInsurance": "",
    "healthProfessionalResponsible":cadastro.doutor,
    "healthInsurancePlan": "",
    "healthInsurancePlanCardNumber": "",
    "indicatedBy": str({"hospital" :cadastro.hospital,"data" :cadastro.dataProcura}),
    "genre": "",
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
    return {}