import { useState } from 'react';
import {
    Alert,
    FlatList,
    Keyboard,
    SafeAreaView,
    StyleSheet, Text,
    TextInput, TouchableOpacity,
    View
} from 'react-native';

/**
 * Aplicativo: Lista de Tarefas Inteligente
 * Objetivo: Ordenar tarefas automaticamente com base em um cálculo de peso.
 */
export default function App() {
  // Estados para capturar as entradas do usuário
  const [tarefa, setTarefa] = useState('');
  const [urgencia, setUrgencia] = useState('');     // Escala 1-5
  const [importancia, setImportancia] = useState(''); // Escala 1-5
  const [listaTarefas, setListaTarefas] = useState([]);

  /**
   * Função que executa o algoritmo de priorização
   */
  const processarNovaTarefa = () => {
    // 1. Validação de dados (Garante que os números e campos estão preenchidos)
    const valUrgencia = parseInt(urgencia);
    const valImportancia = parseInt(importancia);

    if (!tarefa.trim() || isNaN(valUrgencia) || isNaN(valImportancia)) {
      Alert.alert("Erro", "Preencha o nome e use notas de 1 a 5 para os pesos.");
      return;
    }

    // 2. Cálculo do Score (Algoritmo Estruturado)
    // Aplicamos peso 1.5 para Urgência e 1.0 para Importância
    const scoreCalculado = (valUrgencia * 1.5) + valImportancia;

    const novaEntrada = {
      id: Math.random().toString(36).substring(7),
      descricao: tarefa,
      prioridade: scoreCalculado.toFixed(1),
    };

    // 3. Atualização do Estado com Ordenação (Sort)
    // Criamos uma nova lista, adicionamos o item e ordenamos do maior para o menor
    const listaAtualizada = [...listaTarefas, novaEntrada].sort((a, b) => {
      return b.prioridade - a.prioridade;
    });

    setListaTarefas(listaAtualizada);

    // 4. Limpeza de interface
    setTarefa('');
    setUrgencia('');
    setImportancia('');
    Keyboard.dismiss(); // Fecha o teclado
  };

  /**
   * Função para remover tarefa da lista
   */
  const removerTarefa = (id) => {
    setListaTarefas(listaTarefas.filter(item => item.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Gerenciador de Prioridades 💡</Text>

      {/* Formulário de Entrada */}
      <View style={styles.cardInput}>
        <TextInput 
          style={styles.input} 
          placeholder="O que precisa ser feito?" 
          value={tarefa} 
          onChangeText={setTarefa} 
        />
        <View style={styles.row}>
          <TextInput 
            style={[styles.input, { flex: 1, marginRight: 8 }]} 
            placeholder="Urgência (1-5)" 
            keyboardType="numeric"
            value={urgencia}
            onChangeText={setUrgencia}
          />
          <TextInput 
            style={[styles.input, { flex: 1 }]} 
            placeholder="Importância (1-5)" 
            keyboardType="numeric"
            value={importancia}
            onChangeText={setImportancia}
          />
        </View>
        <TouchableOpacity style={styles.botaoAdicionar} onPress={processarNovaTarefa}>
          <Text style={styles.textoBotao}>Calcular e Adicionar</Text>
        </TouchableOpacity>
      </View>

      {/* Listagem de Resultados */}
      <FlatList
        data={listaTarefas}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={[styles.itemLista, index === 0 ? styles.destaque : null]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTexto}>{item.descricao}</Text>
              <Text style={styles.itemSubtexto}>Score de Prioridade: {item.prioridade}</Text>
            </View>
            <TouchableOpacity onPress={() => removerTarefa(item.id)}>
              <Text style={styles.textoRemover}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhuma tarefa pendente.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F2F5', padding: 16 },
  header: { fontSize: 22, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 20, marginTop: 40, textAlign: 'center' },
  cardInput: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, elevation: 4, marginBottom: 20 },
  input: { backgroundColor: '#F9F9F9', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#DDD', marginBottom: 12 },
  row: { flexDirection: 'row', marginBottom: 5 },
  botaoAdicionar: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center' },
  textoBotao: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  itemLista: { 
    backgroundColor: '#FFF', padding: 16, borderRadius: 10, marginBottom: 10, 
    flexDirection: 'row', alignItems: 'center', borderLeftWidth: 5, borderLeftColor: '#CCC' 
  },
  destaque: { borderLeftColor: '#007AFF', backgroundColor: '#EBF5FF' },
  itemTexto: { fontSize: 16, fontWeight: '600', color: '#333' },
  itemSubtexto: { fontSize: 13, color: '#666', marginTop: 4 },
  textoRemover: { color: '#FF3B30', fontWeight: 'bold' },
  vazio: { textAlign: 'center', color: '#999', marginTop: 50 }
});