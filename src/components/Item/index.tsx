// 1. Importações de Componentes, Tipagens e Ícones
import { FilterStatus } from "@/types/FilterStatus"
import { Text, TouchableOpacity, View } from "react-native"
import { styles } from "./styles"
import { StatusIcon } from "../StatusIcon"
// Importamos o ícone de lixeira da biblioteca Lucide, adaptada para React Native.
import { Trash2 } from "lucide-react-native"

// 2. Definição do Tipo de Dados do Item
// Define o que um "Produto" possui: um status (Pendente/Feito) e uma descrição.
type ItemData = {
  status: FilterStatus
  description: string
}

// 3. Definição das Propriedades (Props)
// Além dos dados, recebemos duas funções (callbacks) para lidar com as ações do usuário.
type Props = {
  data: ItemData      // Os dados do item em si
  onRemove: () => void // Função que será executada ao clicar na lixeira
  onStatus: () => void // Função que será executada ao clicar no ícone de status
}

/**
 * Componente Item
 * Representa uma linha individual na nossa FlatList.
 */
export function Item({ data, onStatus, onRemove }: Props) {
  return (
    <View style={styles.container}>
      
      {/* Botão de Status: Ao clicar, dispara a função onStatus para marcar como comprado ou pendente */}
      <TouchableOpacity activeOpacity={0.8} onPress={onStatus}>
        <StatusIcon status={data.status} />
      </TouchableOpacity>

      {/* Exibição da descrição do produto (ex: "3 cebolas") */}
      <Text style={styles.description}>
        {data.description}
      </Text>

      {/* Botão de Remover: Utiliza o ícone Trash2 para indicar a ação de exclusão */}
      <TouchableOpacity onPress={onRemove}>
        <Trash2 size={18} color="#828282" />
      </TouchableOpacity>
      
    </View>
  )
}