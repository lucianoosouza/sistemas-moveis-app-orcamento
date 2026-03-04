import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Trash2, Edit2 } from "lucide-react-native";
import { Orcamento } from "../../types";
import { StatusBadge } from "../StatusBadge";
import { styles } from "./styles";

interface OrcamentoCardProps {
  orcamento: Orcamento;
  onDelete?: () => void;
  onEdit?: () => void;
}

export function OrcamentoCard({
  orcamento,
  onDelete,
  onEdit,
}: OrcamentoCardProps) {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{orcamento.titulo}</Text>
        <Text style={styles.cardCliente}>{orcamento.cliente}</Text>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <StatusBadge status={orcamento.status} />
          {onEdit && (
            <TouchableOpacity onPress={onEdit}>
              <Edit2 color="#6a4eff" size={20} />
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity onPress={onDelete}>
              <Trash2 color="#ff4444" size={20} />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.cardValor}>
          R$ {orcamento.valorTotal.toFixed(2).replace(".", ",")}
        </Text>
      </View>
    </View>
  );
}
