import { StatusBar, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import axios from 'axios';
import { baseURL } from '../../config/api';

const { width } = Dimensions.get('window'); // Captura a largura da tela para responsividade

export default function Status() {
    const [temperature, setTemperature] = useState(0);
    const [gasLevel, setGasLevel] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDatas = async () => {
            try {
                const response = await axios.get(`${baseURL}/sensores/todos`);
                const latestData = response.data[response.data.length - 1];
                if (latestData) {
                    setGasLevel(latestData.gas || 0);
                    setTemperature(latestData.temperatura || 0);
                }
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
                setLoading(true);
            }
        };

        fetchDatas();
        const intervalId = setInterval(fetchDatas, 5000); 
        return () => clearInterval(intervalId);
    }, []);

    if (loading) {
        return <Text style={styles.loadingText}>Loading...</Text>;
    }

    const temperatureColor = temperature < 20 ? 'red' : '#2ecc71';
    const gasColor = gasLevel < 30 ? 'orange' : '#2ecc71';

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Estado de Produção</Text>

            <View style={[styles.card, { width: width * 0.9 }]}>
                <Text style={styles.cardTitle}>Dados de Gás</Text>
                <CircularProgress
                    radius={width * 0.3}
                    value={parseFloat(gasLevel).toFixed(2)}
                    textColor='#222'
                    fontSize={20}
                    valueSuffix={' m³'}
                    inActiveStrokeColor={gasColor}
                    inActiveStrokeOpacity={0.2}
                    inActiveStrokeWidth={6}
                    Duration={3000}
                />
            </View>

            <View style={[styles.card, { width: width * 0.9 }]}>
                <Text style={styles.cardTitle}>Nível de Temperatura</Text>
                <CircularProgress
                    radius={width * 0.3}
                    value={parseFloat(temperature).toFixed(2)}
                    textColor='#222'
                    fontSize={20}
                    valueSuffix={'°C'}
                    inActiveStrokeColor={temperatureColor}
                    inActiveStrokeOpacity={0.2}
                    inActiveStrokeWidth={6}
                    duration={3000}
                />
            </View>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: width * 0.06,
        fontWeight: 'bold',
        marginVertical: 20,
        color: 'black',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    loadingText: {
        fontSize: width * 0.05,
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
    },
});
