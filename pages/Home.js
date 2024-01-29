import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from "../Contexts/auth";

const Home = () => {
  const { authenticated, user } = useContext(AuthContext);

  useEffect(() => {
    console.log('Usuário no contexto de autenticação:', user);
    console.log('Usuário autenticado:', authenticated);
  }, [user]);

  return (
    <View style={styles.container}>
      <Text>{String(authenticated)}</Text>
      {user && (
        <Text style={styles.title}>Bem-vindo à Página Inicial: {user.name}</Text>
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
});

export default Home;
