import React, { useState } from 'react';
import { Text, Button, StyleSheet, TextInput, Alert } from 'react-native';
import { supabase } from '../supabase';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function Criar() {
  const nav = useNavigation();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  async function salvar() {
    if (!nome || !email) {
      Alert.alert('Erro', 'Por favor, preencha nome e e-mail.');
      return;
    }

    const { error } = await supabase
      .from('clientes')
      .insert([{ nome: nome, email: email }]);

    if (!error) {
      setNome('');
      setEmail('');
      nav.goBack(); // Volta para a tela anterior
    } else {
      Alert.alert('Erro ao salvar: ' + error.message);
    }
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView style={styles.body}>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>E-mail:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o e-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Button title="Cadastrar" onPress={salvar} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  body: { flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', width: '80%', padding: 12, marginBottom: 15, borderRadius: 5 },
  label: { textAlign: 'left', width: '80%', paddingBottom: 3 }
});