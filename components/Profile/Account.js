import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import firebase from 'firebase'
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
export default function Profile() {
    const [d, setName] = useState("");
    const navigation = useNavigation();
    useEffect(() => {
        const user = firebase.auth().currentUser;
        const displayName = user.displayName;
        setName(displayName);
    }, [])
    const Signout = () => {
        firebase.auth().signOut();
        navigation.navigate('/Login');
        console.log("Pressed")
    }
    return (
        <View style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Welcome {d}</Text>
            <Button title="logout" style={{ color: 'green', width: "50%" }} onPress={() => { Signout() }} >Signout</Button>
        </View>
    )
}
