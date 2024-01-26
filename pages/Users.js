import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

import { api } from '../api';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {!loading &&
        users.map((user) => (
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  email: {
    fontSize: 18,
    color: '#666',
  },
  username: {
    fontSize: 18,
    color: '#666',
  },
  id: {
    fontSize: 14,
    color: '#888',
    marginTop: 8,
  },
});

export default Users;
