// Gaveta.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Adm from '../Adm';
import Historico from '../Historico';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importando ícones
import Settings from '../Settings';
import Users from '../Users';
import CriarConta from '../CriarConta';
const Drawer = createDrawerNavigator();

function CustomDrawerContent({ user, mail, navigation }) {
    return (
        <View style={styles.drawerContent}>
            {/* Cabeçalho com Imagem de Fundo */}
            <View style={styles.header}>
                <Image
                    source={require('../../assets/user.png')} // Altere para o caminho do seu logotipo
                    style={styles.userLogo}
                />
                <Text style={styles.userName}>{user}</Text>
                <Text style={styles.userEmail}>{mail}</Text>
            </View>

            {/* Itens do Drawer */}
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Admin')}>
                <Icon name="dashboard" size={24} color="#fff" />
                <Text style={styles.menuText}>Estado de produção</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Histórico')}>
                <Icon name="history" size={24} color="#fff" />
                <Text style={styles.menuText}>Histórico</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
                <Icon name="info" size={24} color="#fff" />
                <Text style={styles.menuText}>Sobre</Text>
            </TouchableOpacity>


        </View>
    );
}

export default function TabRoutes({ route }) {
    const { user, mail } = route.params;

    return (
        <NavigationContainer independent={true}>
            <Drawer.Navigator
                drawerContent={props => (
                    <CustomDrawerContent user={user} mail={mail} navigation={props.navigation} />
                )}
                initialRouteName="Admin"
            >
                <Drawer.Screen
                    name="Admin"
                    component={Adm}
                    initialParams={{ user, mail }}
                    options={{ headerTitle: "" }}
                />
                <Drawer.Screen
                    name="Histórico"
                    component={Historico}
                    initialParams={{ user, mail }}
                />
                <Drawer.Screen
                    name="Settings"
                    component={Settings} // Certifique-se de criar esse componente
                    initialParams={{ user, mail }}
                />

            </Drawer.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        backgroundColor: '#2c3e50', // Cor de fundo da gaveta
    },
    header: {
        padding: 20,
        backgroundColor: '#34495e', // Cor de fundo do cabeçalho
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ecf0f1',
    },
    userLogo: {
        width: 100, // Ajuste o tamanho conforme necessário
        height: 100,
        borderRadius: 50, // Para um logotipo circular
        marginBottom: 10,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ecf0f1', // Cor do texto
    },
    userEmail: {
        fontSize: 14,
        color: '#bdc3c7', // Cor do texto
        marginBottom: 15, // Espaço abaixo do email
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#34495e', // Cor da borda inferior
    },
    menuText: {
        color: '#ecf0f1', // Cor do texto do menu
        marginLeft: 10,
        fontSize: 16,
    },
});
