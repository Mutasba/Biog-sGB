
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable'
import {useNavigation} from '@react-navigation/native'
import React from 'react'
import { useState } from 'react'
export default function Welcome() {
  const navigation = useNavigation();
  const[nome,setNome]=useState("ba")
  function chamar(){
    console.log(nome);
    setNome("julho")
  }
  return (
    <View style={styles.container}>
  
      <View style={styles.containerLogo}>
        <Animatable.Image
          animation="bounceIn"
          source={require('../../assets/Imagem WhatsApp 2024-08-13 às 09.32.04_6b7a70ee.jpg')}
          style={{ width: '100%' }}
          resizeMode="contain"
        />
      </View>

      <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Energia limpa para  sua cozinha</Text>
        <Text style={styles.text}></Text>

        <TouchableOpacity
         onPress={()=>navigation.navigate('login')}
      
          style={styles.button}>
          <Text style={styles.buttonText}>Começar</Text>
        </TouchableOpacity>

      </Animatable.View>
      
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0F23',
  },

  containerLogo: {
    flex: 2,
    //backgroundColor: 'red',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems:'center'


  },
  containerForm: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%'
    
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 12,
    textAlign:'center',

  },

  text: {
    color: '#a1a1a1'
  },

  button: {
    position: 'absolute',
    backgroundColor: '#38a69d',
    borderRadius: 50,
    paddingVertical: 8,
    width: '60%',
    alignSelf: 'center',
    bottom: '15%',
    alignItems: 'center',
    justifyContent:'center',

  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight:'bold'
  }



})