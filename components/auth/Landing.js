import React from 'react'
import { View, ImageBackground, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';
const image = { uri: "https://images.unsplash.com/photo-1579547621244-c07e55dcb856?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1792&q=80" };
export default function LandingScreen({ navigation }) {
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={image} style={{ flex: 1 }} >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", padding: 1 }}>
                    <Image source={require("../../assets/Logo.png")} style={{}} />
                </View >
                <Button mode="contained" color="red" onPress={() => { navigation.navigate("Register") }} style={{
                    marginTop: 170
                }}>SignUp</Button>
                <Button mode="contained" onPress={() => { navigation.navigate("Login") }} style={{
                    marginTop: 9, marginBottom: 20
                }} >Login</Button>
            </ImageBackground>
        </View >
    )
}
