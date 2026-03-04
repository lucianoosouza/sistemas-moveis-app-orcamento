import AsyncStorage from "@react-native-async-storage/async-storage";
import { Orcamento } from "../types";

const KEY = "@orcamentos:itens";

// Re-exportar tipo para compatibilidade
export type Item = Orcamento;

/**
 * Busca todos os orçamentos armazenados
 * @returns Lista de orçamentos ou array vazio em caso de erro
 */
export async function getItens(): Promise<Orcamento[]> {
  try {
    const jsonValue = await AsyncStorage.getItem(KEY);
    return jsonValue ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error("Erro ao obter itens:", error);
    return [];
  }
}

/**
 * Busca um orçamento específico pelo ID
 * @param id - ID do orçamento a buscar
 * @returns O orçamento encontrado ou null se não existir
 */
export async function getItem(id: string): Promise<Orcamento | null> {
  try {
    const itens = await getItens();
    return itens.find((item) => item.id === id) || null;
  } catch (error) {
    console.error("Erro ao obter item:", error);
    return null;
  }
}

/**
 * Salva a lista de orçamentos no armazenamento
 * @param itens - Lista de orçamentos a salvar
 * @throws Erro se não conseguir salvar
 */
export async function saveItens(itens: Orcamento[]): Promise<void> {
  try {
    const jsonValue = JSON.stringify(itens);
    await AsyncStorage.setItem(KEY, jsonValue);
  } catch (error) {
    console.error("Erro ao salvar itens:", error);
    throw error;
  }
}

/**
 * Adiciona um novo orçamento ao armazenamento
 * @param newItem - Orçamento a ser adicionado
 * @throws Erro se o orçamento já existe
 */
export async function addItem(newItem: Orcamento): Promise<void> {
  try {
    const itens = await getItens();

    // Validação: verifica se item já existe
    if (itens.some((item) => item.id === newItem.id)) {
      throw new Error(`Item com ID ${newItem.id} já existe`);
    }

    itens.push(newItem);
    await saveItens(itens);
  } catch (error) {
    console.error("Erro ao adicionar item:", error);
    throw error;
  }
}

/**
 * Atualiza um orçamento existente
 * @param id - ID do orçamento a atualizar
 * @param updatedData - Dados atualizados (parciais ou completos)
 * @throws Erro se orçamento não existe ou falha ao salvar
 */
export async function updateItem(
  id: string,
  updatedData: Partial<Orcamento>,
): Promise<void> {
  try {
    const itens = await getItens();
    const index = itens.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error(`Item com ID ${id} não encontrado`);
    }

    itens[index] = { ...itens[index], ...updatedData };
    await saveItens(itens);
  } catch (error) {
    console.error("Erro ao atualizar item:", error);
    throw error;
  }
}

/**
 * Remove um orçamento do armazenamento
 * @param id - ID do orçamento a remover
 * @throws Erro se orçamento não existe ou falha ao salvar
 */
export async function removeItem(id: string): Promise<void> {
  try {
    const itens = await getItens();
    const itemExiste = itens.some((item) => item.id === id);

    if (!itemExiste) {
      throw new Error(`Item com ID ${id} não encontrado`);
    }

    const filtered = itens.filter((item) => item.id !== id);
    await saveItens(filtered);
  } catch (error) {
    console.error("Erro ao remover item:", error);
    throw error;
  }
}

/**
 * Remove todos os orçamentos do armazenamento (reset)
 * @throws Erro se falha ao limpar
 */
export async function clearAllItens(): Promise<void> {
  try {
    await AsyncStorage.removeItem(KEY);
  } catch (error) {
    console.error("Erro ao limpar itens:", error);
    throw error;
  }
}
