export type StatusOrcamento = "Rascunho" | "Enviado" | "Aprovado" | "Recusado";

export interface Orcamento {
  id: string;
  titulo: string;
  cliente: string;
  status: StatusOrcamento;
  valorTotal: number;
}