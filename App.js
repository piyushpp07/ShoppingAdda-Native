import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View, ImageBackground, Image, Button, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './components/auth/Landing';
import HomeScreen from './components/HomeScreen';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { auth } from './Firebase';
import { StateProvider } from './components/Context/StateProvider'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
const Stack = createStackNavigator();
import { LogBox } from 'react-native';
import _ from 'lodash';
import Chat from './components/Chat';
import { Entypo } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';

LogBox.ignoreLogs(['Warning:...']); // ignore specific logs
LogBox.ignoreAllLogs(); // ignore all logs
const _console = _.clone(console);

console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};



class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
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
    const image = { uri: "https://images.unsplash.com/photo-1579547621244-c07e55dcb856?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1792&q=80" };

    if (!loaded) {
      return (
        <View style={{ flex: 1 }}>
          <ImageBackground source={{ uri: "https://images.unsplash.com/photo-1579547621244-c07e55dcb856?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1792&q=80" }} style={{ flex: 1 }} >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", padding: 1 }}>
              <Image source={require("./assets/Logo.png")} style={{}} />
            </View >
          </ImageBackground>
        </View >
      )
    }
    else if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing" screenOptions={{
            headerMode: 'screen',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#B5DEFF' },
            headerBlurEffect: "dark",
            animation: "flip",
            presentation: "fullScreenModal"
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
        <StateProvider>
          <NavigationContainer  >
            <Stack.Navigator initialRouteName="Main">
              <Stack.Screen name="ShoppingAdda" component={HomeScreen}
                options={({ navigation }) => ({
                  title: 'Shopping Adda',
                  headerStyle: {
                    backgroundColor: '#273469',
                  },
                  headerTintColor: '#EBF2FA',
                  headerRight: () => (

                    <Entypo
                      onPress={() => navigation.navigate('Chat')}
                      name="chat"
                      type="material"
                      size={24}
                      style={{ right: 10 }}

                    />


                  ),

                  headerLeft: () => (
                    <Ionicons

                      onPress={() => Alert.alert("Under Construction")}
                      name="ios-menu"
                      type="material"
                      size={28}
                      style={{ left: 7, top: 1 }}

                    />
                  ),


                  headerMode: 'screen'
                })}
              />
              <Stack.Screen name="Chat" component={Chat} options={{
                title: 'Chat Bot',
                headerStyle: {
                  backgroundColor: '#273469',
                },
              }}
              />

            </Stack.Navigator>

          </NavigationContainer >
        </StateProvider>
      )
    }
  }
}


export default App;