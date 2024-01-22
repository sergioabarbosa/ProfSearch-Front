import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import api from '../api';

function Anuncios() {
  const [anuncios, setAnuncios] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await api.get('/anuncios');
        const anunciosArray = response.data && response.data.data ? response.data.data : [];
        setAnuncios(anunciosArray);
        console.log(response.data);
        console.log(anunciosArray);
      } catch (error) {
        console.error('Erro ao buscar anúncios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  const navigateToDetalhes = (anuncioId) => {
    navigation.navigate('Detalhes', { anuncioId });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {!loading &&
        anuncios.map((anuncio) => (
          <TouchableOpacity
            key={anuncio._id}
            onPress={() => navigateToDetalhes(anuncio._id)}
          >
            <Card style={styles.card}>
              <Card.Content>
                <Title style={styles.title}>{anuncio.title}</Title>
                {anuncio.image && (
                  <Image
                    source={{ uri: anuncio.image }}
                    style={{ width: '100%', height: 200, marginBottom: 8, maxHeight: 200 }}
                  />
                )}
                <Paragraph style={styles.description}>Descrição: {anuncio.description ?? 'N/A'}</Paragraph>
                <Paragraph style={styles.username}>Publicado por: {anuncio.user ?? 'N/A'}</Paragraph>
                <Paragraph style={styles.id}>ID: {anuncio._id}</Paragraph>
                <Paragraph style={styles.id}>Criado em: {formatDate(anuncio.createdAt)}</Paragraph>
                <Paragraph style={styles.id}>Editado em: {formatDate(anuncio.updatedAt)}</Paragraph>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    marginVertical: 8,
    borderRadius: 16,
    elevation: 4,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    marginLeft: 20,
  },
  email: {
    fontSize: 18,
    color: '#666',
  },
  description: {
    fontSize: 18,
    color: '#666',
    marginLeft: 20,
  },

  username: {
    fontSize: 18,
    color: '#666',
    marginLeft: 20,
  },
  id: {
    fontSize: 14,
    color: '#888',
    marginTop: 8,
    marginLeft: 20,
  },
});

export default Anuncios;
