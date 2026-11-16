import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Button, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { supabase } from '../supabase';

export default function Ver() {
  const nav = useNavigation();
  const isFocused = useIsFocused();

  const [clientes, setClientes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const buscarClientes = async () => {
    setCarregando(true);
    const { data, error } = await supabase
      .from('clientes')
      .select('*');

    if (error) {
      console.log('Erro ao buscar clientes:', error.message);
    } else {
      setClientes(data);
    }
    setCarregando(false);
  };

  // Função para excluir o cliente pelo ID
  const excluirCliente = async (id) => {
    const { error } = await supabase
      .from('clientes')
      .delete()
      .eq('id', id); // Apaga apenas o registro onde o id é igual ao selecionado

    if (error) {
      Alert.alert('Erro', 'Não foi possível excluir o cliente: ' + error.message);
    } else {
      Alert.alert('Sucesso', 'Cliente excluído com sucesso!');
      buscarClientes(); // Atualiza a lista na tela automaticamente após apagar
    }
  };

  useEffect(() => {
    if (isFocused) {
      buscarClientes();
    }
  }, [isFocused]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ 
          paddingHorizontal: 20, 
          paddingVertical: 10, 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'space-between' 
        }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Clientes</Text>
          <Button 
            title="Novo Cliente" 
            onPress={() => nav.navigate('Cadastro')} 
          />
        </View>

        {carregando ? (
          <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={clientes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={{ 
                padding: 20, 
                borderBottomWidth: 1, 
                borderColor: '#eee',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 18, fontWeight: '500' }}>{item.nome}</Text>
                  <Text style={{ color: '#666' }}>E-mail: {item.email}</Text>
                </View>
                {/* Botão para excluir o item */}
                <Button 
                  title="Excluir" 
                  color="red" 
                  onPress={() => excluirCliente(item.id)} 
                />
              </View>
            )}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}