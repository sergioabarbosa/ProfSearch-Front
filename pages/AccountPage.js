import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Colors } from 'react-native-paper';

const AccountPage = () => {
  return (
    <View style={styles.container}>
      <Card>
        <Card.Cover source={{ uri: 'https://placekitten.com/400/200' }} />
        <Card.Content>
          <Avatar.Image size={80} source={{ uri: 'https://placekitten.com/80/80' }} />
          <Title>Nome do Usuário</Title>
          <Paragraph>Endereço de E-mail</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button icon="account-edit" onPress={() => console.log('Editar perfil')}>
            Editar Perfil
          </Button>
          <Button icon="logout" rippleColor="#FF000020" onPress={() => console.log('Logout')}>
            Sair
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default AccountPage;
