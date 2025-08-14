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
  "medico(a)": string
  "data da procura": string
  situacao: string
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