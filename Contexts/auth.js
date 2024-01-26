import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, createSession, getUsers } from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  getUserFromStorage();
}, []);

  const login = async (username, password) => {
    try {
      const response = await createSession(username, password);
      const newUser = await getUsers(response.data.users);
      const loggedUser = newUser.find((user) => user.username === username);

      if (loggedUser) {
        const token = response.data.access_token;
        localStorage.setItem('user', JSON.stringify(loggedUser));
        localStorage.setItem('token', token);
        console.log('Usuário salvo com sucesso no localStorage');

        api.defaults.headers.Authorization = `Bearer ${token}`;
        setUser(loggedUser);
      } else {
        console.log('Usuário não encontrado');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  const SignUp = async (name, email, usertype, photo, password, confirmPassword) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, usertype, photo, password, confirmPassword })
    };

    try {
      const response = await fetch('http://localhost:3000/register', requestOptions);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Erro ao fazer cadastro:', error);
    }
  };

  const logout = () => {
    console.log('logout');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = null;

    setUser(null);
    // Navegue para a página de login após o logout
    // Por favor, substitua 'login' pelo nome da rota da página de login
    // navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ authenticated: !!user, user, login, logout, loading, SignUp }}>
      {children}
    </AuthContext.Provider>
  );
}
