import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import firebase from 'firebase'
import Login from '../auth/Login';
import { Button } from 'react-native-paper';
import { NavigationContainer, useLinkTo } from '@react-navigation/native';
export default function Profile({ navigation }) {
    const [d, setName] = useState("");
    useEffect(() => {
        const user = firebase.auth().currentUser;
        const displayName = user.displayName;
        setName(displayName);
    }, [])
    const getUserName = () => {

    }
    const Signout = () => {
        firebase.auth().signOut();
        navigation.navigate('/Login');
        console.log("Pressed")
    }


    return (
        <View style={{ flex: 1, marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Welcome {d} How You Doin!</Text>
            <Button title="logout" style={{ color: 'green', width: "50%" }} onClick={() => { Signout() }} >Signout</Button>
        </View>
    )
}
