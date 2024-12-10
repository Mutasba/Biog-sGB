import { StyleSheet, Text, View, TextInput, TouchableOpacity, secureTextEntry, Switch } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable'
import { useState } from 'react'
import React from 'react'
import { baseURL } from '../../config/api'
import axios from 'axios'
import Spinner from 'react-native-loading-spinner-overlay'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function Login() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const login = (email, password) => {


    if (valideteForm()) {
      if (validarEmail(email)) {

        setIsLoading(true);
        axios.post(`${baseURL}/users/login`, {
          email, password
        }).then(res => {



          let userInfo = res.data;
          setUserInfo(userInfo);
          AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
          setIsLoading(false);
          //console.log(userInfo);
          console.log(userInfo.username)

          const name = userInfo.username;


          if (email == 'admin@gmail.com') {
            navigation.navigate('Gaveta', { user: name })
          } else {
            navigation.navigate('TabRoutes',{user:name})
          }
        }).catch(e => {
          console.log(`login error ${e}`);
          setIsLoading(false);
        });
      }
      else {
        let errors = {};
        errors.email = "Email invalido";
        setErrors(errors);
        return Object.keys(errors).length === 0;
      }

    }



  };
  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
 

  const valideteForm = () => {
    let errors = {};
    if (!email) errors.email = "O campo E-mail é obrigatorio ";
    if (!password) errors.password = "O campo senha é obrigatorio ";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (

    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View style={styles.containerLogo}>
        <Animatable.Image
          delay={900}
          animation="fadeInUp"
          source={require('../../assets/user.png')}
          style={{ width: '100%' }}
          resizeMode="contain"


        />
      </View>
      <Animatable.View animation='flipInY' delay={700} style={styles.containerHeader}>

        <Text style={styles.message}>{ }Bem-vindo(a)</Text>
      </Animatable.View>

      <Animatable.View delay={700} animation={'bounceIn'} style={styles.containerForm}>

        <Text style={styles.title}>E-mail</Text>
        <TextInput
          placeholder='Digite  o seu e-mail'
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        {errors.email ? <Text style={styles.errorText}>{errors.email} </Text> : null}

        <Text style={styles.title}>Senha </Text>


        <TextInput
          placeholder='Digite  a sua senha'
          style={styles.input} ewds
          value={password}
          secureTextEntry={!mostrarSenha}
          onChangeText={text => setPassword(text)}
        />
        {errors.password ? <Text style={styles.errorText}>{errors.password} </Text> : null}

        <View style={styles.switchContainer}>
          <Switch
            value={mostrarSenha}
            onValueChange={() => setMostrarSenha(!mostrarSenha)}
          />
          <Text style={styles.label}>Mostrar Senha</Text>
        </View>
        <TouchableOpacity style={styles.button}
          onPress={() => { login(email, password) }}
        >

          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

      </Animatable.View>
    </View>
  )
}

const styles = StyleSheet.create({

  errorText: {
    marginBottom: 10,
    color: 'red'
  },

  containerLogo: {
    flex: 0.6,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center'

  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'

  },

  containerHeader: {
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%'

  },

  message: {
    fontSize: 28,
    fontWeight: "bold",
    color: 'black',
    textAlign: 'center'
  },

  containerForm: {
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%'

  },
  title: {
    fontSize: 14,
    marginTop: 28,

  },

  input: {
    width: "90%",
    borderBottomWidth: 1,
    height: 50,
    marginBottom: 12,
    fontSize: 16,
    alignItems: 'center'
  },

  button: {
    backgroundColor: '#38a69d',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',

  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginLeft: 10,
  },


})
