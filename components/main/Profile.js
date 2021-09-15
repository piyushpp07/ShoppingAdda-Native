import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import firebase from 'firebase'
import Login from '../auth/Login';
import { Button } from 'react-native-paper';
import { useLinkTo } from '@react-navigation/native';
export default function Profile({ props }) {
    const [user, setUser] = useState('');
    const [docs, setDocs] = useState([]);
    const getDataFromFirebase = [];
    const linkTo = useLinkTo();
    useEffect(() => {
        const name = firebase.auth().onAuthStateChanged()

    }, [])
    const getUserName = () => {

    }
    const Signout = () => {
        firebase.auth().signOut();
    }


    return (
        <View style={{ flex: 1, marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Welcome </Text>
            <Button title="logout" style={{ color: 'yellow', width: "50%" }} onClick={() => { Signout() }} >Signout</Button>
        </View>
    )
}
