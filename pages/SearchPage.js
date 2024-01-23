import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Image } from 'react-native';
import api from '../api';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
  try {
    const response = await api.get(`/anuncios/search?q=${searchQuery}`);
    const data = response.data;

    // Verifique se há dados e se é um array
    const anunciosRecuperados = data.data;
    if (anunciosRecuperados && Array.isArray(anunciosRecuperados)) {
      // Extrai apenas os dados do documento _doc
      const anunciosData = anunciosRecuperados.map((anuncio) => anuncio._doc);
      console.log('Anúncios recuperados:', anunciosData);

      // Atualiza o estado com os dados filtrados
      setSearchResults(anunciosData);
    }
  } catch (error) {
    console.error('Erro ao buscar anúncios:', error.message);
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Página de Busca</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua busca"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <Button title="Buscar" onPress={handleSearch} />

      <FlatList
        data={searchResults}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>{item.title}</Text>
            <Text style={styles.resultDescription}>{item.description}</Text>
            {item.image && <Image source={{ uri: item.image }} style={styles.resultImage} />}
            {/* Adicione outros detalhes do anúncio conforme necessário */}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  resultContainer: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  resultDescription: {
    fontSize: 16,
    marginBottom: 5,
  },
  resultImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 5,
  },
});

export default SearchPage;
