import React from 'react';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import Users from './pages/Users';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="Users" component={Users} options={{ title: 'Usuários' }} />
        <Stack.Screen name="Sobre" component={About} />
        <Stack.Screen name="Política de Privacidade" component={PrivacyPolicy} />
        {/* Adicione outras telas aqui */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  const handleNavigate = (turma) => {
    navigation.navigate(turma);
  };

  const handleNavigateToAbout = () => {
    navigation.navigate('Sobre');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  }

  const PrivacyPolicyStack = () => (
  navigation.navigate('Política de Privacidade')
);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {['Users'].map((turma, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => handleNavigate(turma)}
        >
          <Text style={styles.buttonText}>{turma}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.button}
        onPress={handleNavigateToAbout}
      >
        <Text style={styles.buttonText}>Sobre</Text>
      </TouchableOpacity>
      <TouchableOpacity
          style={styles.button}
          onPress={PrivacyPolicyStack} // Estava faltando as chaves aqui
        >
          <Text style={styles.buttonText}>Política de Privacidade</Text>
        </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',// cor de fundo
  },
  button: {
    backgroundColor: '#EB3337',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: 200,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});