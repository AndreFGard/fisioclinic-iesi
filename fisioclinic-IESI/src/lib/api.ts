const apiUrl = import.meta.env.VITE_API_URL;

export type FilaDeEspera = {
  id: string
  nome: string
  idade: number
  "telefone-1": string
  "telefone-2": string
  bairro: string
  diagnostico: string
  disciplina: string
  hospital: string
  "medico(a)": string
  "data da procura": string
  situacao: string
}


export type WaitingQueueRowChange = {
  id: string;
  fieldName: string;
  newValue: any;
};



export async function updateWaitingQueueField(change: WaitingQueueRowChange): Promise<Response> {
  const { id, fieldName, newValue } = change;
  try {
    const response = await fetch(`${apiUrl}/fila/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ [fieldName]: newValue }),
    });

    if (!response.ok) {
      const errorMessage = `Erro ao atualizar a fila: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return response;
  } catch (error) {
    console.error("Erro na atualização da fila:", error);
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