import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert, KeyboardAvoidingView } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { StripeProvider } from "@stripe/stripe-react-native";
import axios from "axios";
import { db } from "../../Firebase";
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
  const [house, setHouse] = useState("")
  const [pincode, setPincode] = useState("")
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
        addtoOrder();
        deleteCart();
        Alert.alert("Successfull !!!!", " ✔  Your Order Has been Successfully Placed");

      }
    }
    catch (error) {
      console.log(error)

    }
  }
  const addtoOrder = () => {
    dataCart.map((item) => {
      db.collection("users").doc(user).collection("order").add({
        price: item.price,
        productName: item.productName,
        desc: item.productName,
        image: item.image,
        house: house,
        pincode: pincode
      })
    });

  }
  const deleteCart = () => {
    dataCart.map((item) => {
      db.collection("users").doc(user).collection("cart").doc(item.key).delete().then((res) => { console.log(res) })
    })
  }

  return (
    <StripeProvider publishableKey="pk_test_51JObFKSAm54TGSWjZQQVnpytQbBKaz7MqR7ewLtoeqZSsO9SZUl7n3ZZm3zEYV3sYmQnZaVbzZCttT3in6KJTxKS00lJalhL2a">
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <Text style={{ fontSize: 35, bottom: 90 }}>Checkout</Text>
          <Text style={{ fontSize: 20, bottom: 70 }}> Total Bill Rs {cartTotal} </Text>
          <TextInput placeholder="Enter Your House and street" style={{ bottom: 60, width: 180 }} autoComplete="postal-address"
            value={house} onChangeText={(house) => { setHouse(house) }} />
          <TextInput placeholder="Pincode" style={{ bottom: 40, width: 200 }} value={pincode} onChangeText={(pincode) => { setPincode(pincode) }} />
          <Button title="Pay Now" onPress={() => { openPaymentSheet(); }} style={{ top: 30 }} />
        </KeyboardAvoidingView>
      </View>
    </StripeProvider >
  );
};
export default Pay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    height: '100%'
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
