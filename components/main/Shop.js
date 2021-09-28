import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Mens from './products/Mens'
import Womens from './products/Womens'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const Tab = createMaterialTopTabNavigator();
const Shop = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: 'true'

        }}>
            <Tab.Screen name="Mens" component={Mens} />
            <Tab.Screen name="Womens" component={Womens} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({})

export default Shop;
