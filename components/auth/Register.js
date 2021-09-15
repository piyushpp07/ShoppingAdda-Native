import React, { useState } from 'react';
import { ImageBackground, View } from 'react-native';
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
            .catch((error) => { console.log(error) })
    }

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={{ uri: "https://images.unsplash.com/photo-1565103382118-c65707fc2a9c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80" }}
                style={{ flex: 1 }}  >
                <View style={{ flex: 1, padding: 1 }}>
                    <TextInput placeholder="Enter Your Name" mode="outlined" label="Name"
                        style={{ backgroundColor: "null", marginTop: 100 }}
                        onChangeText={(name) => { setName(name) }} />
                    <TextInput placeholder="Email" onChangeText={(email) => { setEmail(email) }}
                        placeholder="Enter Your Email" mode="outlined" label="Email"
                        style={{ backgroundColor: "null" }} />
                    <TextInput placeholder="Password" onChangeText={(password) => { setPassword(password) }}
                        placeholder="Enter Password" mode="outlined" label="Password"
                        style={{ backgroundColor: "null" }} secureTextEntry={true} />
                    <Button mode="contained"
                        onPress={() => { onSignUp() }}
                        style={{ backgroundColor: "#E71414", color: 'white', marginTop: 10 }} >SignUp</Button>
                </View>
            </ImageBackground >
        </View >

    );

}

