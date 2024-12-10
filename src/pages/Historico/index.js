import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { baseURL } from '../../config/api';
import RNPickerSelect from 'react-native-picker-select';

export default function Historico() {
    const [loading, setLoading] = useState(true);
    const [historico, setHistorico] = useState([]);
    const [datas, setDatas] = useState([]);
    const [selectedData, setSelectedData] = useState('');

    // Fetch datas
    useEffect(() => {
        const fetchDatas = async () => {
            try {
                const response = await axios.get(`${baseURL}/sensores/todas-datas`);
                const dataList = response.data.map(data => ({ label: data, value: data }));
                
                // Adiciona a opção "Todos"
                dataList.unshift({ label: 'Todos', value: 'todos' });
                setDatas(dataList);
                setSelectedData(dataList[0].value); // Predefinindo "Todos" como selecionado
            } catch (error) {
                console.error('Error fetching dates:', error);
            }
        };

        fetchDatas();
    }, []);

    // Fetch historico based on selected date
    useEffect(() => {
        const fetchHistorico = async () => {
            setLoading(true);
            try {
                let response;
                
                // Checa se a opção "Todos" foi selecionada
                if (selectedData === 'todos') {
                    response = await axios.get(`${baseURL}/sensores/todos`);
                } else {
                    response = await axios.get(`${baseURL}/sensores/data/${selectedData}`);
                }

                // Verifica se a resposta é um array
                const dataToSet = Array.isArray(response.data) ? response.data : [response.data];
                const sortedData = dataToSet.sort((a, b) => new Date(b.data) - new Date(a.data));
                setHistorico(sortedData);
            } catch (error) {
                console.error('Error fetching historical data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistorico();// Chama a função sempre que selectedData mudar
    }, [selectedData]);

    const renderItem = ({ item }) => {
        const temperatureColor = item.temperatura < 20 ? 'red' : 'blue';
        const gasColor = item.gas < 30 ? 'orange' : '#2ecc71';

        return (
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Dados de Produção</Text>
                <Text style={styles.textData}>Data: {item.data}</Text>
                <Text style={styles.textData}>Hora: {item.hora}</Text>
                <Text style={[styles.textData, { color: temperatureColor }]}>
                    Temperatura: {item.temperatura} °C
                </Text>
                <Text style={[styles.textData, { color: gasColor }]}>
                    Nível de Gás: {item.gas}%
                </Text>
            </View>
        );
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}>Carregando dados...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Histórico de Produção</Text>
            <RNPickerSelect
                onValueChange={(value) => setSelectedData(value)} // Atualiza selectedData
                items={datas}
                placeholder={{ label: 'Selecione uma data', value: null }}
                style={pickerSelectStyles}
                value={selectedData} // Define o valor atual do seletor
            />
            <FlatList
                data={historico}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                style={styles.flatList}
                showsVerticalScrollIndicator={false}
            />
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
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        color: '#333',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 20,
        color: '#666',
        textAlign: 'center',
        marginTop: 10,
    },
    card: {
        width: '100%',
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        marginBottom: 20,
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    textData: {
        fontSize: 18,
        marginBottom: 5,
    },
    flatList: {
        width: '100%',
    },
});

// Estilos do RNPickerSelect
const pickerSelectStyles = {
    inputIOS: {
        fontSize: 16,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        color: '#000',
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    inputAndroid: {
        fontSize: 16,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        color: '#000',
        marginBottom: 20,
        backgroundColor: '#fff',
    },
};
