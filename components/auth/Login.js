import React from 'react';
import { View, ImageBackground, Text, Image, ToastAndroid, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper'
import firebase from 'firebase';
import { KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',

        }

        this.onLogin = this.onLogin.bind(this)
    }
    onLogin() {
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => { ToastAndroid.show("Logged In", ToastAndroid.SHORT) })
            .catch((error) => {
                ToastAndroid.show(error.message, ToastAndroid.SHORT)

            })
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", backgroundColor: "#EEEEEE" }}>
                <KeyboardAvoidingView style={{ flex: 1, height: '70%', width: '90%', top: '2%' }}>
                    <ScrollView>
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
                                <TextInput placeholder="Email" onChangeText={(email) => { this.setState({ email }) }}
                                    placeholder="Enter Your Email" mode="outlined" label="Email"
                                    style={{ marginTop: 30 }} />
                                <TextInput placeholder="Password" onChangeText={(password) => { this.setState({ password }) }}
                                    placeholder="Enter Password" mode="outlined" label="Password"
                                    secureTextEntry={true} />
                                <Button mode="contained"
                                    onPress={() => this.onLogin()}
                                    style={{ marginTop: 10 }}>Login</Button>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View >
        );
    }
}