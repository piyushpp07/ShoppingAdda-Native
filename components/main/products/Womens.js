import { createStackNavigator } from '@react-navigation/stack';
import WomensProducts from './WomensItems/WomensProducts'
import Details from './WomensItems/Details'
import React from 'react';
const Stack = createStackNavigator();
const Womens = () => {
    return (

        <Stack.Navigator initialRouteName="WomensProducts"  >
            <Stack.Screen name="Womens" component={WomensProducts} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Details" component={Details} options={{
                headerShown: false
            }} />
        </Stack.Navigator>


    );
}
export default Womens;
