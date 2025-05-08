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
    Dimensions
} from 'react-native'
import Video from 'react-native-video';
import I18n from '../../../lang/index';

import Modal from "react-native-modal";
import FastImage from "react-native-fast-image";
import {observer} from "mobx-react";
import userStore from "../../store/userStore";
import {Icon, Spinner} from "native-base";
import VideoPlayer from "../VideoPlayer";
import Accordion from "react-native-collapsible/Accordion";
import { FlashList } from "@shopify/flash-list";
import AsyncStorage from "@react-native-community/async-storage";
import * as MediaLibrary from "expo-media-library";
import GifImage from "@lowkey/react-native-gif/src";

const Videos = ({navigation,route}) =>{
    useEffect(()=>{
        // alert(JSON.stringify(route.params))
        AsyncStorage.getItem('videoFirst').then(data=>{
            if(!data){
                setTimeout(()=>{

                navigation.navigate('Divider',{page:'videos'})
                AsyncStorage.setItem('videoFirst',JSON.stringify(true))
                },250)
            }
        })
    },[])
    const [filter,setFilter]=useState(userStore.videoFilterType)
    const [count,setCount] = useState(5)
    const [activeSections,setActiveSections] = useState([99])

    const SECTIONS = [
        {
            title: 'First',

            content: [{type:'biggest',text:I18n.t('biggest')},{type:'smallest',text:I18n.t('smallest')},{type:'newest',text:I18n.t('newest')},{type:'oldest',text:I18n.t('oldest')},]
        },

    ];
    let renderHeader = (section,index) => {
        return (

            <View style={[styles.buttonsContainer,{backgroundColor:userStore.activeTheme.homeBoxBackground,borderTopStartRadius:20,borderTopEndRadius:20,borderBottomStartRadius:activeSections == index ?20:20,borderBottomEndRadius:activeSections == index ?20:20,}]}>
                    <Image source={userStore.theme == 'dark' ? require('../../../assets/filterwhite.png'):require('../../../assets/filter.png')} style={{resizeMode:'contain',width:23,height:23}}/>
                <Text style={[styles.selectWholeText,{color:userStore.activeTheme.textColor}]}>{section.content[filter].text}</Text>
                </View>
        );
    };

    let renderContent = (section,index) => {
        return (

            <View style={{marginTop:10,}}>
                {section.content.map((item,indis)=>{
                    if(indis == 0){
                        return(
                            <TouchableWithoutFeedback  onPress={()=>{
                                if(!userStore.premium){
                                    navigation.navigate('Premium')
                                }else{
                                    setFilter(indis)
                                    setActiveSections([99])

                                    userStore.setVideoFilter(item.type)
                                }

                            }}>
                                <View style={[styles.content,{backgroundColor:userStore.activeTheme.homeBoxBackground,borderBottomStartRadius:0,borderBottomEndRadius:0,borderTopStartRadius:20,borderTopEndRadius:20,}]}>

                                    <Text style={[styles.contentText,{color:userStore.activeTheme.textColor}]}>{item.text}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    } else if(indis == section.content.length-1){
                        return(
                            <TouchableWithoutFeedback onPress={()=>{
                                if(!userStore.premium){
                                    navigation.navigate('Premium')
                                }else{


                                setFilter(indis)
                                setActiveSections([99])

                                userStore.setVideoFilter(item.type)
                                }
                            }}>
                                <View style={[styles.content,{backgroundColor:userStore.activeTheme.homeBoxBackground,borderBottomStartRadius:20,borderBottomEndRadius:20,borderTopStartRadius:0,borderTopEndRadius:0,}]}>

                                    <Text style={[styles.contentText,{color:userStore.activeTheme.textColor}]}>{item.text}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    }else{
                        return(
                            <TouchableWithoutFeedback onPress={()=>{
                                if(!userStore.premium){
                                navigation.navigate('Premium')
                            }else{

                                setFilter(indis)
                                setActiveSections([99])
                                userStore.setVideoFilter(item.type)
                            }

                            }}>
                                <View style={[styles.content,{backgroundColor:userStore.activeTheme.homeBoxBackground,borderBottomStartRadius:0,borderBottomEndRadius:0,borderTopStartRadius:0,borderTopEndRadius:0}]}>

                                    <Text style={[styles.contentText,{color:userStore.activeTheme.textColor}]}>{item.text}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    }

                })}

            </View>

        );
    };

    let updateSections = (activeSection) => {
        setActiveSections(activeSection)
        if(activeSection == '')
            setActiveSections([9999])



    };


    const renderItem = ({item, index})=>{
        const appleId = item.node.image.uri.substring(5, 41);
        const fileNameLength = item.node.image.filename.length;
        const ext = item.node.image.filename.substring(fileNameLength - 3);
        const uri = `assets-library://asset/asset.${ext}?id=${appleId}&ext=${ext}`;

        console.log(uri)
        console.log(item.node.image.uri)
        return (
            <View>
                <View style={styles.twiceContainers}>
                    <FastImage
                        onError={e => {
                            // console.error(e)
                            MediaLibrary.getAssetInfoAsync(userStore.getAssetId(item.node.image.uri)).then(data=>{
                                if(!data){
                                    userStore.catchBlanks(item.node.image.uri)
                                }

                            })
                        }

                        }

                        source={{uri: uri}} style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 20,

                    }}/>


                    <View style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={()=>{
                            navigation.navigate('Player',{item})
                        }} style={{width: '40%', height: '40%'}}>
                            <FastImage source={require('../../../assets/play-icon.png')}
                                       resizeMode={'contain'}
                                       style={{width: '100%', height: '100%'}}/>
                        </TouchableOpacity>

                    </View>
                    <View style={{
                        position: 'absolute',
                        width: '50%',
                        left: 10,
                        top: -15,
                        zIndex: 10
                    }}>
                        <TouchableOpacity style={{
                            paddingVertical: 5,
                            borderRadius: 20,
                            backgroundColor: '#0011FA'
                        }}>
                            <Text style={{
                                fontFamily: 'Roboto-Medium',
                                fontSize: 10,
                                textAlign: 'center',
                                color: 'white'
                            }}>{userStore.formatBytes(item.node.image.fileSize)}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        position: 'absolute',
                        right: 10,
                        top: 10,
                        width: 30,
                        height: 30,
                        zIndex: 99
                    }}>
                        <TouchableOpacity onPress={()=>userStore.setSelectedVideo(item)}>
                            <FastImage source={userStore.videoSelected.indexOf(item.node.image.uri) >-1 ? require('../../../assets/tick_open.png'):require('../../../assets/tick_close.png')}
                                       style={{width: 30, height: 30, zIndex: -1}}/>
                        </TouchableOpacity>
                    </View>


                </View>
            </View>
            )

    }

    return(
        <View style={[styles.container,{backgroundColor:userStore.activeTheme.background}]}>


                <View style={styles.headerContainer}>
                    <TouchableOpacity style={{width:60,height:40,justifyContent:'center'}} onPress={()=>navigation.goBack()}>
                        <FastImage source={userStore.theme == 'dark' ? require('../../../assets/leftbackwhite.png'):require('../../../assets/leftback.png')} style={{width:10,height:15,marginLeft:10}}/>
                    </TouchableOpacity>

                    <View style={{justifyContent:'center',width: '32%'}}>
                        <Accordion
                            style={{width: '100%',zIndex: 999}}
                            sections={SECTIONS}
                            touchableComponent={TouchableWithoutFeedback}
                            activeSections={activeSections}
                            renderHeader={renderHeader}
                            renderContent={renderContent}
                            onChange={updateSections}

                        />
                    </View>

                </View>
                <View style={styles.headerContainer}>
                    <Text style={[styles.homeTitle,{color:userStore.activeTheme.textColor}]}>{I18n.t('videos')}</Text>

                    <View style={{}}>
                        <Text style={[styles.headerInfoText,{color:userStore.activeTheme.textColor}]}>{userStore.formatBytes(userStore.videoTotal)}</Text>
                        <Text style={[styles.headerInfoText, {textAlign: 'right',color:userStore.activeTheme.textColor}]}>{I18n.t('similarSelected',{total: userStore.videoSelected.length} )}</Text>


                    </View>

                </View>
                <View style={styles.headerContainer}>
                    <Text style={{fontFamily:'Roboto-Medium',color:'black',marginLeft:10}}> </Text>


                </View>

                <View style={styles.mainContainer}>




                        <View style={styles.menuItemContainer}>

                            <View style={{flexDirection:'row',width:'100%',flex:1,justifyContent:'space-between'}}>
                                <View style={{marginLeft:6,width:'100%',height:'auto',flex:1}}>
                                {userStore.allVideos ? (
                                    <FlashList numColumns={2} data={userStore.allVideos.slice()}  renderItem={renderItem}/>
                                ):(
                                    <View style={{alignItems:'center',justifyContent:'flex-start'}}>
                                        <GifImage
                                            source={require('../../../assets/robo2.gif')}
                                            style={styles.robot} resizeMode={'contain'}
                                        />
                                        <Text style={[{fontFamily:'Roboto-Medium'}, {color: userStore.activeTheme.textColor}]}>{I18n.t('noVideo')}</Text>
                                    </View>
                                )}
                                </View>
                                <View>

                                </View>

                                {/*<View style={{width:'50%',backgroundColor:'blue',justifyContent:'center'}}>*/}


                                {/*</View>*/}
                                {/*<View style={{width:'50%',backgroundColor:'red'}}>*/}

                                {/*</View>*/}


                            </View>


                        </View>



                </View>

            {userStore.videoSelected.length>0 && (
                <View style={{width:'100%',position:'absolute',justifyContent:'center',alignItems:'center',bottom:80}}>
                    <TouchableWithoutFeedback style={{

                    }}
                                              onPress={()=>{
                                                  if(!userStore.premium && userStore.videoSelected.length>1){
                                                      navigation.navigate('Premium')
                                                  }else{
                                                      if(!userStore.premium){
                                                          navigation.navigate('Premium')
                                                          userStore.setDeletePage('video')
                                                          userStore.setDeletePopup(true)
                                                      }else{

                                                          userStore.deleteVideo(navigation)
                                                      }
                                                  }
                                              }}
                    >
                        <View style={{width:'70%',height:60,backgroundColor:!userStore.premium && userStore.videoSelected.length>1 ? '#959594': '#0011FA',justifyContent:'center',alignItems:'center',borderRadius:33}}>
                            {userStore.deleteLoading ? (
                                <Spinner size={'large'} color={'white'}/>
                            ):(
                                <Text style={{color:'white',fontFamily:'Roboto-Medium',fontSize:20}}>
                                    {I18n.t('deleteVideo',{total:userStore.videoSelected.length})}

                                </Text>
                            )}


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
        marginTop:10,flex:1
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
        marginVertical:0,flex:1


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
    content:{
        width:'100%',
        paddingVertical:20,

        backgroundColor: '#D9E3FF',
        borderRadius:20,
        paddingHorizontal:20,

    },
    robot:{
        width:150,
        height:150,
        borderRadius: 20,
        marginLeft:-10,
        marginVertical:20
    },
})
export default observer(Videos)
