import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from "../Contexts/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const [user, setUser] = useState({});

  const { authenticated } = useContext(AuthContext);


  useEffect(() => {
  const getUserFromStorage = async () => {
    try {
      // Verifica se estamos em um ambiente React Native
      if (typeof localStorage === 'undefined') {
        const recoveredUser = await AsyncStorage.getItem("user");
        if (recoveredUser) {
          setUser(JSON.parse(recoveredUser));
          console.log('Usuário recuperado com sucesso do AsyncStorage');
        } else {
          console.log('Nenhum usuário recuperado do AsyncStorage');
        }
      } else {
        // Usuário está em um navegador, usando localStorage
        const recoveredUser = localStorage.getItem("user");
        if (recoveredUser) {
          setUser(JSON.parse(recoveredUser));
          console.log('Usuário recuperado com sucesso do localStorage');
        } else {
          console.log('Nenhum usuário recuperado do localStorage');
        }
      }
    } catch (error) {
      console.error('Erro ao recuperar usuário:', error);
    }
  };

  getUserFromStorage();
}, []);    

  return (
    <View style={styles.container}>
      <Text>{String(authenticated)}</Text>
      <Text style={styles.title}>Bem-vindo à Página Inicial: {user.name}</Text>
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
