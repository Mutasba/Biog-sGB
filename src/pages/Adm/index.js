// Adm.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from '@expo/vector-icons/AntDesign';
import Octicons from '@expo/vector-icons/Octicons';
import Users from '../Users';
import Status from "../Status";
import CriarConta from '../CriarConta';

const Tab = createBottomTabNavigator();

export default function Adm({ route }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          borderTop: 0,
          bottom: 14,
          left: 14,
          right: 14,
          elevation: 0,
          borderRadius: 4,
        },
      }}
    >
      <Tab.Screen 
        name="Status" 
        component={Status} 
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="linechart" size={size} color={color} />
          ),
        }} 
      />

    </Tab.Navigator>
  );
}
