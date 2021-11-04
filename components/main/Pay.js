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
        db.collection('users').doc(ide).collection('shipping').add(
          {
            pincode,
            address,
          }
        )
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
      <KeyboardAvoidingView style={styles.container}>
        <View style={{ justifyContent: 'space-between' }} >
          <Text style={{ fontSize: 35, bottom: 20, color: 'blue' }}>Checkout</Text>
          <Text style={{ fontSize: 20 }}> Total Bill Rs {cartTotal} </Text>
          <Text> </Text>
          <TextInput placeholder="Enter Your House and street" style={{ width: 260, backgroundColor: '#EFEFEF', borderRadius: 5, alignSelf: 'center', height: 30 }} autoComplete="postal-address"
            value={address} onChangeText={(address) => { setAddress(address) }} />
          <Text> </Text>
          <TextInput placeholder="Pincode" style={{ width: 260, backgroundColor: '#EFEFEF', borderRadius: 5, alignSelf: 'center', height: 30 }} value={pincode} onChangeText={(pincode) => { setPincode(pincode) }} />
          <Text> </Text>
          <Button title="Pay Now" onPress={() => { openPaymentSheet(); }} style={{ borderRadius: 15 }} />
        </View>
      </KeyboardAvoidingView>
    </StripeProvider >
  );
};
export default Pay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '80%',
    padding: 50,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    justifyContent: 'space-around',

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
