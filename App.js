import React from 'react';
import { AuthProvider } from './Contexts/auth'; // Importe o AuthProvider do arquivo de contexto
import { StyleSheet, View, Text, Image } from 'react-native';
import Navigation from './Navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Image
            source={require('./assets/profsearch360.png')}
            style={styles.banner}
          />
          <Navigation />
          <Text style={styles.copy}>
            &copy;2024 - PROFSEARCH-BUSCA PROFISSIONAL.
          </Text>
        </View>
      </GestureHandlerRootView>
    </AuthProvider>
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
    height: 150,
    resizeMode: 'contain',
    marginTop: 0,
    marginLeft: 0,
    marginBottom: 0,
  },
  copy: {
    fontSize: 10,
    textAlign: 'center',
    color: '#888',
    marginTop: 10,
    marginBottom: 20,
  },
});
