import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import SwiperComponent from '../common/SwiperComponent'
import Stars from 'react-native-stars';
import { ScrollView } from 'react-native-gesture-handler';


const styles = StyleSheet.create({
   myStarStyle: {
      color: "#000",
      backgroundColor: 'transparent',
      textShadowColor: "black",
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2
   },
   myEmptyStarStyle: {
      color: "white"
   }
});


export default class Detail extends React.Component {

   render() {
      return (
         <ScrollView>
            <View style={{
               flex: 1,
               backgroundColor: "#FFF",
               paddingHorizontal: 20
            }}>
               <View style={{
                  flexDirection: "row",
                  width: "100%",
                  marginTop: 40
               }}>
                  <TouchableOpacity
                     onPress={() => this.props.navigation.goBack()}
                     style={{
                        width: "50%"
                     }}
                  >
                     <Image
                        source={require('../images/back.png')}
                        style={{
                           width: 15,
                           height: 15
                        }}
                     />
                  </TouchableOpacity>
                  <View style={{
                     width: "50%",
                     alignItems: "flex-end"
                  }}>
                     <Image
                        source={require('../images/bag-2.png')}
                        style={{ width: 16, height: 20 }}
                     />
                  </View>
               </View>


               <View style={{
                  flexDirection: "row",
                  height: 340,
                  width: "100%"
               }}>
                  <View style={{
                     marginTop: 150
                  }}>

                  </View>
                  <SwiperComponent />
               </View>

               <View style={{
                  width: "100%",
                  alignItems: "flex-end"
               }}>

               </View>
               <View style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: 15, marginTop: 20,
                  width: "100%"
               }}>
                  <View style={{
                     width: "65%"
                  }}>
                     <Text style={{
                        fontWeight: "bold",
                        fontSize: 18,
                        color: "#4f4a4a"
                     }}>Autobe best Chair</Text>
                  </View>
                  <View style={{
                     width: "35%"
                  }}>
                     <Text style={{
                        fontWeight: "bold",
                        fontSize: 9,
                        color: "#4f4a4a"
                     }}>Customers Rating</Text>
                     <View style={{
                        alignItems: "center",
                        flexDirection: "row"
                     }}>
                        <Stars
                           default={4}
                           count={5}
                           half={true}
                           starSize={20}
                           fullStar={<Icon name={'star'} style={[styles.myStarStyle]} />}
                           emptyStar={<Icon name={'star-outline'} style={[styles.myStarStyle, styles.myEmptyStarStyle]} />}
                           halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]} />}

                        />
                        <Text style={{
                           fontSize: 8,
                           fontFamily: "Bold",
                           marginHorizontal: 5,
                           paddingTop: 4,
                           color: "#b3aeae"
                        }}>
                           84 Reviews
                        </Text>
                     </View>
                  </View>
               </View>
               <Text style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: "#b3aeae"
               }}>{this.props.price}</Text>
               <Text style={{
                  fontWeight: "medium",
                  fontSize: 14,
                  lineHeight: 20,
                  color: "#b3aeae",
                  marginTop: 20
               }}>
                  {this.props.doc}
               </Text>



               <View style={{
                  backgroundColor: "#000",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  padding: 12,
                  marginBottom: 15

               }}>
                  <Image
                     source={require('../images/bag.png')}
                     style={{ height: 20, width: 16 }}
                  />
                  <Text style={{
                     fontSize: 20,
                     color: "#FFF",
                     fontFamily: "Bold",
                     marginHorizontal: 15
                  }}>
                     Add to Cart
                  </Text>

               </View>
            </View>
         </ScrollView>
      );
   }
}