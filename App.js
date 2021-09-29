import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View, ImageBackground, Image, Button ,Alert} from 'react-native';
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
            headerBlurEffect:"dark",
            animation:"flip",
            presentation:"fullScreenModal"
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
                options={{
                  headerRight: () => (
                 <AntDesign name="infocirlce" size={23} color="black" onPress={()=>{Alert.alert("Hello!","App is Bulid By Piyush Paradkar")}}/>
                 
                  ),headerMode:'screen',headerStyle: {
  height: 80, // Specify the height of your custom header
}
                }} />
            </Stack.Navigator>
          </NavigationContainer >
        </StateProvider>
      )
    }
  }
}


export default App;
