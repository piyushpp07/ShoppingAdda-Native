import React, { useContext, useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import ItemsCard from './ItemsCard'
import { db } from '../../../Firebase';
import { StateContext } from '../../Context/StateProvider';
const Mens = (props) => {
    const { mens, seco, firs } = useContext(StateContext);
    const [dataMens, setDataMens] = mens;
    const [second, setSecond] = seco;
    const [first, setFirst] = firs;
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
                    width: 3,
                    height: 4,
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
                {second.map((doc) =>
                    <ItemsCard
                        src={{ uri: doc.image }}
                        name={doc.productName}
                        desc={doc.desc}
                        price={doc.price}
                        key={doc.key}
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
                {first.map((doc) =>
                    <ItemsCard
                        src={{ uri: doc.image }}
                        name={doc.productName}
                        desc={doc.desc}
                        price={doc.price}
                        key={doc.key}
                    />)}
            </ScrollView>

        </ScrollView >

    );
}



export default Mens;
