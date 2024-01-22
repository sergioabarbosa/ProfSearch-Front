import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import api from '../api';

function Anuncios() {
  const [users, setUsers] = useState({});
  const [anuncios, setAnuncios] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await api.get('/users');
        const anunciosResponse = await api.get('/anuncios');

        const usersData = usersResponse.data;
        const anunciosData = anunciosResponse.data && anunciosResponse.data.data
          ? anunciosResponse.data.data
          : [];

        setUsers(usersData.reduce((acc, user) => {
          acc[user._id] = user;
          return acc;
        }, {}));

        setAnuncios(anunciosData);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
        anuncios.map((anuncio) => {
          const user = users[anuncio.user] || {};
          return (
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
                      style={{ 
                        width: '100%',
                        height: 200, 
                        marginBottom: 8, 
                        maxHeight: 200 
                      }}
                    />
                  )}
                  <Paragraph style={styles.description}>Descrição: {anuncio.description ?? 'N/A'}</Paragraph>
                  <Paragraph style={styles.id}>Criado em: {formatDate(anuncio.createdAt)}</Paragraph>
                  <Paragraph style={styles.id}>Editado em: {formatDate(anuncio.updatedAt)}</Paragraph>
                  <Paragraph style={styles.id}>ID: {anuncio._id}</Paragraph>
                  <Paragraph style={styles.username}>Publicado por: {user.username ?? 'N/A'}</Paragraph>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          );
        })}
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
