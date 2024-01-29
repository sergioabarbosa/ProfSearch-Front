import React, { createContext, useState, useEffect } from "react";
import { api, createSession } from "../api";
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserFromStorage = async () => {
      try {
        const recoveredUser = await AsyncStorage.getItem("user");
        if (recoveredUser) {
          setUser(JSON.parse(recoveredUser));
          console.log(recoveredUser);
          console.log('Usuário recuperado com sucesso do AsyncStorage');
        } else {
          console.log('Nenhum usuário recuperado do AsyncStorage');
        }
      } catch (error) {
        console.error('Erro ao recuperar usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    getUserFromStorage();
  }, []);

  const login = async (username, password) => {
  try {
    // Chamar a API para autenticar o usuário
    const response = await createSession(username, password);
    console.log("response", response);

    // Verificar se a resposta foi bem-sucedida (status 200)
    if (response.status === 200 && response.data) {
      // Extrair os dados do usuário e o token de acesso da resposta
      const { access_token } = response.data;
      const user = response.data["Usuário logado com sucesso!"];

      // Definir o usuário no estado local ou no contexto de autenticação
      setUser(user);

      // Definir o token de acesso nos cabeçalhos da API
      api.defaults.headers.Authorization = `Bearer ${access_token}`;

      // Armazenar o usuário e o token de acesso no AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(user));
      await AsyncStorage.setItem('token', access_token);
      console.log('Usuário logado com sucesso:', user);
      console.log('Token de acesso armazenado com sucesso:', access_token);
    } else {
      console.error('Falha ao fazer login: Resposta inválida da API');
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
  }
};



  const logout = async () => {
    console.log('logout');
    await AsyncStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ authenticated: !!user, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
