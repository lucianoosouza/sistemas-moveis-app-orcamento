import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16, paddingTop: 40 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  title: { fontSize: 24, fontWeight: "bold", color: "#6a4eff" },
  subtitle: { color: "#666", marginTop: 4 },
  botaoNovo: {
    backgroundColor: "#6a4eff",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  botaoNovoTexto: { color: "white", fontWeight: "bold", fontSize: 16 },
  buscaContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 40,
  },
  buscaInput: {
    flex: 1,
    fontSize: 16,
  },
  filtroBotao: {
    marginLeft: 8,
  },
});