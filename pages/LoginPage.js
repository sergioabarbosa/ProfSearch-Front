import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Colors } from 'react-native-paper';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implemente a lógica de autenticação aqui
    console.log('Username:', username);
    console.log('Password:', password);
    // ...
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao App</Text>
      <TextInput
        label="Nome de usuário"
        value={username}
        onChangeText={(text) => setUsername(text)}
        style={styles.input}
      />
      <TextInput
        label="Senha"
        value={password}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Entrar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: Colors.lightBlue100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 8,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 16,
    backgroundColor: Colors.blue500,
  },
});

export default LoginPage;
