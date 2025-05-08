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
import { StoryContainer } from 'react-native-stories-view';
import Carousel from "react-native-reanimated-carousel";
var RNFS = require('react-native-fs')
const ChargingIntro = ({navigation,route}) =>{

    const data = [
        {
            story_id: 1,
            story_image: "https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg",
            swipeText:'Custom swipe text for this story',
            onPress: () => console.log('story 1 swiped'),
        },
        {
            story_id: 2,
            story_image: "https://image.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-601.jpg",
        }];
    let images = [
        require('../../../assets/chargeStories/2.png'),
        require('../../../assets/chargeStories/3.png'),
        require('../../../assets/chargeStories/4.png'),
        require('../../../assets/chargeStories/5.png'),
        require('../../../assets/chargeStories/6.png'),
        require('../../../assets/chargeStories/7.png'),
        require('../../../assets/chargeStories/8.png'),
    ]

    // let getBase= ()=>{
    //     images.find(it=>{
    //         RNFS.readFile('file://'it, 'base64')
    //             .then(res =>{
    //                 console.log(res);
    //             });
    //     })
    // }
    const [pickerModal,setPickerModal] = useState(false)
    const [deleteModal,setDeleteModal] = useState(false)
    const powerState = usePowerState(); // 'charging'
    useEffect(()=>{
        // RNFS.readdir(RNFS.LibraryDirectoryPath+'/Preferences').then(data=>{
        //     // alert(data)
        // })
    },[])
    const width = Dimensions.get('window').width;

    return(
        <View style={{flex:1,paddingVertical:0,backgroundColor:'#007AFA'}}>

            <TouchableOpacity onPress={()=>{
                navigation.goBack()
            }} style={{position:'absolute',left:40,top:50,zIndex:999,borderRadius:50,backgroundColor:'white'}}>
                <Icon name={'close-outline'} color={'white'} />
            </TouchableOpacity>

            <Carousel

                style={{}}
                width={width}
                height={Dimensions.get('window').height}
                autoPlay={true}
                data={images}
                scrollAnimationDuration={3000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ item,index }) => {
                    return(
                        <View style={styles.containers}>
                            <View style={{width:50,height:50,backgroundColor:'black',position:'absolute',zIndex:99,right:50,top:50,borderRadius:15,borderWidth:2,borderColor:'#007AFA',justifyContent:'center',alignItems:'center'}}>
                                <Text style={{fontSize:20,color:'white'}}>{index+1}</Text>
                            </View>
                            <View style={styles.imageContainer}>

                                <Image source={item} style={styles.image}  />
                            </View>

                        </View>
                    )
                }}
            />





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
    imageContainer:{
        width:Dimensions.get('window').width*0.8,
        height:Dimensions.get('window').height*0.65,
        borderRadius:20,

        overflow:'hidden'
    },
    image:{
        width:'100%',
        height:'100%',
        resizeMode:'contain',
        borderRadius:20


    },
    containers:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#007AFA',

    },
})
export default observer(ChargingIntro)
