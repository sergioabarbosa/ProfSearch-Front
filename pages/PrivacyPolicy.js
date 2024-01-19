import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function PrivacyPolicy() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Política de Privacidade</Text>
      <View style={styles.content}>
        <Text>
          Bem-vindo à Política de Privacidade do nosso aplicativo. Esta página informa sobre nossas políticas
          relativas à coleta, uso e divulgação de informações pessoais quando você usa nosso serviço.
        </Text>
        <Text>
          Ao utilizar o nosso serviço, você concorda com a coleta e uso das informações de acordo com esta política.
        </Text>
        <Text style={styles.subHeader}>Coleta e Uso de Informações</Text>
        <Text>
          Para uma melhor experiência ao usar nosso serviço, podemos solicitar que você nos forneça certas informações
          pessoais identificáveis, incluindo, mas não se limitando a, nome, endereço, número de telefone e informações de pagamento.
        </Text>
        {/* Adicione mais detalhes sobre a coleta e uso de informações conforme necessário */}
        <Text style={styles.subHeader}>Cookies</Text>
        <Text>
          Cookies são arquivos com uma pequena quantidade de dados que são comumente usados como identificadores
          exclusivos anônimos. Eles são enviados para o seu navegador a partir dos sites que você visita e são armazenados
          no armazenamento interno do seu dispositivo.
        </Text>
        {/* Adicione mais detalhes sobre o uso de cookies conforme necessário */}
        <Text style={styles.subHeader}>Segurança</Text>
        <Text>
          Valorizamos a sua confiança ao nos fornecer suas informações pessoais. Portanto, estamos empenhados em
          usar meios comercialmente aceitáveis para proteger as informações pessoais que você nos envia.
        </Text>
        {/* Adicione mais detalhes sobre medidas de segurança conforme necessário */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignContent: 'center',
    textAlign: 'justify',  // Adicionado para justificar o texto
    
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  content: {
    flex: 1,
  },
});
