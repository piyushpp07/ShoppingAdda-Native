
import React, { useState } from 'react';
import { ImageBackground, View, Image, ToastAndroid, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper'
import firebase from 'firebase';
import { KeyboardAvoidingView } from 'react-native';
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
        }).catch((error) => { ToastAndroid.show("Try With Right Format", ToastAndroid.SHORT) })
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", backgroundColor: "#EEEEEE" }}>
            <KeyboardAvoidingView style={{ flex: 1, height: '70%', width: '90%', top: '2%' }}>
                <ScrollView showsHorizontalScrollIndicator={false}>
                    <View style={{
                        backgroundColor: "#FFF",
                        elevation: 10, borderRadius: 10, padding: 13
                    }}>
                        <View style={{
                            aspectRatio: 1, resizeMode: 'contain', padding: 2, alignItems: 'center', bottom: '60%'
                        }}>
                            <Image source={require("../../assets/Logo2.png")} />
                        </View >
                        <View>
                            <TextInput placeholder="Enter Your Name" mode="outlined" label="Name"
                                style={{ marginTop: 1 }}
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
                </ScrollView>
            </KeyboardAvoidingView >
        </View >
    );



}


