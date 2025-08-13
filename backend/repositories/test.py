from data import *

x = filtrar_filas({"nome": {
    "ilike": "%ped%",
}})

print(x)

print('\n')
print(get_base())
print('\n\n')

editar(1, {
    "diagnostico": "escoliose"
})

print(get_base())