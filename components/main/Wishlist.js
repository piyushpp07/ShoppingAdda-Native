import React, { useContext } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, Alert, ToastAndroid, } from 'react-native';
import { StateContext } from '../Context/StateProvider';
import { MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { db } from '../../Firebase';
const Wishlist = () => {
    const { wish, wishtotal, userdata, cart } = useContext(StateContext);
    const [dataWishlist, setDataWishlist] = wish;
    const [dataCart, setDataCart] = cart;
    const [wishTotal, setwishTotal] = wishtotal;
    const [user, setUser] = userdata;
    const ide = user;
    const deleteHandler = async (id) => {
        await db.collection('users')
            .doc(ide)
            .collection('wish')
            .doc(id)
            .delete().then(() => { ToastAndroid.show("Removed From Wishlist", ToastAndroid.SHORT) })
    }
    const MovetoCart = (doc) => {
        let q = dataCart.filter(a => a.productName === doc.productName)
        if (q.length === 0) {
            db.collection('users').doc(ide).collection('cart').add({
                productName: doc.productName,
                price: doc.price,
                desc: doc.desc,
                image: doc.image
            })
        }
        else {
            ToastAndroid.show("Already In Cart", ToastAndroid.SHORT)
        }

    }


    return (
        <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#fff', marginBottom: 10 }}>
                <View style={[styles.centerElement, { width: 50, height: 50 }]}>
                    <Ionicons name="ios-heart" size={25} color="#000" />
                </View>
                <View style={[styles.centerElement, { height: 50 }]}>
                    <Text style={{ fontSize: 18, color: '#000' }}>Wishlist</Text>
                </View>
            </View>



            <ScrollView>
                {dataWishlist && dataWishlist.map((item, i) => (
                    <View key={i} style={{ flexDirection: 'row', backgroundColor: '#fff', marginBottom: 2, height: 120 }}>

                        <View style={{ flexDirection: 'row', flexGrow: 1, flexShrink: 1, alignSelf: 'center' }}>
                            <TouchableOpacity onPress={() => {/*this.props.navigation.navigate('ProductDetails', {productDetails: item})*/ }} style={{ paddingRight: 10 }}>
                                <Image source={item.image} style={[styles.centerElement, { height: 60, width: 60, backgroundColor: '#eeeeee' }]} />
                            </TouchableOpacity>
                            <View style={{ flexGrow: 1, flexShrink: 1, alignSelf: 'center' }}>
                                <Text numberOfLines={1} style={{ fontSize: 15 }}>{item.productName}</Text>
                                <Text numberOfLines={1} style={{ color: '#8f8f8f' }}>{'Description : ' + item.desc}</Text>
                                <Text numberOfLines={1} style={{ color: '#333333', marginBottom: 10 }}>₹{item.price}</Text>

                            </View>

                        </View>
                        <View style={[styles.centerElement, { width: 60 }]}>
                            <TouchableOpacity style={[styles.centerElement, { width: 32, height: 32 }]} onPress={() => MovetoCart(item)}>
                                <Ionicons name="ios-cart" size={25} color="#ee4d2d" />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.centerElement, { width: 32, height: 32 }]} onPress={() => deleteHandler(item.key)}>
                                <Ionicons name="md-trash" size={25} color="#ee4d2d" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>



            <View style={{ backgroundColor: '#fff', borderTopWidth: 2, borderColor: '#f6f6f6', paddingVertical: 5 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={[styles.centerElement, { width: 60 }]}>
                        <View style={[styles.centerElement, { width: 32, height: 32 }]}>
                            <MaterialCommunityIcons name="ticket" size={25} color="#f0ac12" />
                        </View>
                    </View>

                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row', paddingRight: 20, alignItems: 'center' }}>
                        <Text style={{ color: '#8f8f8f' }}>SubTotal: </Text>
                        <Text>₹  {wishTotal}</Text>
                    </View>
                </View>

            </View>

        </View>


    );
}

const styles = StyleSheet.create({
    centerElement: { justifyContent: 'center', alignItems: 'center' },
});
export default Wishlist;
