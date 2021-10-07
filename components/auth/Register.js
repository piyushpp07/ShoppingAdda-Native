import React, { useState } from 'react';
import { ImageBackground, View, Image, ToastAndroid } from 'react-native';
import { TextInput, Button } from 'react-native-paper'
import firebase from 'firebase';
export default function Register() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const onSignUp = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
            firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set({
                displayName: name,
                email
            })
            result.user.updateProfile({ displayName: name });
            console.log(result)
        })
            .catch((error) => { ToastAndroid.show("Try With Right Format", ToastAndroid.SHORT) })
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", backgroundColor: "#EEEEEE" }}>

            <View style={{
                backgroundColor: "#FFF", height: 550, width: '90%',
                elevation: 10, borderRadius: 10, padding: 12, resizeMode: 'contain'
            }}>
                <View style={{
                    flex: 1,
                    aspectRatio: 1, resizeMode: 'contain'
                }}>
                    <Image source={require("../../assets/Logo2.png")} style={{}} />
                </View >
                <View style={{ flex: 1, padding: 1 }}>
                    <TextInput placeholder="Enter Your Name" mode="outlined" label="Name"
                        style={{ marginTop: 20 }}
                        onChangeText={(name) => { setName(name) }} />
                    <TextInput placeholder="Email" onChangeText={(email) => { setEmail(email) }}
                        placeholder="Enter Your Email" mode="outlined" label="Email"
                    />
                    <TextInput placeholder="Password" onChangeText={(password) => { setPassword(password) }}
                        placeholder="Enter Password" mode="outlined" label="Password"
                        secureTextEntry={true} />
                    <Button mode="contained"
                        onPress={() => { onSignUp() }}
                        style={{ backgroundColor: "#E71414", color: 'white', marginTop: 10 }} >SignUp</Button>

                </View>
            </View>

        </View >

    );

}

