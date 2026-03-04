import React from "react";
import { View, Text } from "react-native";
import { StatusOrcamento } from "../../types";
import { styles } from "./styles";

const statusColors: Record<StatusOrcamento, string> = {
  Rascunho: "#999999",
  Enviado: "#5bc0de",
  Aprovado: "#4CAF50",
  Recusado: "#F44336",
};

export function StatusBadge({ status }: { status: StatusOrcamento }) {
  return (
    <View style={[styles.statusBadge, { backgroundColor: statusColors[status] + "33" }]}>
      <View style={[styles.statusDot, { backgroundColor: statusColors[status] }]} />
      <Text style={[styles.statusText, { color: statusColors[status] }]}>{status}</Text>
    </View>
  );
}