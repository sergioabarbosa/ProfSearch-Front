import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Navigation from './Navigation';

export default function App() {
  return (
    <View style={styles.container}>
      {/* Adicione o banner central e superior */}
      <Image
        source={require('./assets/profsearch360.png')}
        style={styles.banner}
      />

      {/* <View style={styles.header}>
        <Image
          source={require('./assets/Logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Seja Bem-Vindo ao ProfSearch360</Text>
      </View> */}
      <Navigation />
      {/* Adicione um direito autoral */}
      <Text style={styles.copy}>
        &copy;2024 - PROFSEARCH-BUSCA PROFISSIONAL.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignContent: 'center',
  },
  banner: {
    width: '100%',
    height: 150, // Ajuste o tamanho conforme necessário
    resizeMode: 'contain',
    marginTop: 0,
    marginLeft: 0,
    marginBottom: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 20,
  },
  logo: {
    width: 100, // Ajuste o tamanho conforme necessário
    height: 100, // Ajuste o tamanho conforme necessário
    marginRight: 10,
    borderRadius: 50,
  },
  title: {
    paddingLeft: 60,
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#888',
  },
  copy: {
    fontSize: 10,
    textAlign: 'center',
    color: '#888',
    marginTop: 10,
    marginBottom: 20,
  },
});
