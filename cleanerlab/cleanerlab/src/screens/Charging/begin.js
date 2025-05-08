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
import {Icon} from "native-base";
import GifImage from "@lowkey/react-native-gif/src/index";
import Modal from "react-native-modal";
import userStore from "../../store/userStore";
import {usePowerState} from 'react-native-device-info'
import FastImage from "react-native-fast-image";
import {FlashList} from "@shopify/flash-list";
import I18n from '../../../lang/index';
import Video from "react-native-video";
import AsyncStorage from "@react-native-community/async-storage";

const ChargingBegin = ({navigation,route}) =>{


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


    let stories = [
        require('../../../assets/chargeStories/sarf4 – 8.png'),
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

    useEffect(()=>{

        AsyncStorage.getItem('chargerFirst').then(first=>{
            // alert('geldim')
            if(!first){
                setTimeout(()=>{
                    navigation.navigate('ChargingIntro')
                    AsyncStorage.setItem('chargerFirst',JSON.stringify(true))
                },2500)

            }
        })
    },[])
    const renderItem = ({item, index})=>{

        return (
            <View style={{}}>
                <View style={styles.twiceContainers}>
                    <TouchableOpacity onPress={()=>navigation.navigate('ChargingDetail',{video:item})}>
                    <Video source={item} style={{
                      width:160,
                        height:160



                    }}

                           repeat={true}

                    />
                    </TouchableOpacity>

                </View>
            </View>
        )

    }

    return(
        <View style={{flex:1,paddingVertical:40,backgroundColor:userStore.activeTheme.background}}>
            <View style={{position:'absolute',width:'150%',height:'40%'}}>
                <FastImage source={require('../../../assets/animationFar.png')} style={{width:'100%',height:'100%',resizeMode:'cover'}}/>
            </View>



                <View style={styles.headerContainer}>
                    <TouchableOpacity style={{width:50}} onPress={()=>navigation.goBack()}>
                        <FastImage source={userStore.theme == 'dark' ? require('../../../assets/leftbackwhite.png'):require('../../../assets/leftback.png')} style={{width:10,height:15}}/>
                    </TouchableOpacity>
                    <TouchableWithoutFeedback onPress={()=>            navigation.navigate('ChargingIntro')
                    }>
                        <FastImage source={userStore.theme == 'dark' ? require('../../../assets/infowhite.png'):require('../../../assets/info.png')} style={{width:25,height:25}}/>
                    </TouchableWithoutFeedback>

                </View>
                <View style={styles.headerContainer}>
                    <Text style={[styles.homeTitle,{color:userStore.activeTheme.textColor}]}>{I18n.t('chargeAnimation')}</Text>

                    <Text></Text>

                </View>


                <View style={styles.mainContainer}>


                        <FlashList numColumns={2} data={anims}  renderItem={renderItem}/>




                </View>





            <Modal animationIn={'fadeInUp'} animationOut={'fadeOutUp'} isVisible={pickerModal} onBackdropPress={()=>setPickerModal(!pickerModal)} style={{width:'90%',height:'100%',justifyContent:'flex-end',paddingBottom: 50,alignItems:'center'}}>
                <TouchableWithoutFeedback onPress={()=>setPickerModal(!pickerModal)}>

                    <Text style={{color:'white',fontFamily:'Roboto-Medium',fontSize:18,marginBottom:20}}> Vazgeç </Text>
                </TouchableWithoutFeedback>
                <View style={{paddingLeft:15,flexDirection:'row',alignItems:'center',width:'90%',height:'8%',borderRadius:20,backgroundColor:'#EFF4FF',marginBottom:20}}>
                    <Image source={require('../../../assets/camera.png')} style={{width:30,height:30,resizeMode:'contain'}}/>
                    <Text style={{paddingLeft:10,color:'black',fontFamily:'Roboto-Medium',fontSize:16}}> Fotoğraf veya video çek </Text>

                </View>
                <View style={{paddingLeft:15,flexDirection:'row',alignItems:'center',width:'90%',height:'8%',borderRadius:20,backgroundColor:'#EFF4FF',marginBottom:20}}>
                    <Image source={require('../../../assets/gallery.png')} style={{width:30,height:30,resizeMode:'contain'}}/>
                    <Text style={{paddingLeft:10,color:'black',fontFamily:'Roboto-Medium',fontSize:16}}> Fotoğraf veya videoyu içe aktar </Text>

                </View>
            </Modal>
            {/*onPress={()=>setPickerModal(!pickerModal)}*/}
            <Modal animationIn={'fadeInUp'} animationOut={'fadeOutUp'} isVisible={deleteModal} onBackdropPress={()=>setDeleteModal(!deleteModal)} style={{width:'90%',height:'100%',justifyContent:'center',paddingBottom: 50,alignItems:'center'}}>

                <View style={{alignItems:'center',justifyContent:'space-around',paddingVertical:30,width:'100%',height:300,borderRadius:20,backgroundColor:'#EFF4FF'}}>
                    <Image source={require('../../../assets/blueTrash.png')} style={{width:40,height:40,resizeMode:'contain'}}/>
                    <Text style={{paddingHorizontal:20,color:'black',fontFamily:'Roboto-Medium',fontSize:20,textAlign:'center'}}>Dosyalar gizli kütüphanenizden
                        silinecek</Text>


                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <TouchableWithoutFeedback onPress={()=>setDeleteModal(!deleteModal)}>
                            <View style={{width:'30%',height:40,justifyContent:'center',borderRadius:20,alignItems:'center',backgroundColor:'#0011FA'}}>
                                <Text style={{fontFamily:'Roboto-Medium',color:'white'}}>Sil</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={()=>setDeleteModal(!deleteModal)}>
                            <View style={{width:'30%',marginLeft:20,height:40,justifyContent:'center',borderRadius:20,alignItems:'center',backgroundColor:'#497CAC'}}>
                                <Text style={{fontFamily:'Roboto-Medium',color:'white'}}>Vazgeç</Text>
                            </View>
                        </TouchableWithoutFeedback>


                    </View>
                </View>

            </Modal>

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
        width:Dimensions.get('window').width,
        justifyContent:'center',
        marginTop:30,
        flex:1,
        marginLeft:15
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
        marginTop:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:20,
        zIndex: 999,
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
export default observer(ChargingBegin)
