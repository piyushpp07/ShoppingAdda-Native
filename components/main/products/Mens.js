import { createStackNavigator } from '@react-navigation/stack';

import MensProducts from './MensItems/MensProducts'
import Details from './MensItems/Details'
import React from 'react';
const Stack = createStackNavigator();
const Mens = () => {
    return (

        <Stack.Navigator initialRouteName="MensProducts"  >
            <Stack.Screen name="MensProducts" component={MensProducts} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Details" component={Details} options={{
                headerShown: false
            }} />
        </Stack.Navigator>


    );
}
export default Mens;
