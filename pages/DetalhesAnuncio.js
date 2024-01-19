// DetalhesAnuncio.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import api from '../api';

function Detalhes({ route }) {
  const { anuncioId } = route.params;
  const [anuncio, setAnuncio] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetalhesAnuncio = async () => {
      try {
        const response = await api.get(`/anuncios/${anuncioId}`);
        setAnuncio(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar detalhes do anúncio:', error);
        setLoading(false);
      }
    };

    fetchDetalhesAnuncio();
  }, [anuncioId]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{anuncio.title}</Text>
      <Text style={styles.description}>Descrição: {anuncio.description ?? 'N/A'}</Text>
      {anuncio.image && (
        <Image
          source={{ uri: anuncio.image }}
          style={{ width: 200, height: 200, marginBottom: 8 }}
        />
      )}
      <Text style={styles.user}>Publicado por: {anuncio.user ?? 'N/A'}</Text>
      <Text style={styles.id}>ID: {anuncio._id}</Text>
      <Text style={styles.createdAt}>Criado em: {formatDate(anuncio.createdAt)}</Text>
      <Text style={styles.updatedAt}>Editado em: {formatDate(anuncio.updatedAt)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 18,
    color: '#666',
  },
  user: {
    fontSize: 18,
    color: '#666',
  },
  id: {
    fontSize: 14,
    color: '#888',
    marginTop: 8,
  },
  createdAt: {
    fontSize: 14,
    color: '#888',
  },
  updatedAt: {
    fontSize: 14,
    color: '#888',
  },
});

export default Detalhes;
