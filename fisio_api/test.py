from data import *

x = filtrar_filas({"nome": {
    "ilike": "%ped%",
}})

print(x)