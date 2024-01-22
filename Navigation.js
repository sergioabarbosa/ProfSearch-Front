import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Users from './pages/Users';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Anuncios from './pages/Anuncios';
import Detalhes from './pages/DetalhesAnuncio';

const Tab = createBottomTabNavigator();
const AnunciosStack = createStackNavigator();

const AnunciosStackScreen = () => (
  <AnunciosStack.Navigator>
    <AnunciosStack.Screen name="Anuncios" component={Anuncios} />
    <AnunciosStack.Screen name="Detalhes" component={Detalhes} />
  </AnunciosStack.Navigator>
);

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptionsOptions={{
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
        <Tab.Screen
          name="Users"
          component={Users}
          options={{
            tabBarLabel: 'Usuários',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-circle-outline" size={size} color={color} />
            ),
          }} // <ion-icon name="hand-right-outline"></ion-icon>
        />
        <Tab.Screen
          name="Anuncios"
          component={AnunciosStackScreen}
          options={{
            tabBarLabel: 'Anúncios',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="pricetag-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Sobre"
          component={About}
          options={{
            tabBarLabel: 'Sobre',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="information-circle-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Política de Privacidade"
          component={PrivacyPolicy}
          options={{
            tabBarLabel: 'Privacidade',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="hand-right-outline" size={size} color={color} />
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
