import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './components/auth/Landing';
import Login from './components/auth/Login';
import firebase from 'firebase/app'
import Register from './components/auth/Register';
const Stack = createStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyA_K9trF0iXJ4HRKBrtpKCu6a0WE464fos",
  authDomain: "mobile-6359c.firebaseapp.com",
  projectId: "mobile-6359c",
  storageBucket: "mobile-6359c.appspot.com",
  messagingSenderId: "530505614502",
  appId: "1:530505614502:web:d3da677bd98a0e96bde067"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      }
      else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View>
          <Text>
            Loading
          </Text>
        </View>
      )
    }
    else if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing" screenOptions={{
            headerMode: 'screen',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#2A4C62' },
          }} >
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>
        </NavigationContainer>

      );
    }
    else {
      return (
        <View style={{ flex: 1, marginTop: 500 }}><Text>loggedIn</Text></View>
      )
    }
  }
}

const styles = StyleSheet.create({})

export default App;
