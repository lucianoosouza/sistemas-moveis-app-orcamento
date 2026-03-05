// Importa o React e os hooks useState (gerenciar estado) e useEffect (executar efeitos colaterais)
import React, { useState, useEffect } from "react";
// Importa componentes visuais e utilitários do React Native
import {
  View,          // Container genérico (equivalente a uma <div>)
  Text,          // Componente para exibir texto
  FlatList,      // Lista otimizada para renderizar grandes quantidades de itens
  TextInput,     // Campo de entrada de texto
  TouchableOpacity, // Botão que reduz opacidade ao toque
  ActivityIndicator, // Indicador de carregamento (spinner)
  Modal,         // Janela modal que aparece sobre o conteúdo
  Alert,         // Caixa de diálogo nativa do sistema (alertas)
  KeyboardAvoidingView, // Ajusta o layout quando o teclado aparece, evitando sobreposição
  Platform,      // Detecta o sistema operacional (iOS ou Android)
  ScrollView,    // Permite rolar o conteúdo quando excede a tela
} from "react-native";
// Importa o ícone "X" (fechar) da biblioteca de ícones Lucide para React Native
import { X } from "lucide-react-native";

// Importa as funções de acesso ao armazenamento local (CRUD de orçamentos)
import {
  getItens,    // Busca todos os orçamentos salvos
  addItem,     // Adiciona um novo orçamento
  removeItem,  // Remove um orçamento pelo ID
  updateItem,  // Atualiza um orçamento existente
} from "../../storage/itemStorage";
// Importa os tipos TypeScript que definem a estrutura dos dados
import { Orcamento, StatusOrcamento } from "../../types";
// Importa o componente de card que exibe cada orçamento na lista
import { OrcamentoCard } from "../../components/OrcamentoCard";

// Importa os estilos definidos no arquivo styles.ts
import { styles } from "./styles";

// Define as opções de status disponíveis para um orçamento
const STATUS_OPCOES: StatusOrcamento[] = [
  "Rascunho",  // Orçamento ainda em elaboração
  "Enviado",   // Orçamento enviado ao cliente
  "Aprovado",  // Orçamento aceito pelo cliente
  "Recusado",  // Orçamento rejeitado pelo cliente
];

