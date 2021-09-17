import React from 'react';
import { View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Shop from './main/Shop';
import Wishlist from './main/Wishlist'
import Cart from './main/Cart';
import Profile from './main/Profile'
import Profilescreen from './Profilescreen';

const Tab = createMaterialBottomTabNavigator();
const HomeScreen = () => {
    return (
        <Tab.Navigator initialRouteName="Shop" activeColor="#f0edf6"
            barStyle={{ backgroundColor: '#C6C8CC' }} labeled={true}>
            <Tab.Screen name="Shop" component={Shop}

                options={{
                    tabBarIcon: ({
                        color, size
                    }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),

                }} />
            <Tab.Screen name="Wishlist" component={Wishlist}

                options={{
                    tabBarIcon: ({
                        color, size
                    }) => (
                        <MaterialCommunityIcons name="cards-heart" color={color} size={26} />
                    ),

                }} />
            <Tab.Screen name="Cart" component={Cart}
                options={{
                    tabBarIcon: ({
                        color, size
                    }) => (
                        <MaterialCommunityIcons name="cart" color={color} size={26} />
                    ),

                }} />
            <Tab.Screen name="Profile" component={Profilescreen}
                options={{
                    tabBarIcon: ({
                        color, size
                    }) => (
                        <MaterialCommunityIcons name="account-circle" color={color} size={26} />
                    ),

                }} />

        </Tab.Navigator>
    );
}



export default HomeScreen;
