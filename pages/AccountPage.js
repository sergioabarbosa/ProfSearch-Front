import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Button, Avatar } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import axios from 'axios';
import { api} from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from '../Contexts/auth'; // Importação do contexto de autenticação

export default function AccountPage({navigation}) {
  const [image, setImage] = useState(null);
  const { logout, authenticated, user } = useContext(AuthContext); // Acesso à função de logout do contexto de autenticação

  useEffect(() => {
    // recuperando o usuário do AsyncStorage
    AsyncStorage.getItem('user');
    console.log('Usuário no contexto de autenticação:', user);
    // Solicitar permissão ao carregar o componente
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Desculpe, precisamos das permissões de câmera para fazer isso funcionar!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      // Acesse o array "assets" em vez de "uri"
      setImage(result.assets && result.assets.length > 0 ? result.assets[0].uri : null);
    }
  };

  const handleUploadImage = async () => {
  if (!image) {
    console.log('Nenhuma imagem selecionada.');
    return;
  }

  try {
    const userId = user ? user._id : null; // Obtém o ID do usuário do estado local ou do contexto de autenticação
    console.log('ID do usuário:', userId);
    const formData = new FormData();
    formData.append('image', {
      uri: image,
      type: 'image/jpeg',
      name: 'image',
    });
    formData.append('userId', userId); // Adiciona o ID do usuário ao FormData

    const response = await api.post(`/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
      },
    });

    if (response.status === 200 || response.status === 201) {
      console.log('Imagem enviada com sucesso para o servidor!');
    } else {
      console.error('Erro ao enviar a imagem para o servidor:', response.status);
    }

  } catch (error) {
    console.error('Erro ao enviar a imagem para o servidor:', error.message);
  }
};

  const handleLogout = () => {
      logout();
      navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <Avatar.Image size={100} source={image ? { uri: image } : require('../assets/icon.png')} />
        <Text style={styles.userName}>Nome do Usuário: {user ? user.username : 'Não autenticado'}</Text>
        <Text style={styles.email}>Endereço de E-mail</Text>
      </View>
      <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
        <Text style={styles.buttonText}>Escolher uma imagem da galeria</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.selectedImage} />}
      <View style={styles.buttonContainer}>
        <Button icon="upload" mode="contained" onPress={handleUploadImage}>
          Enviar Imagem
        </Button>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        {authenticated ?<Text style={styles.buttonText}>Logout</Text> : <Text style={styles.buttonText}>Login</Text> }
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
  },
  imagePickerButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  selectedImage: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  logoutButton: {
    backgroundColor: '#c0392b',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
});
