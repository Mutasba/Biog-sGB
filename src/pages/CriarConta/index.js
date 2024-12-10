import { StyleSheet, Text, View, TextInput, TouchableOpacity, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { useState } from 'react';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseURL } from '../../config/api';

export default function CriarConta() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [config, setConfig] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const register = async () => {
        console.log("enteri")
        if (!validateForm()) return;
        console.log("1")
        setIsLoading(true);

        try {
            if (!isValidEmail(email)) {
                setErrors({ email: "E-mail inválido." });
                setIsLoading(false);
                console.log("2")
                return;
            }

            if (config !== password) {
                setErrors({ config: "As senhas não coincidem." });
                setIsLoading(false); 
                 console.log("4")
                return;
              
            }
            console.log("5")
            const response = await axios.post(`${baseURL}/users/register`, { username, email, password });
            await AsyncStorage.setItem('userInfo', JSON.stringify(response.data));
            console.log("~6")
            alert("Conta criada com sucesso!");
            clearFields();
        } catch (error) {
            console.error(`register error: ${error.response ? error.response.data : error}`);
            alert("Este email ou senha já existe ou houve um problema com o servidor.");
        } finally {
            setIsLoading(false);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!email) newErrors.email = "O campo E-mail é obrigatório.";
        if (!password) newErrors.password = "O campo Senha é obrigatório.";
        if (!username) newErrors.username = "O campo Nome é obrigatório.";
        if (!config) newErrors.config = "O campo Confirmação de Senha é obrigatório.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const clearFields = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setConfig('');
        setErrors({});
    };

    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    return (
        <View style={styles.container}>
            <Spinner visible={isLoading} />
            <Animatable.View animation='lightSpeedIn' delay={700} style={styles.containerHeader}>
                <Text style={styles.message}>Criar Conta</Text>
            </Animatable.View>
            <Animatable.View delay={700} animation='fadeInUp' style={styles.containerForm}>
                <Text style={styles.title}>Nome</Text>
                <TextInput
                    placeholder='Digite o seu nome'
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                />
                {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

                <Text style={styles.title}>E-mail</Text>
                <TextInput
                    placeholder='Digite o seu e-mail'
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                <Text style={styles.title}>Senha</Text>
                <TextInput
                    placeholder='Digite a sua senha'
                    style={styles.input}
                    secureTextEntry={!mostrarSenha}
                    value={password}
                    onChangeText={setPassword}
                />
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                <Text style={styles.title}>Confirmar Senha</Text>
                <TextInput
                    placeholder='Confirme a sua senha'
                    style={styles.input}
                    secureTextEntry={true}
                    value={config}
                    onChangeText={setConfig}
                />
                {errors.config && <Text style={styles.errorText}>{errors.config}</Text>}

                <View style={styles.switchContainer}>
                    <Switch
                        value={mostrarSenha}
                        onValueChange={() => setMostrarSenha(!mostrarSenha)}
                    />
                    <Text style={styles.label}>Mostrar Senha</Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={register}>
                    <Text style={styles.buttonText}>Concluir</Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    errorText: {
        marginBottom: 10,
        color: 'red'
    },
    container: {
        flex: 1,
        backgroundColor: '#38a69d'
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
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16
    },
    button: {
        backgroundColor: '#38a69d',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
});
