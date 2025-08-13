from data import *

x = filtrar_filas({"nome": {
    "ilike": "%ped%",
}})

print(x)

print('\n')
print(get_base())