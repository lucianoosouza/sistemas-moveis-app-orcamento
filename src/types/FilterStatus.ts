/**
 * Enum FilterStatus
 * Um Enum é uma forma de dar nomes amigáveis a um conjunto de valores constantes.
 * Isso evita erros de digitação e facilita a manutenção do código.
 */
export enum FilterStatus {
  // PENDING representa o valor "pending". 
  // No código, usaremos FilterStatus.PENDING em vez de escrever a string manualmente.
  PENDING = "pending",
  
  // DONE representa o valor "done".
  // Isso garante que todo o aplicativo use exatamente o mesmo termo para itens concluídos.
  DONE = "done",
}