import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios'; // Importe a biblioteca Axios

import { api } from '../api';
import { ScrollView } from 'react-native-gesture-handler';
import { AuthContext } from '../Contexts/auth';

const CreateAds = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const { user, authenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!authenticated) {
      navigation.navigate('Login');
    }
  }
  , [authenticated]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Use Axios para fazer a requisição e obter as categorias
        const response = await api.get('/categories');
        console.log('Categorias do backend:', response.data.data);
        setCategories(response.data.data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error.message);
      }
    };
    // Chame a função assíncrona
    fetchCategories();
  }, []);


  const handleCreateAd = async () => {
    const adData = {
      title,
      description,
      user: user._id,
      image,
      category: selectedCategory,
    };

    try {
      // Use Axios para enviar os dados do anúncio para o backend
      const response = await api.post(`/anuncios`, adData);
      alert('Anúncio Criado com sucesso!')
      console.log('Anúncio criado com sucesso:', response.data);
      // Implemente a navegação para a página de detalhes do anúncio ou outra ação desejada
    } catch (error) {
      console.error('Erro ao criar anúncio:', error.message);
      // Trate o erro conforme necessário
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Título do Anúncio:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={text => setTitle(text)}
      />

      <Text style={styles.label}>Descrição do Anúncio:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={text => setDescription(text)}
      />

      <Text style={styles.label}>URL da Imagem:</Text>
      <TextInput
        style={styles.input}
        value={image}
        onChangeText={text => setImage(text)}
      />

      {/* Adicione um campo de seleção para a categoria */}
      <Text style={styles.label}>Categoria do Anúncio:</Text>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Selecione uma categoria" value="" />
        {categories && categories.map(category => (
          <Picker.Item key={category._id} label={category.name} value={category._id} />
        ))}
      </Picker>

      <Button title="Criar Anúncio" onPress={handleCreateAd} style={styles.button} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  button: {
    marginTop: 16,
  },
});

export default CreateAds;
