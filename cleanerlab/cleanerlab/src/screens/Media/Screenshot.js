import React,{useState,useEffect,useRef} from 'react'
import {
    View,
    NativeModules,
    StyleSheet,
    Text,
    Animated,
    ImageBackground,
    Image,
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    FlatList
} from 'react-native'
import * as MediaLibrary from 'expo-media-library';

import {observer} from "mobx-react";
var cameraRollFetcher = NativeModules.CameraRollFetcher;
import I18n from '../../../lang/index';

import BigList from "react-native-big-list";

import userStore from "../../store/userStore";
import {Icon, Spinner} from "native-base";
import FastImage from "react-native-fast-image";
import CameraRoll from "@react-native-community/cameraroll";
import {FlashList} from "@shopify/flash-list";
import SuccessPopup from "../../components/successPopup";
import Modal from "react-native-modal";
import Accordion from "react-native-collapsible/Accordion";
import AsyncStorage from "@react-native-community/async-storage";
import GifImage from "@lowkey/react-native-gif/src";
const ScreenShot = ({navigation,route}) =>{
    const [success, setSuccess] = useState(false);
    const [filter,setFilter]=useState(userStore.ekransFilterType)

    const [activeSections,setActiveSections] = useState([99])

    const SECTIONS = [
        {
            title: 'First',

            content: [{type:'newest',text:I18n.t('newest')},{type:'oldest',text:I18n.t('oldest')},{type:'most',text:I18n.t('most')}]
        },

    ];
    const [count,setCount]=useState(5)

    useEffect(()=>{
        AsyncStorage.getItem('ekranFirst').then(data=>{
            if(!data){
                setTimeout(()=>{

                navigation.navigate('Divider',{page:'screenshot'})
                AsyncStorage.setItem('ekranFirst',JSON.stringify(true))
                },250)
            }
        })

    },[])

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

                                userStore.setEkransFilter(item.type)
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

                                userStore.setEkransFilter(item.type)
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
                                userStore.setEkransFilter(item.type)
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
    let renderImages= ({item, index,group,indis})=>{
        let appleId = item.substring(5, 41);
        const uri = `assets-library://asset/asset.?id=${appleId}&ext=`;
        if(userStore.ekrans.length<5) {
            MediaLibrary.getAssetInfoAsync(userStore.getAssetId(item)).then(data=>{
                if(!data){
                    userStore.catchBlanks(item)
                }

            })
        }


        if(index==0){


            return(
                <TouchableWithoutFeedback onPress={()=>navigation.navigate('Detail',{group,index,page:'ekrans'})}>
                    <View   style={styles.twiceContainers}>
                        <FastImage  source={{uri:uri}}
                                    onError={e => {
                                        // console.error(e)
                                        MediaLibrary.getAssetInfoAsync(userStore.getAssetId(item)).then(data=>{
                                            if(!data){
                                                userStore.catchBlanks(item)
                                            }

                                        })
                                    }

                                    }
                                    style={{width:'100%',height:'100%',borderRadius:20}}/>

                        <View style={{position:'absolute',width:'50%',left:10,top:-15,zIndex:10}}>
                            <TouchableOpacity style={{paddingVertical:5,borderRadius:20,backgroundColor:'#9BF538'}} onPress={()=>{

                                setSuccess(true)
                                userStore.keepItArray(group.images,indis)

                            }}>

                                <Text style={{fontFamily:'Roboto-Medium',fontSize:10,textAlign:'center'}}>{I18n.t('keepAll')}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{position:'absolute',right:10,top:10,width:30,height:30,zIndex:99}}>
                            <TouchableOpacity onPress={()=>{

                                userStore.setSelectedScreen(item)
                            }}>

                                <FastImage source={userStore.screenSelected.indexOf(item) == -1 ? require('../../../assets/tick_close.png'):require('../../../assets/tick_open.png')} style={{width:30,height:30,zIndex:-1}}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{position:'absolute',right:10,bottom:10,zIndex:99}}>

                            <View style={{flexDirection:'row',backgroundColor:'#D9E3FF',padding:2,alignItems:'center',borderRadius:20,paddingHorizontal:8}}>

                                <FastImage source={require('../../../assets/medal.png')} style={{width:20,height:20}}/>
                                <Text style={{fontFamily:'Roboto-Regular',fontSize:10,textAlign:'center',marginLeft:5}}>{I18n.t('bestResult')}</Text>
                            </View>

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )



        }else{

            return(


                <TouchableWithoutFeedback onPress={()=>navigation.navigate('Detail',{group,index})}>
                    <View  style={styles.twiceContainers}>
                        <FastImage onError={e => {
                            // console.error(e)
                            MediaLibrary.getAssetInfoAsync(userStore.getAssetId(item)).then(data=>{
                                if(!data){
                                    userStore.catchBlanks(item)
                                }

                            })
                        }

                        }  source={{uri:uri}} style={{width:'100%',height:'100%',borderRadius:20}}/>

                        <TouchableOpacity onPress={()=>{
                            userStore.setSelectedScreen(item)
                        }} style={{justifyContent:'center',alignItems:'center',width:50,height:50,position:'absolute',right:0,top:0}}>

                            <FastImage source={userStore.screenSelected.indexOf(item) == -1 ? require('../../../assets/tick_close.png'):require('../../../assets/tick_open.png')} style={{width:30,height:30}}/>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
    }


    let renderItem= ({item, index})=>{
        // let allSelected=item.images.find((it,indis)=>{
        //     if(userStore.screenSelected.indexOf(it) == -1) return false
        //     else if(indis==item.images.length-1) return true
        // })
        let allSelected=item.images.find((it,indis)=>{
            if(userStore.screenSelected.indexOf(it) == -1) return false
            else if(indis==item.images.length-1) return true
        })
        return (
            <View>
                <View style={styles.menuItemContainer}>
                    <View style={styles.menuInsideContainer}>

                        <View style={styles.menuLeftContainer}>
                            <Text style={[styles.menuText,{color:userStore.activeTheme.textColor}]}>{I18n.t('ekranLine',{total:item.images.length})}</Text>


                        </View>
                        <TouchableOpacity style={styles.menuRightContainer} onPress={()=>{
                            item.images.find(it=>{
                                // if(allSelected){
                                // }else{
                                //
                                // if(userStore.selected.indexOf(it)!= -1) userStore.setSelected(it)
                                // }
                                if(allSelected){
                                    item.images.find(it=>{
                                        // if(allSelected){
                                        // }else{
                                        //
                                        // if(userStore.selected.indexOf(it)!= -1) userStore.setSelected(it)
                                        // }
                                        if(userStore.screenSelected.indexOf(it)!=-1)
                                            userStore.setSelectedScreen(it)


                                    })
                                }else{
                                    item.images.find(it=>{
                                        // if(allSelected){
                                        // }else{
                                        //
                                        // if(userStore.selected.indexOf(it)!= -1) userStore.setSelected(it)
                                        // }
                                        if(userStore.screenSelected.indexOf(it)==-1)
                                            userStore.setSelectedScreen(it)


                                    })
                                }


                            })
                        }}>

                            <Text style={{fontFamily:'Roboto-Medium',color:userStore.activeTheme.textColor,marginLeft:10}}>{allSelected ? I18n.t('deselectAll'):I18n.t('selectAll')}</Text>

                        </TouchableOpacity>

                    </View>
                    <View style={{flexDirection:'row',width:'100%'}}>

                        <FlashList  itemHeight={50} data={item.images.slice()} showsHorizontalScrollIndicator={false} horizontal={true} renderItem={(info)=>  renderImages({item:info.item,index:info.index,group:item,indis:index}) } />


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
                    <TouchableOpacity onPress={()=>{
                        // userStore.ekrans.find(it=>{
                        //     it.images.find((item,indis)=>{
                        //         if(it.images[0] != item) userStore.setSelectedScreen(item)
                        //     })
                        // })
                        if(!userStore.premium){
                            navigation.navigate('Premium')
                        }else{

                            if(userStore.selectedAllEkrans){
                                userStore.deselectAllEkrans()
                            }else{
                                userStore.selectAllEkrans()

                            }
                        }
                    }} style={[styles.buttonsContainer,{backgroundColor:userStore.activeTheme.homeBoxBackground}]}>
                        <FastImage source={userStore.selectedAllEkrans ? require('../../../assets/tick_open.png'):require('../../../assets/tick_close.png')} style={{resizeMode:'contain',width:23,height:23}}/>
                        <Text style={{fontFamily:'Roboto-Medium',color:userStore.activeTheme.textColor,marginLeft:10}}>{userStore.selectedAllEkrans ? I18n.t('selectedAll'):I18n.t('selectAll')}</Text>
                    </TouchableOpacity>

            </View>
            <View style={styles.headerContainer}>
                <Text style={[styles.homeTitle,{color:userStore.activeTheme.textColor}]}>{I18n.t('screenshots')}</Text>

                <View style={{}}>
                    <Text style={[styles.headerInfoText,{color:userStore.activeTheme.textColor}]}>{I18n.t('similarsTotal',{total: userStore.ekransTotal} )}</Text>
                    <Text style={[styles.headerInfoText, {textAlign: 'right',color:userStore.activeTheme.textColor}]}>{I18n.t('similarSelected',{total: userStore.screenSelected.length} )}</Text>


                </View>

            </View>
            <View style={styles.headerContainer}>
                <Text style={{fontFamily:'Roboto-Medium',color:'black',marginLeft:10}}> </Text>

                <View style={{justifyContent:'center',width: '32%'}}>
                    <Accordion
                        style={{width: '100%',zIndex: 999}}
                        sections={SECTIONS}
                        touchableComponent={TouchableOpacity}
                        activeSections={activeSections}
                        renderHeader={renderHeader}
                        renderContent={renderContent}
                        onChange={updateSections}

                    />
                </View>
                {/*<TouchableWithoutFeedback>*/}
                {/*<View style={styles.buttonsContainer}>*/}
                {/*    <FastImage source={require('../../../assets/filter.png')} style={{resizeMode:'contain',width:23,height:23}}/>*/}
                {/*    <Text style={{fontFamily:'Roboto-Medium',color:'black',marginLeft:10}}>En Yeni</Text>*/}
                {/*</View>*/}
                {/*</TouchableWithoutFeedback>*/}
            </View>
            <Modal isVisible={success} backdropColor={'white'} onBackdropPress={()=>setSuccess(!success)} style={{justifyContent:'center',alignItems:'center'}}>
                <SuccessPopup text={I18n.t('keptSuccessfuly')} />
            </Modal>
            {userStore.ekrans.length>0?(
                <View style={styles.mainContainer}>


                    <FlashList data={userStore.ekrans.slice()}  renderItem={renderItem} />


                </View>

            ):(
                <View style={{alignItems:'center',justifyContent:'flex-start'}}>
                    <GifImage
                        source={require('../../../assets/robo2.gif')}
                        style={styles.robot} resizeMode={'contain'}
                    />
                    <Text style={[{fontFamily:'Roboto-Medium'}, {color: userStore.activeTheme.textColor}]}>{I18n.t('noPhoto')}</Text>
                </View>
                )}
            {userStore.screenSelected.length>0 && (
                <View style={{width:'100%',position:'absolute',justifyContent:'center',alignItems:'center',bottom:50}}>
                    <TouchableWithoutFeedback style={{

                    }}
                                              onPress={()=>{
                                                  if(!userStore.premium && userStore.screenSelected.length>1){
                                                      navigation.navigate('Premium')
                                                  }else{
                                                      if(!userStore.premium){
                                                          navigation.navigate('Premium')
                                                          userStore.setDeletePage('ekran')
                                                          userStore.setDeletePopup(true)
                                                      }else{

                                                          userStore.deleteScreenShot(navigation)
                                                      }
                                                  }
                                              }}
                    >
                        <View style={{paddingHorizontal:20,height:60,backgroundColor:!userStore.premium && userStore.screenSelected.length>1 ? '#959594': '#0011FA',justifyContent:'center',alignItems:'center',borderRadius:33}}>
                        {userStore.deleteLoading ? (
                                <Spinner size={'large'} color={'white'}/>
                            ):(
                                <Text style={{color:'white',fontFamily:'Roboto-Medium',fontSize:20}}>
                                    {I18n.t('deleteEkrans',{total:userStore.screenSelected.length})} ({userStore.formatBytes(userStore.screenTotalSize)})

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
    buttonsContainer: {flexDirection:'row',
        justifyContent:'space-between',
        borderRadius:20,
        backgroundColor:'#D9E3FF',
        paddingHorizontal: 10,
        paddingVertical:7,
        alignItems:'center',  },

    headerInfoText:{color:'#5D6073',fontFamily:'Roboto-Regular',fontSize:15},
    mainContainer:{
        flex:1,
        width:'100%',
        justifyContent:'center',
        marginTop:10,
        paddingBottom:50
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
        paddingTop:30,

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
        height:160,

        borderRadius:20,
        marginTop:20,
        marginRight:20,
        zIndex:-1
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
    selectWholeText: {fontFamily:'Roboto-Medium',
        color:'black',
        marginLeft:10,  },
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
export default observer(ScreenShot)
