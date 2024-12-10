import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, RefreshControl, TouchableOpacity, Button } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { baseURL } from '../../config/api';


export default function Users() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${baseURL}/users/todos-usuarios`);
      
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }


  };
  useEffect(() => {
    fetchUsers();
  }, []);


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  const onRefresh = () => {
    setRefreshing(true);
    fetchUsers()
  };
  return (
    <View style={styles.container}>
    
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        
        renderItem={({ item }) => (
          <TouchableOpacity >
          <View style={styles.item}>
            <Text style={styles.name}>{item.username}</Text>
            <Text style={styles.email}>{item.email}</Text>
          </View>
          </TouchableOpacity>

        )}


        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }
      />
      

      <View style={styles.buttonContainer}>
      
            <Button title="Adicionar Usuário" onPress={()=>navigation.navigate('CriarConta')} />
         
      </View>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
  buttonContainer: {
    margin:'auto',
    bottom: 100,
    left: 0,
    right: 14,
    backgroundColor: '#fff',
    padding: 10,
  },
});


