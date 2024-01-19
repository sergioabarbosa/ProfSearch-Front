import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

import api from '../api';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data);
        console.log(response.data)
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <ScrollView>
      {users.map(user => (
        <Card key={user._id} style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>{user.name}</Title>
            <Paragraph style={styles.email}>Email: {user.email}</Paragraph>
            <Paragraph style={styles.username}>Usuário: {user.username}</Paragraph>
            <Paragraph style={styles.id}>ID: {user._id}</Paragraph>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    borderRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  title: {
    fontSize: 20, // Tamanho da fonte do título
    fontWeight: 'bold', // Negrito
    color: '#333', // Cor do texto
    marginBottom: 8, // Espaçamento inferior
  },
  email: {
    fontSize: 16, // Tamanho da fonte do email
    color: '#666', // Cor do texto
  },
});

export default Users;