// Componente principal da tela Home, exportado como padrão
export default function Home() {
  // Estado para armazenar o texto digitado na barra de busca
  const [busca, setBusca] = useState("");
  // Estado para armazenar a lista de orçamentos carregados do storage
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);
  // Estado que indica se os dados ainda estão sendo carregados (exibe spinner)
  const [estaCarregando, setEstaCarregando] = useState(true);
  // Estado que controla a visibilidade do modal de criação/edição
  const [mostraModal, setMostraModal] = useState(false);
  // Estado para o campo "título" do formulário do modal
  const [novoTitulo, setNovoTitulo] = useState("");
  // Estado para o campo "cliente" do formulário do modal
  const [novoCliente, setNovoCliente] = useState("");
  // Estado para o campo "valor" do formulário do modal
  const [novoValor, setNovoValor] = useState("");
  // Estado para o status selecionado no formulário do modal
  const [novoStatus, setNovoStatus] = useState<StatusOrcamento>("Rascunho");
  // Estado que guarda o orçamento sendo editado (null = modo criação)
  const [orcamentoEmEdicao, setOrcamentoEmEdicao] = useState<Orcamento | null>(
    null,
  );

  // useEffect com array de dependências vazio [] — executa apenas uma vez ao montar o componente
  useEffect(() => {
    carregarOrcamentos(); // Chama a função para buscar os orçamentos do storage
  }, []);

  // Função assíncrona que carrega todos os orçamentos do armazenamento local
  async function carregarOrcamentos() {
    try {
      setEstaCarregando(true);         // Ativa o indicador de carregamento
      const dados = await getItens();  // Busca os dados do AsyncStorage
      setOrcamentos(dados);            // Atualiza o estado com os dados recebidos
    } catch (error) {
      console.error("Erro ao carregar orçamentos:", error); // Loga o erro no console
      setOrcamentos([]);               // Em caso de erro, define lista vazia
    } finally {
      setEstaCarregando(false);        // Desativa o indicador de carregamento (sempre executa)
    }
  }

  // Função assíncrona que cria um novo orçamento ou atualiza um existente
  async function criarNovoOrcamento() {
    // Valida se todos os campos foram preenchidos (trim remove espaços em branco)
    if (!novoTitulo.trim() || !novoCliente.trim() || !novoValor.trim()) {
      Alert.alert("Erro", "Por favor, preencha todos os campos"); // Exibe alerta de erro
      return; // Interrompe a execução
    }

    try {
      const valor = parseFloat(novoValor); // Converte o texto do valor para número decimal
      // Verifica se o valor é um número válido e positivo
      if (isNaN(valor) || valor <= 0) {
        Alert.alert("Erro", "O valor deve ser um número positivo");
        return;
      }

      // Verifica se estamos editando um orçamento existente
      if (orcamentoEmEdicao) {
        // Atualiza o orçamento no AsyncStorage com os novos dados
        await updateItem(orcamentoEmEdicao.id, {
          titulo: novoTitulo.trim(),   // Remove espaços do título
          cliente: novoCliente.trim(), // Remove espaços do cliente
          status: novoStatus,          // Status selecionado
          valorTotal: valor,           // Valor numérico
        });
        // Atualiza o estado local substituindo o orçamento editado na lista
        setOrcamentos(
          orcamentos.map((o) =>
            o.id === orcamentoEmEdicao.id // Encontra o item pelo ID
              ? {
                  ...o,                        // Mantém as propriedades anteriores
                  titulo: novoTitulo.trim(),   // Sobrescreve com os novos valores
                  cliente: novoCliente.trim(),
                  status: novoStatus,
                  valorTotal: valor,
                }
              : o, // Mantém os outros itens inalterados
          ),
        );
        Alert.alert("Sucesso", "Orçamento atualizado com sucesso!"); // Notifica o usuário
      } else {
        // Modo de criação — cria um novo objeto Orcamento
        const novoOrcamento: Orcamento = {
          id: Date.now().toString(),    // Gera um ID único baseado no timestamp atual
          titulo: novoTitulo.trim(),    // Título sem espaços extras
          cliente: novoCliente.trim(),  // Cliente sem espaços extras
          status: novoStatus,           // Status selecionado no formulário
          valorTotal: valor,            // Valor convertido para número
        };

        await addItem(novoOrcamento);                      // Salva no AsyncStorage
        setOrcamentos([...orcamentos, novoOrcamento]);     // Adiciona ao estado local (spread + novo)
        Alert.alert("Sucesso", "Orçamento criado com sucesso!");
      }

      // Limpa o formulário e fecha o modal após salvar com sucesso
      setMostraModal(false);           // Fecha o modal
      setNovoTitulo("");               // Limpa o campo título
      setNovoCliente("");              // Limpa o campo cliente
      setNovoValor("");                // Limpa o campo valor
      setNovoStatus("Rascunho");       // Reseta o status para o padrão
      setOrcamentoEmEdicao(null);      // Remove a referência de edição
    } catch (error) {
      console.error("Erro ao salvar orçamento:", error);
      Alert.alert("Erro", "Não foi possível salvar o orçamento");
    }
  }

  // Função assíncrona que exibe um alerta de confirmação antes de deletar
  async function deletarOrcamento(id: string) {
    Alert.alert(
      "Confirmar exclusão",                                  // Título do alerta
      "Tem certeza que deseja deletar este orçamento?",      // Mensagem do alerta
      [
        {
          text: "Cancelar",    // Texto do botão cancelar
          onPress: () => {},   // Não faz nada ao cancelar
          style: "cancel",     // Estilo visual de cancelamento
        },
        {
          text: "Deletar",     // Texto do botão deletar
          onPress: async () => {
            try {
              await removeItem(id);                                    // Remove do AsyncStorage
              setOrcamentos(orcamentos.filter((o) => o.id !== id));    // Remove do estado local (filtra excluindo o ID)
              Alert.alert("Sucesso", "Orçamento deletado com sucesso!");
            } catch (error) {
              console.error("Erro ao deletar orçamento:", error);
              Alert.alert("Erro", "Não foi possível deletar o orçamento");
            }
          },
          style: "destructive", // Estilo visual destrutivo (vermelho no iOS)
        },
      ],
    );
  }

  // Função que preenche o formulário do modal com os dados do orçamento a ser editado
  function abrirEdicao(orcamento: Orcamento) {
    setOrcamentoEmEdicao(orcamento);                   // Define qual orçamento está sendo editado
    setNovoTitulo(orcamento.titulo);                   // Preenche o campo título com o valor atual
    setNovoCliente(orcamento.cliente);                 // Preenche o campo cliente
    setNovoValor(orcamento.valorTotal.toString());     // Converte o número para string e preenche
    setNovoStatus(orcamento.status);                   // Define o status atual
    setMostraModal(true);                              // Abre o modal
  }

  // Função que fecha o modal e limpa todos os campos do formulário
  function fecharModal() {
    setMostraModal(false);          // Esconde o modal
    setNovoTitulo("");              // Limpa título
    setNovoCliente("");             // Limpa cliente
    setNovoValor("");               // Limpa valor
    setNovoStatus("Rascunho");      // Reseta status
    setOrcamentoEmEdicao(null);     // Remove referência de edição
  }

  // Filtra os orçamentos com base no texto de busca (por título ou cliente)
  const orcamentosFiltrados = busca.trim()
    ? orcamentos.filter(                          // Se há texto de busca, filtra a lista
        (o) =>
          o.titulo.toLowerCase().includes(busca.toLowerCase()) ||   // Busca no título (case-insensitive)
          o.cliente.toLowerCase().includes(busca.toLowerCase()),    // Busca no cliente (case-insensitive)
      )
    : orcamentos; // Se busca vazia, mostra todos

  // Conta quantos orçamentos estão com status "Rascunho"
  const rascunhosCount = orcamentos.filter(
    (o) => o.status === "Rascunho",
  ).length;

  // Retorno do JSX — estrutura visual do componente
  return (
    // Container principal da tela
    <View style={styles.container}>
      {/* Renderização condicional: se está carregando, mostra spinner; senão, mostra conteúdo */}
      {estaCarregando ? (
        // Container centralizado com o indicador de carregamento
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6a4eff" />
        </View>
      ) : (
        // Fragment (<>) agrupa múltiplos elementos sem adicionar um nó extra na árvore
        <>
          {/* Cabeçalho com título e botão de novo orçamento */}
          <View style={styles.header}>
            <View>
              {/* Título principal da tela */}
              <Text style={styles.title}>Orçamentos</Text>
              {/* Subtítulo mostrando quantidade de rascunhos (com plural condicional) */}
              <Text style={styles.subtitle}>
                Você tem {rascunhosCount} item{rascunhosCount !== 1 ? "s" : ""}{" "}
                em rascunho
              </Text>
            </View>
            {/* Botão que abre o modal para criar novo orçamento */}
            <TouchableOpacity
              style={styles.botaoNovo}
              onPress={() => setMostraModal(true)} // Ao pressionar, abre o modal
            >
              <Text style={styles.botaoNovoTexto}>+ Novo</Text>
            </TouchableOpacity>
          </View>

          {/* Barra de busca */}
          <View style={styles.buscaContainer}>
            {/* Campo de texto para digitar a busca */}
            <TextInput
              style={styles.buscaInput}
              placeholder="Título ou cliente"      // Texto de dica quando vazio
              value={busca}                        // Valor controlado pelo estado
              onChangeText={setBusca}              // Atualiza o estado a cada digitação
              clearButtonMode="while-editing"      // Botão de limpar no iOS
            />
            {/* Botão de filtro (ícone de engrenagem) */}
            <TouchableOpacity style={styles.filtroBotao}>
              <Text style={styles.filterButtonText}>⚙️</Text>
            </TouchableOpacity>
          </View>

          {/* Lista de orçamentos usando FlatList para renderização otimizada */}
          <FlatList
            data={orcamentosFiltrados}             // Dados filtrados pela busca
            keyExtractor={(item) => item.id}       // Chave única para cada item (necessária para performance)
            renderItem={({ item }) => (            // Função que renderiza cada item da lista
              <OrcamentoCard
                orcamento={item}                           // Passa os dados do orçamento para o card
                onEdit={() => abrirEdicao(item)}           // Callback ao pressionar editar
                onDelete={() => deletarOrcamento(item.id)} // Callback ao pressionar deletar
              />
            )}
            contentContainerStyle={styles.flatListContent} // Estilo do container interno da lista
            showsVerticalScrollIndicator={false}           // Esconde a barra de rolagem vertical
          />

          {/* Modal (janela sobreposta) para criar ou editar um orçamento */}
          <Modal
            animationType="slide"        // Animação de entrada: desliza de baixo para cima
            transparent={true}           // Fundo transparente (permite ver a tela atrás)
            visible={mostraModal}        // Controlado pelo estado — visível ou não
            onRequestClose={fecharModal} // Callback ao pressionar botão voltar (Android)
          >
            {/* KeyboardAvoidingView: empurra o conteúdo para cima quando o teclado aparece */}
            <KeyboardAvoidingView
              style={styles.modalBackground}
              behavior={Platform.OS === "ios" ? "padding" : "height"} // Comportamento diferente por plataforma
            >
              {/* ScrollView: permite rolar o formulário se o teclado cobrir campos */}
              <ScrollView
                contentContainerStyle={styles.modalContent}
                keyboardShouldPersistTaps="handled" // Mantém o teclado aberto ao tocar em botões
              >
                {/* Container interno do modal com fundo branco e bordas arredondadas */}
                <View style={styles.modalInner}>
                {/* Cabeçalho do modal com título e botão de fechar */}
                <View style={styles.modalHeader}>
                  {/* Título dinâmico: muda conforme esteja editando ou criando */}
                  <Text style={styles.modalTitle}>
                    {orcamentoEmEdicao ? "Editar Orçamento" : "Novo Orçamento"}
                  </Text>
                  {/* Botão X para fechar o modal */}
                  {/* Botão X para fechar o modal */}
                  <TouchableOpacity onPress={fecharModal}>
                    <X color="#000" size={24} />
                  </TouchableOpacity>
                </View>

                {/* Campo de entrada para o título do orçamento */}
                <TextInput
                  style={styles.modalInput}
                  placeholder="Título do orçamento"    // Texto de dica
                  value={novoTitulo}                   // Valor controlado pelo estado
                  onChangeText={setNovoTitulo}         // Atualiza o estado ao digitar
                  placeholderTextColor="#999"           // Cor do placeholder
                />

                {/* Campo de entrada para o nome do cliente */}
                <TextInput
                  style={styles.modalInput}
                  placeholder="Nome do cliente"
                  value={novoCliente}
                  onChangeText={setNovoCliente}
                  placeholderTextColor="#999"
                />

                {/* Campo de entrada para o valor (teclado numérico decimal) */}
                <TextInput
                  style={styles.modalInput}
                  placeholder="Valor (ex: 1000,00)"
                  value={novoValor}
                  onChangeText={setNovoValor}
                  keyboardType="decimal-pad"           // Exibe teclado numérico com ponto decimal
                  placeholderTextColor="#999"
                />

                {/* Rótulo "Status" acima dos botões de seleção */}
                <Text style={styles.statusLabel}>Status</Text>
                {/* Container dos botões de status em linha horizontal */}
                <View style={styles.statusContainer}>
                  {/* Itera sobre as opções de status e cria um botão para cada */}
                  {STATUS_OPCOES.map((status) => (
                    <TouchableOpacity
                      key={status}                                 // Chave única para o React
                      onPress={() => setNovoStatus(status)}        // Seleciona o status ao pressionar
                      style={[
                        styles.statusButton,                       // Estilo base do botão
                        novoStatus === status                      // Aplica estilo ativo ou inativo
                          ? styles.statusButtonActive              // Fundo roxo se selecionado
                          : styles.statusButtonInactive,           // Fundo cinza se não selecionado
                      ]}
                    >
                      {/* Texto do botão de status com cor condicional */}
                      <Text
                        style={[
                          styles.statusButtonText,                 // Estilo base do texto
                          novoStatus === status
                            ? styles.statusButtonTextActive        // Texto branco se selecionado
                            : styles.statusButtonTextInactive,     // Texto preto se não selecionado
                        ]}
                      >
                        {status}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Botão de submissão do formulário (criar ou atualizar) */}
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={criarNovoOrcamento}         // Chama a função de criação/atualização
                >
                  {/* Texto dinâmico do botão conforme o modo (criação ou edição) */}
                  <Text style={styles.submitButtonText}>
                    {orcamentoEmEdicao
                      ? "Atualizar Orçamento"          // Modo edição
                      : "Criar Orçamento"}             
                  </Text>
                </TouchableOpacity>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </Modal>
        </>
      )}
    </View>
  );
}
