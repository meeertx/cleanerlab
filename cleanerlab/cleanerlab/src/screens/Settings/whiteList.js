import React,{useState,useEffect,useRef} from 'react'
import {View, StyleSheet, Text, Animated,FlatList, Image,ScrollView,TouchableOpacity,TouchableWithoutFeedback} from 'react-native'
import FastImage from "react-native-fast-image";
import {observer} from "mobx-react";
import userStore from "../../store/userStore";
import {Icon} from "native-base";
import Accordion from "react-native-collapsible/Accordion";
import I18n from '../../../lang/index';
import GifImage from "@lowkey/react-native-gif/src";
import {FlashList} from "@shopify/flash-list";

const WhiteList = ({navigation,route}) =>{
    useEffect(()=>{
        // alert(JSON.stringify(route.params))
        // alert(userStore.kept.length)
    },[])







    return(
        <View style={[styles.container,{backgroundColor:userStore.activeTheme.background}]}>
            <ScrollView>
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={{width:50}} onPress={()=>navigation.goBack()}>
                        <FastImage source={userStore.theme == 'dark' ? require('../../../assets/leftbackwhite.png'):require('../../../assets/leftback.png')} style={{width:10,height:15}}/>
                    </TouchableOpacity>
                    <View style={{justifyContent:'center',width: '32%'}}>
                        <Text></Text>
                    </View>

                </View>
                <View style={styles.headerContainer}>
                    <Text style={[styles.homeTitle,{color:userStore.activeTheme.textColor}]}>{I18n.t('keptList')}</Text>

                    <View style={{}}>
                        <Text style={styles.headerInfoText}></Text>
                        <Text style={styles.headerInfoText}></Text>

                    </View>
                </View>
                <View style={styles.headerContainer}>
                    <Text style={{fontFamily:'Roboto-Medium',color:'black',marginLeft:10}}> </Text>
                </View>

                <View style={[styles.mainContainer,{marginLeft:userStore.kept.length>0 ?  -17:0}]}>



                    <View >

                                {userStore.kept.length>0 ? ( <FlashList data={userStore.kept} numColumns={2} renderItem={({item,index})=>{
                                    let uri = item

                                    return(
                                        <View style={styles.menuItemContainer}>
                                        <TouchableWithoutFeedback onPress={()=>{
                                            // navigation.navigate('OtherSwipe')

                                            navigation.navigate('WhiteListDetail',{index})
                                        }}>
                                            <View style={styles.twiceContainers}>
                                                <Image source={{uri:uri}} style={{width:'100%',height:'100%',resizeMode:'cover',borderRadius:20}}/>
                                                <View style={{position:'absolute',width:'50%',left:10,top:-15,zIndex:10}}>
                                                    <TouchableOpacity style={{paddingVertical:5,borderRadius:20,backgroundColor:'#0011FA'}}>
                                                        <Text style={{fontFamily:'Roboto-Medium',fontSize:10,textAlign:'center',color:'white'}}>{I18n.t('photo')}</Text>
                                                    </TouchableOpacity>
                                                </View>

                                                <View style={{position:'absolute',right:10,top:10,width:30,height:30,zIndex:99}}>
                                                    <TouchableOpacity onPress={()=>userStore.setSelectedKept(item)}>
                                                        <Image source={userStore.keptSelected.indexOf(uri) >-1 ? require('../../../assets/tick_open.png'):require('../../../assets/tick_close.png')}
                                                               style={{width: 30, height: 30, zIndex: -1}}/>
                                                    </TouchableOpacity>
                                                </View>


                                            </View>
                                        </TouchableWithoutFeedback>
                                        </View>
                                    )
                                }} />):(
                                    <View style={styles.notAllowContainer}>
                                        <GifImage
                                            source={require('../../../assets/robo1.gif')}
                                            style={styles.robot} resizeMode={'contain'}
                                        />
                                        <Image  />
                                        <Text style={[styles.allowTitle,{color:userStore.activeTheme.textColor}]}>{I18n.t('noKept')}</Text>
                                        <Text style={[styles.allowDesc]}>{I18n.t('addKept')}</Text>

                                        {/*<TouchableOpacity onPress={()=>{*/}
                                        {/*    navigation.navigate('Premium')*/}
                                        {/*}}>*/}
                                        {/*    <View style={styles.allowButtonContainer}>*/}
                                        {/*        <Text style={styles.allowButtonText}>Daha Fazla Bilgi</Text>*/}
                                        {/*    </View>*/}
                                        {/*</TouchableOpacity>*/}
                                    </View>
                                    )}






                    </View>


                </View>
            </ScrollView>
            {userStore.keptSelected.length>0 && (
                <View style={{width:'100%',position:'absolute',justifyContent:'center',alignItems:'center',bottom:80}}>
                    <TouchableWithoutFeedback style={{

                    }} onPress={()=>{
                        userStore.deleteKept()
                    }}>
                        <View style={{width:'70%',height:60,backgroundColor:'#0011FA',justifyContent:'center',alignItems:'center',borderRadius:33}}>

                            <Text style={{color:'white',fontFamily:'Roboto-Medium',fontSize:20}}>
                                {I18n.t('deleteSelected')}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            )}
        </View>
    )
}

let styles= StyleSheet.create({
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
        justifyContent:'center',
        marginTop:10,

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
        paddingVertical:30,
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
        width:'100%'


    },
    twiceContainers:{

        width:160,
        height:200,
        backgroundColor:'gray',
        borderRadius:20,
        marginTop:20,
        marginVertical: 30,

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

    content:{
        width:'100%',
        paddingVertical:20,

        backgroundColor: '#D9E3FF',
        borderRadius:20,
        paddingHorizontal:20,

    },
    notAllowContainer:{
        justifyContent:'center',
        alignItems:'center',
        marginTop: 30,
        marginBottom:10
    },

    robot:{
        width:200,
        height:200,
        borderRadius: 20,
        marginLeft:-10,
        marginVertical:0
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
export default observer(WhiteList)
