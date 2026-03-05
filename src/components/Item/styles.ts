// 1. Importamos o StyleSheet para criar regras de estilo otimizadas para dispositivos móveis.
import { StyleSheet } from "react-native";

/**
 * Definição dos estilos para o componente Item.
 * O foco aqui é o alinhamento horizontal e a distribuição de espaço.
 */
export const styles = StyleSheet.create({
  // O container é a "linha" da nossa lista
  container: {
    // Coloca o ícone de status, o texto e a lixeira um ao lado do outro.
    flexDirection: "row",
    
    // Garante que todos os elementos da linha fiquem alinhados pelo centro vertical.
    alignItems: 'center',
    
    // Adiciona um espaçamento de 7px entre cada elemento da linha (ícone -> texto -> lixeira).
    gap: 7,
  },

  // Estilo para a descrição do produto (o texto central)
  description: {
    // O PULO DO GATO: flex: 1 faz com que o texto "empurre" os ícones para as extremidades.
    // Ele diz ao React Native: "Ocupe todo o espaço que sobrar nesta linha".
    flex: 1,
    
    // Tamanho da fonte padrão para leitura de listas.
    fontSize: 14,
    
    // Peso da fonte Semi-Bold para dar corpo ao texto do item.
    fontWeight: '600',
  }
})