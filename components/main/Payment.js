import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Cart from './Cart';
import Pay from './Pay'

const Stack = createStackNavigator();
const Payment = () => {
   return (
      <Stack.Navigator initialRouteName="Bucket" screenOptions={{ headerShown: false }}>
         <Stack.Screen name="Bucket" component={Cart} />
         <Stack.Screen name="Pay" component={Pay} />
      </Stack.Navigator>
   );
}

const styles = StyleSheet.create({})

export default Payment;
