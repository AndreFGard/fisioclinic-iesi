from sqlalchemy import create_engine
from repositories.data import FilaRepository


r = FilaRepository(create_engine("sqlite:///fisio.db"))
x = r.filtrar_filas({"nome": {
    "ilike": "%ped%",
}})

print(x)

print('\n')
print(r.get_base())
print('\n\n')



print(r.get_base())