import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Ver from './fonte/telas/ver';
import Criar from './fonte/telas/Criar';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Tela principal de listagem (sem cabeçalho visível) */}
        <Stack.Screen 
          name="Clientes" 
          component={Ver} 
          options={{ headerShown: false }} 
        />
        
        {/* Tela de cadastro (com cabeçalho personalizado azul) */}
        <Stack.Screen 
          name="Cadastro" 
          component={Criar} 
          options={{ 
            title: 'Cadastrar Cliente', 
            headerStyle: { backgroundColor: '#3355aa' }, 
            headerTintColor: '#fff' 
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}