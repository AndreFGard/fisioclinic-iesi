import { useState, useEffect } from "react";
import { MedicalChartDiff } from "@/components/patient";

// Chave para armazenamento local
const STORAGE_KEY = "medicalChartDiffs";

interface StoredDiffs {
  [patientId: string]: MedicalChartDiff[];
}

export function useMedicalChartHistory(patientId: string) {
  const [diffs, setDiffs] = useState<MedicalChartDiff[]>([]);

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const allDiffs: StoredDiffs = JSON.parse(stored);
        if (allDiffs[patientId]) {
          // Converter strings de data de volta para objetos Date
          const patientDiffs = allDiffs[patientId].map((diff) => ({
            ...diff,
            date: new Date(diff.date),
            previousVersion: diff.previousVersion
              ? {
                  ...diff.previousVersion,
                  date: new Date(diff.previousVersion.date),
                }
              : undefined,
            currentVersion: {
              ...diff.currentVersion,
              date: new Date(diff.currentVersion.date),
            },
          }));
          setDiffs(patientDiffs);
        }
      } catch (error) {
        console.error("Erro ao carregar histórico do localStorage:", error);
      }
    }
  }, [patientId]);

  // Função para salvar no localStorage
  const saveToStorage = (newDiffs: MedicalChartDiff[]) => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const allDiffs: StoredDiffs = stored ? JSON.parse(stored) : {};
      allDiffs[patientId] = newDiffs;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allDiffs));
    } catch (error) {
      console.error("Erro ao salvar histórico no localStorage:", error);
    }
  };

  // Adicionar nova diferença
  const addDiff = (diff: MedicalChartDiff) => {
    const newDiffs = [...diffs, diff];
    setDiffs(newDiffs);
    saveToStorage(newDiffs);
  };

  // Limpar histórico (para testes)
  const clearHistory = () => {
    setDiffs([]);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const allDiffs: StoredDiffs = JSON.parse(stored);
        delete allDiffs[patientId];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allDiffs));
      }
    } catch (error) {
      console.error("Erro ao limpar histórico:", error);
    }
  };

  return {
    diffs,
    addDiff,
    clearHistory,
  };
}
