// 1. Importamos o StyleSheet para criar nossa folha de estilos otimizada.
import { StyleSheet } from "react-native";

/**
 * Definição dos estilos para o componente Filter.
 * Este estilo foca no alinhamento entre o ícone (StatusIcon) e o texto (Label).
 */
export const styles = StyleSheet.create({
  // O container define como o botão de filtro se comporta internamente
  container: {
    // flexDirection: 'row' é fundamental aqui. 
    // Por padrão, o React Native empilha os itens (coluna). 
    // 'row' coloca o ícone e o texto um ao lado do outro.
    flexDirection: 'row',
    
    // Alinha verticalmente o ícone e o texto para que fiquem centralizados na mesma linha.
    alignItems: 'center',
    
    // Cria um espaçamento de 5px entre o ícone e o texto sem precisar de margens individuais.
    gap: 5,
  },
  
  // Estilo para o texto do filtro (ex: "Pendentes" ou "Comprados")
  title: {
    // Tamanho da fonte levemente menor para dar um aspecto de tag/filtro.
    fontSize: 12,
    
    // Define o peso da fonte como Semi-Bold para dar destaque à categoria.
    fontWeight: '600',
  }
})