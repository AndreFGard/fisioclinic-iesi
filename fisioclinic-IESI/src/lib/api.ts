const apiUrl = import.meta.env.VITE_API_URL;

export type FilaDeEspera = {
  id: string
  nome: string
  idade: number
  tel1: string
  tel2: string
  bairro: string
  diagnostico: string
  disciplina: string
  hospital: string
  doutor: string
  procura: string
  situacao: string
  prioridade: string
}

export type PatientData = {
  nome: string;
  cpf: string;
  id: string | number | undefined;
  nascimento: Date | undefined;
  genero: string| undefined;

  // Contato
  tel1: string | undefined;
  tel2: string | undefined;
  bairro: string | undefined;
  cidade: string | undefined;

  // Dados clínicos
  diagnostico: string | undefined;
  disciplina: string | undefined;
  hospital: string | undefined;
  doutor: string | undefined;
  procura: Date | undefined;
  situacao: string | undefined;
  prioridade: any | undefined;
  obs: string | undefined;
}

export async function createPatient(patient: PatientData){
    try {
        const response = await fetch(`${apiUrl}/cadastro_paciente`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(patient),
        });
        console.log(JSON.stringify(response))
        if (!response.ok) {
            const errorMessage = `Erro ao criar o paciente: ${response.status} ${response.statusText}`;
            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error) {
        console.error("Erro ao criar o paciente:", error);
        throw error;
    }
}
export async function createEnfileirado(patient: PatientData){
    try {
        const response = await fetch(`${apiUrl}/fila`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(patient),
        });
        console.log(JSON.stringify(response))
        if (!response.ok) {
            const errorMessage = `Erro ao criar o paciente: ${response.status} ${response.statusText}`;
            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error) {
        console.error("Erro ao criar o paciente:", error);
        throw error;
    }
}


export async function getPatient(id: string): Promise<PatientData>{
    try {
        const response = await fetch(`${apiUrl}/paciente/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(JSON.stringify(response))
        if (!response.ok) {
            const errorMessage = `Erro ao buscar o paciente: ${response.status} ${response.statusText}`;
            throw new Error(errorMessage);
        }
        return await response.json();
    } catch (error) {
        console.error("Erro ao buscar o paciente:", error);
        throw error;
    }
}

export async function getPront(userId: string): Promise<PatientData>{
    try {
        const response = await fetch(`${apiUrl}/paciente/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(JSON.stringify(response))
        if (!response.ok) {
            const errorMessage = `Erro ao buscar o paciente: ${response.status} ${response.statusText}`;
            throw new Error(errorMessage);
        }
        return await response.json();
    } catch (error) {
        console.error("Erro ao buscar o paciente:", error);
        throw error;
    }
}


export async function replaceEntireWaitingQueueRow(patient: FilaDeEspera): Promise<Response> {
    const { id } = patient;
    try {
        const response = await fetch(`${apiUrl}/fila/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(patient),
        });

        if (!response.ok) {
            const errorMessage = `Erro ao atualizar o paciente: ${response.status} ${response.statusText}`;
            throw new Error(errorMessage);
        }

        return response;
    } catch (error) {
        console.error("Erro na atualização do paciente:", error);
        throw error;
    }
}

export async function getWaitingQueueData(): Promise<FilaDeEspera[]> {
    try {
        const response = await fetch(`${apiUrl}/fila`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorMessage = `Erro ao buscar a fila: ${response.status} ${response.statusText}`;
            throw new Error(errorMessage);
        }

        const data: FilaDeEspera[] = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar a fila:", error);
        throw error;
    }
}

export async function getPatientList(): Promise<FilaDeEspera[]> {
    try {
        const response = await fetch(`${apiUrl}/getpatients`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorMessage = `Erro ao buscar a fila: ${response.status} ${response.statusText}`;
            throw new Error(errorMessage);
        }

        const data: FilaDeEspera[] = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar a fila:", error);
        throw error;
    }
}

