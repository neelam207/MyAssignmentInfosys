import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Details from './Details';
import Search from './Search';

const Stack = createNativeStackNavigator();

export default function Nav({ }) {
  return (
    <NavigationContainer>
      <Stack.Navigator    >
        <Stack.Screen name="Home" component={Home} />

        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Search" component={Search} />


      </Stack.Navigator>
    </NavigationContainer>
  )
}