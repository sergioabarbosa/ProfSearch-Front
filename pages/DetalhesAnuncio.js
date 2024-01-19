import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import api from '../api';

function DetalhesAnuncio({ route }) {
  const { anuncioId } = route.params;
  const [anuncio, setAnuncio] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetalhesAnuncio = async () => {
      try {
        const response = await api.get(`/anuncios/${anuncioId}`);
        setAnuncio(response.data.data); // Ajuste para acessar o primeiro item do array, se houver
        console.log('Detalhes', response.data.data);
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
      {loading ? (
        <ActivityIndicator size="large" color="#FFA500" />
      ) : (
        <>
          <Text style={styles.title}>{anuncio?.title ?? 'N/A'}</Text>
          {anuncio?.image && (
            <Image
              source={{ uri: anuncio.image }}
              style={{ width: 400, height: 200, marginBottom: 8 }}
            />
          )}
          <Text style={styles.description}>Descrição: {anuncio?.description ?? 'N/A'}</Text>
          <Text style={styles.user}>Publicado por: {anuncio?.user ?? 'N/A'}</Text>
          <Text style={styles.id}>ID: {anuncio?._id ?? 'N/A'}</Text>
          <Text style={styles.createdAt}>Criado em: {anuncio?.createdAt ? formatDate(anuncio.createdAt) : 'N/A'}</Text>
          <Text style={styles.updatedAt}>Editado em: {anuncio?.updatedAt ? formatDate(anuncio.updatedAt) : 'N/A'}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#800080', // Roxo
    marginBottom: 8,
  },
  description: {
    fontSize: 18,
    color: '#FFA500', // Laranja
  },
  user: {
    fontSize: 18,
    color: '#FFA500', // Laranja
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

export default DetalhesAnuncio;
