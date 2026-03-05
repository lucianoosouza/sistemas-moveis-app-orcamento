// 1. Importamos os componentes necessários. 
// TouchableOpacity é o componente padrão para criar áreas clicáveis que dão feedback visual (ficam opacas ao tocar).
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native"
import { styles } from "./styles"

// 2. Definição de Tipagem (TypeScript)
// Estamos criando um tipo chamado 'Props'. 
// O '&' indica que nosso botão terá TODAS as propriedades de um TouchableOpacity comum (como onPress) 
// + uma propriedade obrigatória chamada 'title' do tipo string.
type Props = TouchableOpacityProps & {
  title: string
}

/**
 * Componente Button
 * @param title - O texto que aparecerá dentro do botão.
 * @param rest - O operador '...rest' (spread) coleta todas as outras propriedades (como onPress, disabled, etc).
 */
export function Button({ title, ...rest }: Props) {
  return (
    /* activeOpacity: Define quão transparente o botão fica ao ser clicado (0.8 é um brilho suave).
       {...rest}: Passamos todas as propriedades recebidas automaticamente para o TouchableOpacity nativo.
    */
    <TouchableOpacity style={styles.container} activeOpacity={0.8} {...rest}>
      
      {/* O texto do botão é estilizado separadamente */}
      <Text style={styles.title}>{title}</Text>
      
    </TouchableOpacity>
  )
}