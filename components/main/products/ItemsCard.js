import React, { useContext, useEffect } from 'react';
import { Text, View, Image, Alert, ToastAndroid } from 'react-native';
import { Button, Dialog, Portal, Paragraph } from 'react-native-paper'
import { db } from '../../../Firebase';
import { StateContext } from '../../Context/StateProvider';
export default function ItemsCard(props) {

   const { cart, userdata, wish } = useContext(StateContext);
   const [user, setUser] = userdata;
   const [dataCart, setDataCart] = cart;
   const [dataWishlist, setDataWishlist] = wish;
   const [visible, setVisible] = React.useState(false);
   const hideDialog = () => setVisible(false);

   const addToCart = () => {
      let q = dataCart.filter(a => a.productName === props.name)
      if (q.length === 0) {
         db.collection('users').doc(user).collection('cart').add({
            price: props.price,
            productName: props.name,
            desc: props.name,
            image: props.src
         })
      }
      else {
         ToastAndroid.show("Already In Cart", ToastAndroid.SHORT)
      }

   }

   const addToWishlist = () => {
      let q = dataWishlist.filter(a => a.productName === props.name)
      if (q.length === 0) {
         db.collection('users').doc(user).collection('wish').add({
            price: props.price,
            productName: props.name,
            desc: props.desc,
            image: props.src
         })
      }
      else {
         ToastAndroid.show("Already In WishList", ToastAndroid.SHORT)
      }

   }
   return (
      <View
         style={{
            marginTop: 20,
            backgroundColor: "#FFF",
            height: 300,
            width: 200,
            elevation: 5,
            borderRadius: 10,
            padding: 15,
            marginRight: 30,
            marginLeft: 1,
            marginBottom: 5,

         }}
      >
         <Image
            source={props.src}
            style={{
               width: 170,
               height: 180,
               borderRadius: 10
            }}
         />

         <View style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10
         }}>
            <Text style={{
               fontWeight: "bold",
               color: "#4f4a4a",
               fontSize: 12
            }}>
               {props.name}
            </Text>
            <View style={{
               height: 4,
               width: 4,
               borderRadius: 4,
               backgroundColor: "red",
               marginHorizontal: 4
            }}>

            </View>
            <Text style={{
               color: "red",
               fontSize: 9,
               fontWeight: "bold",
            }}>
               New
            </Text>


         </View>
         <Text style={{
            fontSize: 9,
            color: "#4f4a4a",

         }}>
            {props.desc}

         </Text>


         <View style={{
            flexDirection: "row",
            marginTop: 5,
            alignItems: "center",
            width: "60%"
         }}>
            <View style={{
               width: "50%",

            }}>
               <Text style={{
                  fontSize: 13,
                  fontWeight: "bold",
               }}>Price: {props.price} Rs</Text>
            </View>

            <Button icon="cart" onPress={() => { addToCart() }}></Button>
            <Button icon="heart" onPress={() => { addToWishlist() }}></Button>


         </View>


      </View >
   );

}