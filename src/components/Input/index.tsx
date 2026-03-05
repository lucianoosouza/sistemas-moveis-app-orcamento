// 1. Importamos o TextInput (equivalente ao <input> do HTML) e sua tipagem de propriedades.
import { TextInput, TextInputProps } from "react-native";
import { styles } from "./styles";

/**
 * Componente Input Customizado
 * @param rest - Coleta todas as propriedades padrão do TextInput (onChangeText, value, keyboardType, etc).
 */
export function Input({ ...rest }: TextInputProps) {
  return (
    <TextInput 
      // Aplica a estilização visual definida no arquivo styles.ts
      style={styles.container}
      
      // Define a cor do texto de sugestão (placeholder) de forma fixa para manter a identidade visual.
      placeholderTextColor="#74798B"
      
      // O 'spread operator' permite que este componente aceite qualquer configuração 
      // de um TextInput nativo sem precisarmos declarar uma por uma.
      {...rest} 
    />
  )
}