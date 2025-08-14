from data import *

create_paciente(123, "joba")
create_agendamento(1, "aaaaaaaaa", "alice", 123)
print(get_agendamentos_do_user("alice"))