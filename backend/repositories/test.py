from data import FilaRepository


r = FilaRepository()
x = r.filtrar_filas({"nome": {
    "ilike": "%ped%",
}})

print(x)

print('\n')
print(r.get_base())
print('\n\n')



print(r.get_base())