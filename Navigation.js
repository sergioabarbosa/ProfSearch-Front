import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Users from './pages/Users';
import About from './pages/About';
import Anuncios from './pages/Anuncios';
import Detalhes from './pages/DetalhesAnuncio';
import Account from './pages/AccountPage';
import Home from './pages/Home';
import Buscar from './pages/SearchPage';
import CreateAds from './pages/CreateAds';
import LoginPage from './pages/LoginPage';
import { AuthContext } from './Contexts/auth'; // Importação do contexto de autenticação

const Tab = createBottomTabNavigator();
const AnunciosStack = createStackNavigator();
const Stack = createStackNavigator(); // Modificado para Stack
const LoginStack = createStackNavigator(); // Novo StackNavigator para Login

const AnunciosStackScreen = () => (
  <AnunciosStack.Navigator>
    <AnunciosStack.Screen name="Anuncios" component={Anuncios} />
    <AnunciosStack.Screen name="Detalhes" component={Detalhes} />
  </AnunciosStack.Navigator>
);

const LoginStackScreen = () => (
  <LoginStack.Navigator>
    <LoginStack.Screen name="LoginPage" component={LoginPage} />
    {/* Você pode adicionar outras telas de login aqui, se necessário */}
  </LoginStack.Navigator>
);

export default function Navigation() {
  const { authenticated } = useContext(AuthContext); // Certifique-se de importar o AuthContext

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={authenticated ? "Home" : "Login"} // Define a tela inicial com base na autenticação
        screenOptions={{
          activeTintColor: '#EB3337',
          inactiveTintColor: '#888',
          labelStyle: {
            fontSize: 14,
          },
          style: {
            backgroundColor: '#f0f0f0',
            height: 60, // Altura da barra de navegação inferior
          },
        }}
      >
        {!authenticated && ( // Se não estiver autenticado, exibe a tela de login
          <Tab.Screen
            name="Login"
            component={LoginStackScreen}
            options={{
              tabBarLabel: 'Login',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="log-in-outline" size={size} color={color} />
              ),
            }}
          />
        )}
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Anúcios"
          component={AnunciosStackScreen}
          options={{
            tabBarLabel: 'Anúncios',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="briefcase-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Buscar"
          component={Buscar}
          options={{
            tabBarLabel: 'Buscar',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Anunciar"
          component={CreateAds}
          options={{
            tabBarLabel: 'Anunciar',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Conta"
          component={Account}
          options={{
            tabBarLabel: 'Conta',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="menu-outline" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // cor de fundo
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
