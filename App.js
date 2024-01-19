import React from 'react';
import { StyleSheet, View, Button, Text, Image } from 'react-native';
import Navigation from './Navigation';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          // source={require('./assets/images/nova_logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Anúncios</Text>
      </View>
      <Navigation />
      {/* add a copirygth */}
      <Text style={ styles.copy }>
        &copy;2024 - COLÉGIO ALTERNATIVO COLAÇO.
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 55,
    marginLeft: 20,
  },
  logo: {
    width: 50, // Ajuste o tamanho conforme necessário
    height: 50, // Ajuste o tamanho conforme necessário
    marginRight: 10,
  },
  title: {
    paddingLeft: 60,
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  copy: {
    fontSize: 10,
    textAlign: 'center',
    color: '#888',
    marginTop: 10,
    marginBottom: 20,
  },

});