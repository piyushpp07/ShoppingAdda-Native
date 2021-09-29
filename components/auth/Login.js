import React from 'react';
import { View, ImageBackground,Text,Image ,ToastAndroid} from 'react-native';
import { TextInput, Button } from 'react-native-paper'
import firebase from 'firebase';
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
        firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {console.warn(result) })
            .catch((error) => { ToastAndroid.show(error) })
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", backgroundColor: "#EEEEEE" }}>
                    
   
        <View style={{  backgroundColor: "#FFF", height: 400,width: '90%',
            elevation: 10, borderRadius: 10, padding: 13
            }}>
                 <View style={{ flex: 1,
                    aspectRatio: 1, resizeMode: 'contain',padding:2 }}>
                    <Image source={require("../../assets/Logo2.png")} style={{}} />
                </View >
                 <View>
                        <TextInput placeholder="Email" onChangeText={(email) => { this.setState({ email }) }}
                            placeholder="Enter Your Email" mode="outlined" label="Email"
                            style={{ marginTop: 30}} />
                        <TextInput placeholder="Password" onChangeText={(password) => { this.setState({ password }) }}
                            placeholder="Enter Password" mode="outlined" label="Password"
                            secureTextEntry={true} />
                        <Button mode="contained"
                            onPress={() => this.onLogin()}
                            style={{ marginTop: 10 }}>Login</Button>
                    </View>
       </View>
            </View >
        );
    }
}