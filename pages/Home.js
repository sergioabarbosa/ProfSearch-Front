import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from "../Contexts/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const { authenticated, user } = useContext(AuthContext);

  useEffect(() => {
    AsyncStorage.getItem('user');
    console.log('Usuário no contexto de autenticação:', user);
    console.log('Usuário autenticado:', authenticated);
  }, [user]);

  return (
    <View style={styles.container}>
      <Text>{String(authenticated)}</Text>
      {user && (
        <Text style={styles.welcome}>Bem-vindo à Página Inicial: {user.name}</Text>
      )}
      <Text style={styles.description}>
        Esta é a página inicial do seu aplicativo React Native.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // cor de fundo
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
  welcome: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
});

export default Home;
