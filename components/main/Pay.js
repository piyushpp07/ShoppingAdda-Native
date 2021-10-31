import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { StripeProvider } from "@stripe/stripe-react-native";
import axios from "axios";
import { useStripe } from "@stripe/stripe-react-native";
import { StateContext } from '../Context/StateProvider';
//ADD localhost address of your server
import StripeCheckout from 'react-stripe-checkout';
const API_URL = "http://localhost:3000";

const Pay = (props) => {
  const { cart, carttotal, userdata } = useContext(StateContext);
  const [cardDetails, setCardDetails] = useState();
  const [dataCart, setDataCart] = cart;
  const [cartTotal, setcartTotal] = carttotal;
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [user, setUser] = userdata;
  const ide = user;
  const { confirmPayment, loading } = useConfirmPayment();
  const { initPaymentSheet, presentPaymentSheet } = useStripe()
  const [clientSecret, setClientSecret] = useState()

  useEffect(() => {
    initializePayment()
  }, [])

  const initializePayment = async () => {
    try {
      const response = await fetch('http://192.168.29.241:3000/payment', {
        method: 'POST',
        headers: {
          "Content-type": "application/json"
        }
        ,
        body: JSON.stringify({
          paymentMethod: "card",
          currency: "inr",
          amount: cartTotal * 100,
        })
      })
      const { client_secret } = await response.json();

      setClientSecret(client_secret)
      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret
      })
      if (error) {
        Alert.alert("ERROR CODE")
      }

    }
    catch (error) {
      console.log(error.message)
    }
  }


  const openPaymentSheet = async () => {
    try {
      const { error } = await presentPaymentSheet({
        clientSecret: clientSecret
      })
      if (error) {
        Alert.alert(" x Payment Failed", "Your Payment Has been Failed", error.message)
      }
      else {
        Alert.alert("Successfull !!!!", " ✔  Your Order Has been Successfully Placed")
      }
    }
    catch (error) {
      console.log(error)

    }
  }



  return (
    <StripeProvider publishableKey="pk_test_51JObFKSAm54TGSWjZQQVnpytQbBKaz7MqR7ewLtoeqZSsO9SZUl7n3ZZm3zEYV3sYmQnZaVbzZCttT3in6KJTxKS00lJalhL2a">
      <View style={styles.container}>
        <Text style={{ fontSize: 60 }}>Checkout</Text>
        <Text style={{ fontSize: 30, top: 10 }}> Total Bill </Text>
        <Text style={{ fontSize: 20, top: 6 }}> Rs {cartTotal}</Text>
        <Button title="Pay Using Card Now" onPress={() => { openPaymentSheet(); console.log("Hello") }} />
      </View>
    </StripeProvider>
  );
};
export default Pay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    padding: 30,
    alignItems: 'center'
  },
  input: {
    backgroundColor: "#efefefef",
    borderRadius: 10,
    fontSize: 20,
    height: 50,
    padding: 8,
  },
  card: {
    backgroundColor: "#efefefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});
