import React, { useState, useContext, useRef } from "react";
import { AuthContext } from "../Contexts/auth";
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

const LoginPage = () => {
  const { authenticated, login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigation();

  // Definindo a referência para o campo de senha
  let passwordInputRef = useRef(null);

  const handleSubmit = async () => {
    setLoading(true);
    await login(username, password);
    setLoading(false);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000); // 3000 milliseconds = 3 seconds
  };

  const handleRegister = () => {
    navigate.navigate('/register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login do Sistema</Text>
      <Text>{String(authenticated)}</Text>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => passwordInputRef.current.focus()} // Focar no campo de senha ao pressionar "Next"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            returnKeyType="go"
            ref={passwordInputRef} // Definindo a referência para o campo de senha
            onSubmitEditing={handleSubmit}
          />
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Esqueci minha senha</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading && <ActivityIndicator size="large" color="#3498db" />}
      {showMessage && <Text style={styles.successMessage}>Logado com sucesso!</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20, // Adiciona espaçamento horizontal
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    width: '100%', // Ocupa toda a largura
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
  actions: {
    marginTop: 20,
    width: '100%', // Ocupa toda a largura
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successMessage: {
    marginTop: 10,
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginPage;
