// 1. Importamos o StyleSheet, que é o motor de estilização do React Native.
import { StyleSheet } from "react-native";

/**
 * Definição dos estilos do componente Button.
 * Note que exportamos 'styles' para que o componente principal possa consumi-lo.
 */
export const styles = StyleSheet.create({
  // O container é a "casca" ou o corpo do botão (TouchableOpacity)
  container: {
    // Definimos uma cor de fundo sólida (um tom de azul vibrante)
    backgroundColor: "#2C46B1",
    
    // Altura fixa de 48px, que é o padrão recomendado para uma boa área de toque (touch target)
    height: 48,
    
    // Ocupa toda a largura disponível do elemento pai
    width: '100%',
    
    // Arredonda as bordas para dar um aspecto mais moderno e amigável
    borderRadius: 8,
    
    // Alinha o texto exatamente no centro horizontal do botão
    alignItems: 'center',
    
    // Alinha o texto exatamente no centro vertical do botão
    justifyContent: 'center',
  },

  // Estilo específico para o texto que vai dentro do botão
  title: {
    // Cor branca para garantir alto contraste com o fundo azul
    color: "#FFFFFF",
    
    // Tamanho da fonte equilibrado para leitura rápida
    fontSize: 14,
    
    // Define o peso da fonte (semi-bold) para destacar o texto da ação
    fontWeight: '600',
  },
})