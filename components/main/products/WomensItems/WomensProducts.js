import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import ItemsCard from '../ItemsCard'
import { StateContext } from '../../../Context/StateProvider';
const WomensProducts = (props) => {
   const { womens } = useContext(StateContext);
   const [dataWomens, setDataWomens] = womens;
   return (
      <ScrollView showsVerticalScrollIndicator={false}
         style={{
            backgroundColor: "#fff",
            paddingHorizontal: 20
         }}>

         <View style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center"
         }}>
            <Text style={{
               fontWeight: "bold",
               fontSize: 18,
               color: "#4f4a4a"
            }}>
               Latest
            </Text>
            <View style={{
               width: 5,
               height: 5,
               borderRadius: 5,
               marginHorizontal: 5,
               backgroundColor: "#4f4a4a"
            }}></View>
            <Text style={{
               fontWeight: "bold",
               fontSize: 9,
               color: "#4f4a4a"
            }}>
               Good Quality items
            </Text>
         </View>
         <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
         >
            {dataWomens.map((doc) =>
               <ItemsCard
                  src={{ uri: doc.image }}
                  name={doc.productName}
                  desc={doc.desc}
                  price={doc.price}
                  key={doc.key}
                  onPress={() => props.navigation.navigate('Details', { doc })}
               />)}
         </ScrollView>
         <View style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center"
         }}>
            <Text style={{
               fontWeight: "bold",
               fontSize: 18,
               color: "#4f4a4a"
            }}>
               Trending
            </Text>
            <View style={{
               width: 5,
               height: 5,
               borderRadius: 5,
               marginHorizontal: 5,
               backgroundColor: "#4f4a4a"
            }}></View>
            <Text style={{
               fontWeight: "bold",
               fontSize: 9,
               color: "#4f4a4a"
            }}>
               AllTimeBest
            </Text>
         </View>

      </ScrollView >

   );
}



export default WomensProducts;
