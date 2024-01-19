import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';

export default function About() {
  return (
  <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SOBRE O APP</Text>
      </View>
      <View style={styles.about}>
        <Text style={styles.aboutText}>
          O aplicativo Agenda Escolar foi desenvolvido para facilitar a
          comunicação entre pais e professores. Através dele, os professores
          poderão enviar atividades e avisos para os pais, que poderão
          visualizar e confirmar o recebimento das atividades.
        </Text>
        <Text style={styles.aboutText}>
          Versão do APP: 1.0.0
        </Text>
        <Text style={styles.aboutText}>
          Desenvolvido por: Sérgio Alves Barbosa. Analista de Sistemas e Programador.
          Cilas Miguel Colaço Bezerra, estudante de Análise e Desenvolvimento de Sistemas e programador.
          Para suporte e contato por Whatsapp: (85)999924744
        </Text>
      </View>
      {/* add a copirygth */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingTop: 30, // Adicionando paddingTop para afastar o texto da parte superior
    paddingBottom: 60, // Adicionando paddingBottom para afastar o texto da parte inferior
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 70,
    height: 70,
    marginTop: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  about: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  aboutText: {
    fontSize: 16,
    marginBottom: 20,
    padding: 5,
    justifyContent: 'center',
    textAlign: 'justify',
    marginTop: 10, // Adicionando marginTop para afastar o texto da parte inferior
    marginBottom: 10, // Adicionando marginBottom para afastar o texto da parte inferior
  },
});
