import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fafafa",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  cardCliente: {
    color: "#666",
    fontSize: 14,
  },
  cardValor: {
    fontWeight: "bold",
    fontSize: 16,
  },
});