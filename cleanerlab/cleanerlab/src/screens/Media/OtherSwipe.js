import React,{useState,useEffect,useRef} from 'react'
import {
    View,
    StyleSheet,
    Text,
    Animated,
    FlatList,
    Image,
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Button
} from 'react-native'
import FastImage from "react-native-fast-image";
import {observer} from "mobx-react";
import userStore from "../../store/userStore";
import {Icon} from "native-base";
import Swiper from "react-native-deck-swiper";
import I18n from '../../../lang/index';

const OtherSwipe = ({navigation,route}) =>{
    useEffect(()=>{
        // alert(JSON.stringify(route.params))

    },[])

    return(
        <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableWithoutFeedback onPress={()=>navigation.goBack()}>
                        <Icon name={'chevron-back-outline'}/>
                    </TouchableWithoutFeedback>
                    <Text> </Text>

                </View>
                <View style={styles.headerContainer}>
                    <Text style={styles.homeTitle}>Diğerleri</Text>

                    <View style={{}}>
                        <Text style={styles.headerInfoText}>856 MB</Text>
                        <Text style={styles.headerInfoText}>4 Seçildi</Text>

                    </View>

                </View>
                <View style={styles.headerContainer}>
                    <Text style={{fontFamily:'Roboto-Medium',color:'black',marginLeft:10}}> </Text>


                </View>

                <View style={styles.mainContainer}>


                    <Swiper
                        cards={userStore.photos}
                        renderCard={(card) => {
                            return (
                                <View style={styles.card}>
                                    <Image source={{uri:card.node.image.uri}} style={{width:'90%',height:'90%',resizeMode:'contain'}}/>
                                    <Text style={styles.text}>{userStore.formatBytes(card.node.image.fileSize)}</Text>
                                </View>
                            )
                        }}
                        onSwiped={(cardIndex) => {console.log(cardIndex)}}
                        onSwipedAll={() => {console.log('onSwipedAll')}}
                        cardIndex={0}
                        backgroundColor={'white'}
                        stackSize= {3}>
                        <Text style={{fontFamily:'Roboto-Medium',color:'#0011FA',fontSize:13,textAlign:'center',marginTop:20}}>
                            Saklamak için yukarı, silmek için aşağı kaydır!                        </Text>
                    </Swiper>


                </View>

        </View>
    )
}

let styles= StyleSheet.create({
    card: {
        width:'100%',
        height:'50%',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#E8E8E8",
        justifyContent: "center",
        alignItems:'center',
        backgroundColor: "white"
    },
    text: {
        textAlign: "center",
        fontSize: 30,
        backgroundColor: "transparent"
    },

    selectWholeText: {fontFamily:'Roboto-Medium',
        color:'black',
        marginLeft:10,  },
    buttonsContainer: {flexDirection:'row',
        justifyContent:'space-between',
        borderRadius:20,
        backgroundColor:'#D9E3FF',
        paddingHorizontal: 10,
        paddingVertical:7,
        alignItems:'center',  },
    headerInfoText:{color:'#5D6073',fontFamily:'Roboto-Regular',fontSize:15},
    mainContainer:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        marginTop:10,
        alignItems:'center'
    },
    buttonText:{
        color:'white',
        textAlign:'center',
        fontFamily:'Roboto-Medium',
        fontSize:20
    },
    container:{
        flex:1,
        backgroundColor: 'white',
        paddingVertical:50,
    },
    menuRightText:{
        color:'#C1C1C1',
        fontSize:15,
        fontFamily: 'Roboto-Medium'
    },
    menuRightIcon:{
        width:10,
        height:10,marginLeft:10
    },
    menuRightContainer:{

        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderRadius:20,
        paddingHorizontal:10,
        paddingVertical:5
    },
    menuIcon:{
        width:25,
        height:25
    },
    menuText:{
        fontSize:20,
        marginLeft: 10,
        fontWeight:'500'
    },
    menuLeftContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',

    },
    menuItemContainer:{
        alignItems:'center',
        justifyContent:'space-between',
        marginHorizontal:20,
        paddingVertical:15,
        borderRadius:20,
        marginVertical:0,


    },
    twiceContainers:{

        width:160,
        height:200,
        backgroundColor:'gray',
        borderRadius:20,
        marginTop:20,
        marginVertical: 30,
        marginRight:20,
        zIndex:10
    },
    menuInsideContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%'
    },
    headerContainer:{
        marginTop:20,
        marginLeft:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingRight:20,
    },
    homeTitle:{
        fontFamily:'Roboto-Bold',
        fontSize:30,
    },

})
export default observer(OtherSwipe)
