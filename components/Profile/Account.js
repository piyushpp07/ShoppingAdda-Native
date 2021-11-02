import React, { useEffect, useState, useContext } from 'react'
import { View, Text } from 'react-native'
import firebase from 'firebase'
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-paper';
import { StateContext } from '../Context/StateProvider';
export default function Profile() {
    const [d, setName] = useState("");
    const { carttotal, ot, wishtotal } = useContext(StateContext);
    const [orderTotal] = ot;
    const [cartTotal] = carttotal;
    const [wishTotal] = wishtotal;
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
            <View style={{
                elevation: 10, width: '80%', height: 500, backgroundColor: 'white', alignItems: 'center', padding: 50
            }}>
                < Avatar.Image size={200} source={{ uri: 'data:image/jpeg;base64,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' }} />
                <Text style={{ fontSize: 30, fontWeight: 'bold', top: 5 }}>Hello! {d}</Text>
                <Text style={{ fontSize: 15, fontWeight: 'bold', top: 5 }}>Your Orders :Rs{orderTotal}</Text>
                <Text style={{ fontSize: 15, fontWeight: 'bold', top: 5 }}>Your Cart Total :Rs{cartTotal}</Text>
                <Text style={{ fontSize: 15, fontWeight: 'bold', top: 5 }}>Your Wish Total :Rs{wishTotal}</Text>
                <Button title="logout" mode='contained' style={{ color: 'green', width: "70%", top: 20 }} onPress={() => { Signout() }} >Signout</Button>
            </View>
        </View >
    )
}
