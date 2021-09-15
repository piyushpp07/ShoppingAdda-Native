import React from 'react';
import { View, ImageBackground } from 'react-native';
import { TextInput, Button } from 'react-native-paper'
import { auth } from '../../Firebase';
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
        auth.signInWithEmailAndPassword(email, password).then((result) => { console.log(result) })
            .catch((error) => { console.log(error) })
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignContent: "center", backgroundColor: "#B8B5FF" }}>
                <ImageBackground style={{ flex: 1 }}
                    source={{ uri: "https://images.unsplash.com/photo-1565103382118-c65707fc2a9c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80" }}>

                    <View style={{ flex: 1, padding: 1, alignContent: 'center' }}>
                        <TextInput placeholder="Email" onChangeText={(email) => { this.setState({ email }) }}
                            placeholder="Enter Your Email" mode="outlined" label="Email"
                            style={{ backgroundColor: " ", marginTop: 200 }} />
                        <TextInput placeholder="Password" onChangeText={(password) => { this.setState({ password }) }}
                            placeholder="Enter Password" mode="outlined" label="Password"
                            style={{ backgroundColor: " " }} secureTextEntry={true} />
                        <Button mode="contained"
                            onPress={() => this.onLogin()}
                            style={{ marginTop: 10 }}>Login</Button>
                    </View>
                </ImageBackground>
            </View >
        );
    }
}