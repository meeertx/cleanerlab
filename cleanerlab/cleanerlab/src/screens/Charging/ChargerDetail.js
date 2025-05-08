import React, {useState,useEffect} from 'react'
import {
    View,
    StyleSheet,
    Image,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Text,
    ScrollView,
    TouchableOpacity, FlatList, Dimensions
} from "react-native";
import {observer} from "mobx-react";
import {Icon, Spinner} from "native-base";
import GifImage from "@lowkey/react-native-gif/src/index";
import Modal from "react-native-modal";
import userStore from "../../store/userStore";
import {usePowerState} from 'react-native-device-info'
import FastImage from "react-native-fast-image";
import {FlashList} from "@shopify/flash-list";
import I18n from '../../../lang/index';
import Video from "react-native-video";
import AsyncStorage from "@react-native-community/async-storage";

const ChargingDetail = ({navigation,route}) =>{


    let anims = [
        require('../../../assets/charge/1.mp4'),
        require('../../../assets/charge/2.mp4'),
        require('../../../assets/charge/3.mp4'),
        require('../../../assets/charge/4.mp4'),
        require('../../../assets/charge/5.mp4'),
        require('../../../assets/charge/6.mp4'),
        require('../../../assets/charge/7.mp4'),
        require('../../../assets/charge/8.mp4'),
    ]
    const [pickerModal,setPickerModal] = useState(false)
    const [deleteModal,setDeleteModal] = useState(false)
    const powerState = usePowerState(); // 'charging'

    const screen = Dimensions.get('window')


    return(
        <View style={{flex:1,paddingVertical:40}}>
            {/*<View style={{position:'absolute',width:'150%',height:'40%'}}>*/}
            {/*    <FastImage source={require('../../../assets/animationFar.png')} style={{width:'100%',height:'100%',resizeMode:'cover'}}/>*/}
            {/*</View>*/}



            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={()=>navigation.goBack()} style={{marginLeft:10,marginTop:30}} >
                   <Icon name={'close-outline'} style={{color:'white'}}/>
                </TouchableOpacity>
                <Text></Text>

            </View>



            <View style={styles.mainContainer}>


                <Video  source={route.params.video} style={{
                    width:userStore.screen.width*2.3,
                    height:userStore.screen.height*2.3,
                    resizeMode:'center',


                }}

                       repeat={true}

                />



            </View>




            <View style={{width:'100%',position:'absolute',justifyContent:'center',alignItems:'center',bottom:50}}>
                <TouchableOpacity style={{width:'70%',height:60,backgroundColor:'#0011FA',justifyContent:'center',alignItems:'center',borderRadius:33}}
                                          onPress={()=>{
                                             AsyncStorage.setItem('chargeAnimation',JSON.stringify(route.params.video))
                                              navigation.goBack()
                                              userStore.getChargeAnimation()
                                          }}
                >
                    <View >
                        {userStore.deleteLoading ? (
                            <Spinner size={'large'} color={'white'}/>
                        ):(
                            <Text style={{color:'white',fontFamily:'Roboto-Medium',fontSize:20}}>
                                {I18n.t('setAnimation')}
                            </Text>
                        )}

                    </View>
                </TouchableOpacity>
            </View>


        </View>
    )
}
let styles= StyleSheet.create({
    buttonsContainer: {flexDirection:'row',
        justifyContent:'space-between',
        borderRadius:20,
        backgroundColor:'#D9E3FF',
        paddingHorizontal: 10,
        paddingVertical:7,
        alignItems:'center',  },
    headerInfoText:{color:'#5D6073',fontFamily:'Roboto-Regular',fontSize:15},
    mainContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex:-1,

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
        paddingTop:50,

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
        overflow:'hidden',
        width:160,
        height:160,
        backgroundColor:'white',
        borderRadius:20,
        marginTop:20,
        flex:1,
        zIndex:10
    },
    menuInsideContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%'
    },
    headerContainer:{
        marginTop:10,
        marginLeft:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingRight:20,
        position:'absolute',
        zIndex:99
    },
    homeTitle:{
        fontFamily:'Roboto-Bold',
        fontSize:30,
    },
    allowButtonContainer:{
        backgroundColor: '#2007FF',
        paddingHorizontal:20,
        paddingVertical:10,
        borderRadius:10,
        marginVertical:10

    },
    allowButtonText:{
        color:'white',
    },
    notAllowContainer:{
        justifyContent:'center',
        alignItems:'center',
        marginVertical: 20
    },
    robot:{
        width:200,
        height:200,
        borderRadius: 20,
        marginLeft:-10,
        marginVertical:20
    },
    allowTitle:{
        fontWeight:'500',
        fontSize:20,
        textAlign:'center',
        width:'80%'
    },
    allowDesc:{
        fontWeight:'400',
        fontSize:15,
        textAlign:'center',
        width:'80%',
        color:'#828CA5',
        marginVertical:10
    },

})
export default observer(ChargingDetail)
