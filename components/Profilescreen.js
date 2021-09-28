import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Account from './Profile/Account';
import MyOrder from './Profile/MyOrder';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
const Profilescreen = () => {
    return (
        <Tab.Navigator >
            <Tab.Screen name="Account" component={Account} />
            <Tab.Screen name="My Orders" component={MyOrder} />
        </Tab.Navigator>
    );
}


export default Profilescreen;
