const apiUrl = import.meta.env.VITE_API_URL;

export type WaitingQueueRowChange = {
  id: string;
  fieldName: string;
  newValue: any;
};

export async function updateWaitingQueueRow(change: WaitingQueueRowChange): Promise<Response> {
  const { id, fieldName, newValue } = change;
  console.log(`Apiurl: ${apiUrl}`)
  try {
    const response = await fetch(`${apiUrl}/fila/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ [fieldName]: newValue }),
    });

    if (!response.ok) {
      // Lança um erro se a resposta não for bem-sucedida
      const errorMessage = `Erro ao atualizar a fila: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return response; // Retorna a resposta em caso de sucesso
  } catch (error) {
    console.error("Erro na atualização da fila:", error);
    throw error; // Propaga o erro para ser tratado onde a função for chamada
  }
}