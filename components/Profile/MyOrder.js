import React, { useContext } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StateContext } from '../Context/StateProvider';
import { MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const MyOrder = () => {
    const { dataO, addr } = useContext(StateContext);
    const [dataOrder] = dataO;
    const [add] = addr
    return (
        <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#fff', top: 4 }}>
                <View style={[styles.centerElement, { width: 50, height: 50, top: 5 }]}>
                    <Ionicons name="ios-cart" size={25} color="#000" />
                </View>
                <View style={[styles.centerElement, { height: 50 }]}>
                    <Text style={{ fontSize: 18, color: '#000', top: 8 }}>My Orders</Text>
                </View>
            </View>
            <View>

            </View>
            <ScrollView>
                {dataOrder && dataOrder.map((item, i) => (<>
                    {i === 0 ?
                        (<View style={{ height: 40, width: 300 }}><Text style={{ fontSize: 15, fontWeight: 'bold' }}>Shipping Address : {add[0].address}</Text>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>PinCode: {add[0].pincode}</Text></View>) :
                        (<></>)}
                    <View key={i} style={{ flexDirection: 'row', backgroundColor: '#fff', marginBottom: 2, height: 120 }}>
                        <View style={{ flexDirection: 'row', flexGrow: 1, flexShrink: 1, alignSelf: 'center', borderRadius: 20 }}>
                            <TouchableOpacity style={{ paddingRight: 10 }}>
                                <Image source={item.image} style={[styles.centerElement, { height: 60, width: 60, backgroundColor: '#eeeeee', borderRadius: 6 }]} />
                            </TouchableOpacity>
                            <View style={{ flexGrow: 1, flexShrink: 1, alignSelf: 'center' }}>
                                <Text numberOfLines={1} style={{ fontSize: 15 }}>{item.productName}</Text>
                                <Text numberOfLines={1} style={{ color: '#8f8f8f' }}>{'Description : ' + item.desc}</Text>
                                <Text numberOfLines={1} style={{ color: '#333333', marginBottom: 10 }}>₹{item.price}</Text>
                            </View>
                        </View>
                    </View>
                </>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({

})

export default MyOrder;
