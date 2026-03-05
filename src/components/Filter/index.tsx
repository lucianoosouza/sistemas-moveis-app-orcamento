// 1. Importações de Tipagem e Componentes
import { FilterStatus } from "@/types/FilterStatus"; // Enum ou Type que define os estados (DONE/PENDING)
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { styles } from "./styles";
import { StatusIcon } from "../StatusIcon"; // Ícone visual que muda conforme o status

// 2. Definição das Propriedades (Props)
// Estendemos as propriedades do TouchableOpacity para que o Filtro aceite cliques (onPress).
type Props = TouchableOpacityProps & {
  status: FilterStatus // Define se o filtro é para itens "Comprados" ou "Pendentes"
  isActive: boolean    // Define se este filtro está selecionado no momento
}

/**
 * Componente Filter
 * @param status - O estado que este botão representa.
 * @param isActive - Booleano que controla a opacidade visual do botão.
 */
export function Filter({ status, isActive, ...rest }: Props) {
  return (
    <TouchableOpacity 
      /* Renderização Condicional de Estilo:
         Passamos um array para o 'style'. O primeiro é o estilo fixo, 
         o segundo é um objeto que muda a opacidade se o filtro não estiver ativo.
      */
      style={[styles.container, { opacity: isActive ? 1 : 0.5 }]} 
      activeOpacity={0.8}
      {...rest} 
      >
      
      {/* Componente que renderiza a "bolinha" ou ícone de check/relógio */}
      <StatusIcon status={status} />

      <Text style={styles.title}>
        {/* Lógica Condicional: Se o status for DONE, escreve "Comprados", 
            caso contrário (PENDING), escreve "Pendentes". */}
        { status === FilterStatus.DONE ? "Comprados" : "Pendentes" }
      </Text>
      
    </TouchableOpacity>
  )
}