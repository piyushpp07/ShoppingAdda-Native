import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import firebase from 'firebase'
import ItemsCard from './ItemsCard'
const Mens = () => {
    const [docs, setdocs] = useState([])
    useEffect(() => {
        const getDataFromFirebase = [];
        const subscriber = firebase.firestore().collection('collection').doc("mens").collection("MensAttire").onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                getDataFromFirebase.push({ ...doc.data(), key: doc.id });
            });
            setdocs(getDataFromFirebase);
        });
        return () => subscriber();
    }, [])
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
                {docs.map((doc) =>
                    <ItemsCard
                        src={{ uri: doc.image }}
                        name={doc.productName}
                        desc={doc.desc}
                        price={doc.price}
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
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <ItemsCard
                    src={{ uri: 'https://images.bewakoof.com/uploads/grid/app/types-of-shirts-for-men-bewakoof-blog-10-1610963791.jpg' }}
                    name="Beautiful Couches"


                />
                <ItemsCard
                    src={{ uri: 'https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/10187555/2019/9/26/4cc4ce57-09df-42ff-b5c3-092019d711ae1569502608755-WROGN-Men-Burgundy-Regular-Fit-Solid-Casual-Shirt-9071569502-1.jpg' }}
                    name="Autobe best chair"


                />
                <ItemsCard
                    src={{ uri: 'https://3.imimg.com/data3/GO/FA/GLADMIN-151214/corner-sofa-sets-500x500.jpg' }}
                    name="Beautiful Couches"


                />

            </ScrollView>






        </ScrollView >

    );
}

const styles = StyleSheet.create({})

export default Mens;
