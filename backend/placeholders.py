from datetime import datetime
from schemas import fila_schema
# Dados convertidos para o formato do banco e schemas (fila_schema/Fila)

filaData = [
    {
        "id": 1,
        "nome": "Ana que veio do BACKEND!!!",
        "tel1": "(11) 91234-5678",
        "tel2": "(11) 99876-5432",
        "bairro": "Centro",
        "diagnostico": "Fratura no braço",
        "disciplina": "Ortopedia",
        "hospital": "Hospital São Lucas",
        "doutor": "Dr. Ricardo Lima",
        "procura": "2025-08-10",
        "situacao": "Em tratamento",
        "obs": None,
    },
    {
        "id": 2,
        "nome": "Carlos Pereira",
        "tel1": "(21) 92345-6789",
        "tel2": "(21) 98765-4321",
        "bairro": "Jardim das Flores",
        "diagnostico": "Lesão no joelho",
        "disciplina": "Fisioterapia",
        "hospital": "Hospital Santa Maria",
        "doutor": "Dra. Fernanda Costa",
        "procura": "2025-08-11",
        "situacao": "Concluído",
        "obs": None,
    },
    {
        "id": 3,
        "nome": "Mariana Lima",
        "tel1": "(31) 93456-7890",
        "tel2": "(31) 97654-3210",
        "bairro": "Bairro Verde",
        "diagnostico": "Tendinite",
        "disciplina": "Fisioterapia",
        "hospital": "Hospital das Clínicas",
        "doutor": "Dr. João Almeida",
        "procura": "2025-08-12",
        "situacao": "Fila de espera",
        "obs": None,
    },
    {
        "id": 4,
        "nome": "Lucas Fernandes",
        "tel1": "(41) 94567-8901",
        "tel2": "(41) 96543-2109",
        "bairro": "Centro",
        "diagnostico": "Entorse no tornozelo",
        "disciplina": "Ortopedia",
        "hospital": "Hospital Regional",
        "doutor": "Dra. Camila Rocha",
        "procura": "2025-08-12",
        "situacao": "Em tratamento",
        "obs": None,
    },
    {
        "id": 5,
        "nome": "Juliana Costa",
        "tel1": "(51) 95678-9012",
        "tel2": "(51) 97654-3210",
        "bairro": "Bairro Alto",
        "diagnostico": "Hérnia de disco",
        "disciplina": "Neurologia",
        "hospital": "Hospital Central",
        "doutor": "Dr. Roberto Martins",
        "procura": "2025-08-13",
        "situacao": "Concluído",
        "obs": None,
    },]

fila_schemas = [fila_schema(**{k: v for k, v in item.items()}) for item in filaData[1:]]
#
#from repositories.data import emfileirar
#[emfileirar(a.model_dump()) for a in fila_schemas]