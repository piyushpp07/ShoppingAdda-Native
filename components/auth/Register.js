import React from 'react';
import { ImageBackground, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper'
import firebase from 'firebase';

export default class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: ''
        }

        this.onSignUp = this.onSignUp.bind(this)
    }
    onSignUp() {
        const { email, password, name } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
            firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set({
                name,
                email
            })
            console.log(result)
        })
            .catch((error) => { console.log(error) })
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground source={{ uri: "https://images.unsplash.com/photo-1565103382118-c65707fc2a9c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80" }}
                    style={{ flex: 1 }}  >
                    <View style={{ flex: 1, padding: 1 }}>
                        <TextInput placeholder="Enter Your Name" mode="outlined" label="Name"
                            style={{ backgroundColor: " ", marginTop: 100 }}
                            onChangeText={(name) => { this.setState({ name }) }} />
                        <TextInput placeholder="Email" onChangeText={(email) => { this.setState({ email }) }}
                            placeholder="Enter Your Email" mode="outlined" label="Email"
                            style={{ backgroundColor: " " }} />
                        <TextInput placeholder="Password" onChangeText={(password) => { this.setState({ password }) }}
                            placeholder="Enter Password" mode="outlined" label="Password"
                            style={{ backgroundColor: " " }} secureTextEntry={true} />
                        <Button mode="contained"
                            onPress={() => { this.onSignUp() }}
                            style={{ backgroundColor: "#E71414", color: 'white', marginTop: 10 }} >SignUp</Button>
                    </View>
                </ImageBackground >
            </View >

        );
    }
}

