// 1. Importamos a tipagem para garantir que o status seja apenas PENDING ou DONE.
import { FilterStatus } from "@/types/FilterStatus";

// 2. Importamos os ícones específicos da biblioteca Lucide.
// CircleCheck: Círculo com check (concluído)
// CircleDashed: Círculo tracejado (pendente)
import { CircleCheck, CircleDashed } from "lucide-react-native";

/**
 * Componente StatusIcon
 * @param status - Recebe o estado atual do item (FilterStatus).
 * * Este componente não usa uma View ao redor; ele retorna diretamente o ícone.
 */
export function StatusIcon({ status }: { status: FilterStatus }) {
  
  // Usamos o operador ternário para uma decisão rápida:
  return status === FilterStatus.DONE ? (
    // Se o status for DONE (concluído), exibe o check azul.
    <CircleCheck size={18} color="#2C46B1" />
  ) : (    
    // Caso contrário (PENDING), exibe o círculo tracejado preto.
    <CircleDashed size={18} color="#000000" />
  )
}