// Sobre.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Sobre() {
  const navigation = useNavigation();
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sobre o Aplicativo</Text>
      </View>

 

      <View style={styles.aboutContainer}>
        <Text style={styles.text}>
          Este aplicativo é uma plataforma de exemplo que permite gerenciar informações
          de usuários e outras funcionalidades. Ele é construído utilizando React Native
          e aproveita a navegação de forma intuitiva.
        </Text>
        <Text style={styles.text}>
          O Lorem Ipsum é simplesmente um texto fictício da indústria tipográfica e de
          impressão. O texto padrão da indústria é reproduzido abaixo para aqueles
          interessados.
        </Text>
        <Text style={styles.text}>
          Você pode encontrar mais informações sobre a construção deste aplicativo
          na documentação oficial do React Native ou no GitHub do projeto.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
    padding: 20,
  },
  header: {
    backgroundColor: '#009688',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 20,
    width: '100%',
  },
  aboutContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
    lineHeight: 24,
    color: '#333333',
  },
});
