// 1. Importamos o StyleSheet, a ferramenta padrão para criar estilos no React Native.
import { StyleSheet } from "react-native";

/**
 * Definição dos estilos para o componente Input.
 * Aqui focamos em legibilidade e no design do campo de texto.
 */
export const styles = StyleSheet.create({
  // O container define a aparência visual da caixa de texto (Input)
  container: {
    // Cor de fundo branca para destacar o campo sobre o fundo cinza da aplicação.
    backgroundColor: '#FFFFFF',
    
    // paddingHorizontal: Aplica um espaçamento interno nas laterais (esquerda e direita).
    // Isso evita que o cursor do texto fique "colado" na borda do campo.
    paddingHorizontal: 16,
    
    // Altura de 48px, seguindo o padrão de acessibilidade para facilitar o toque.
    height: 48,
    
    // Ocupa 100% da largura do elemento pai (o View do formulário na Home).
    width: '100%',
    
    // Arredonda as bordas em 8px para um visual moderno e suave.
    borderRadius: 8,
    
    // borderWidth: Define a espessura da borda ao redor do campo.
    borderWidth: 1,
    
    // borderColor: Define uma cor cinza suave para a borda, dando profundidade ao campo.
    borderColor: '#C3C5CB'
  }
})