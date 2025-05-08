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
import Share from 'react-native-share';
import * as Sharing from 'expo-sharing'; // Import the library

import {observer} from "mobx-react";
import {Icon} from "native-base";
import GifImage from "@lowkey/react-native-gif/src/index";
import Modal from "react-native-modal";
import userStore from "../../store/userStore";
import I18n from '../../../lang/index';
import ImagePicker from 'react-native-image-crop-picker';
import {FlashList} from "@shopify/flash-list";


import Video from "react-native-video";
import FastImage from "react-native-fast-image";

const Secret = ({navigation,route}) =>{
    const [pickerModal,setPickerModal] = useState(false)
    const [deleteModal,setDeleteModal] = useState(false)
    const screen= Dimensions.get('window')
    return(
        <View style={{flex:1,paddingTop:20,backgroundColor:userStore.activeTheme.background}}>
            <View style={{position:'absolute',width:'150%',height:'40%'}}>
                <Image source={require('../../../assets/topFar.png')} style={{width:'100%',height:'100%',resizeMode:'cover'}}/>
            </View>


                <View style={styles.headerContainer}>
                    <TouchableOpacity style={{width:50}} onPress={()=>navigation.goBack()}>
                        <FastImage source={userStore.theme == 'dark' ? require('../../../assets/leftbackwhite.png'):require('../../../assets/leftback.png')} style={{width:10,height:15,marginLeft:10}}/>
                    </TouchableOpacity>
                    <View style={{flexDirection:'row'}}>

                        <TouchableOpacity onPress={()=>{
                            setPickerModal(!pickerModal)

                        }}>
                            <Icon name={'add-outline'} style={{color:userStore.activeTheme.textColor}} />
                        </TouchableOpacity>
                    <TouchableWithoutFeedback onPress={()=>{
                        userStore.changePwActive(!userStore.passwordActive)
                    }}>
                        <Image source={userStore.passwordActive ? require('../../../assets/locked.png') : require('../../../assets/unlocked.png')} style={{resizeMode:'contain',width:23,height:23}}/>

                    </TouchableWithoutFeedback>
                    </View>

                </View>
                <View style={styles.headerContainer}>
                    <Text style={[styles.homeTitle,{color:userStore.activeTheme.textColor}]}>{I18n.t('secret')}</Text>

                    <View style={{}}>
                        <Text style={[styles.headerInfoText,{color:userStore.activeTheme.textColor}]}>{userStore.secretItems.length-userStore.secretVideos.length} {I18n.t('photo')}</Text>
                        <Text style={[styles.headerInfoText, {color:userStore.activeTheme.textColor}]}>{userStore.secretVideos.length} {I18n.t('video')}</Text>



                    </View>

                </View>


                {/*<View style={styles.mainContainer}>*/}



                {/*        <View style={styles.menuItemContainer}>*/}

                {/*            <FlashList data={userStore.similars[22].images} numColumns={2} renderItem={({item,index})=>{*/}
                {/*                let uri = item*/}
                {/*                if(index%2==0)*/}
                {/*                    return(*/}
                {/*                        <TouchableWithoutFeedback onPress={()=>{*/}
                {/*                            // navigation.navigate('OtherSwipe')*/}

                {/*                            navigation.navigate('WhiteListDetail',{index})*/}
                {/*                        }}>*/}
                {/*                            <View style={styles.twiceContainers}>*/}
                {/*                                <Image source={{uri:uri}} style={{width:'100%',height:'100%',resizeMode:'cover',borderRadius:20}}/>*/}
                {/*                                <View style={{position:'absolute',width:'50%',left:10,top:-15,zIndex:10}}>*/}
                {/*                                    <TouchableOpacity style={{paddingVertical:5,borderRadius:20,backgroundColor:'#0011FA'}}>*/}
                {/*                                        <Text style={{fontFamily:'Roboto-Medium',fontSize:10,textAlign:'center',color:'white'}}>Fotoğraf</Text>*/}
                {/*                                    </TouchableOpacity>*/}
                {/*                                </View>*/}

                {/*                                <View style={{position:'absolute',right:10,top:10,width:30,height:30,zIndex:99}}>*/}
                {/*                                    <TouchableOpacity onPress={()=>userStore.setSelectedKept(item)}>*/}
                {/*                                        <Image source={userStore.keptSelected.indexOf(uri) >-1 ? require('../../../assets/tick_open.png'):require('../../../assets/tick_close.png')}*/}
                {/*                                               style={{width: 30, height: 30, zIndex: -1}}/>*/}
                {/*                                    </TouchableOpacity>*/}
                {/*                                </View>*/}


                {/*                            </View>*/}
                {/*                        </TouchableWithoutFeedback>*/}
                {/*                    )*/}
                {/*            }} />*/}


                {/*        </View>*/}


                {/*</View>*/}


            {/*<ScrollView >*/}

            {/*</ScrollView>*/}

            {userStore.secretItems.length >0? (
                    <View style={{width:'100%',height:userStore.secretSelected.length>0 ? '60%':screen.height*0.7}}>


                <FlashList data={userStore.secretItems.slice()} numColumns={2} renderItem={(item,index)=>{
                    console.log('it',item)

                    return(
                        <TouchableWithoutFeedback onPress={()=>{
                            // navigation.navigate('OtherSwipe')


                        }}>
                            <View style={styles.twiceContainers}>
                                {item.item.mime.indexOf('video')==-1 ? (
                                    <Image source={{uri:item.item.sourceURL}} style={{width:'100%',height:'100%',resizeMode:'cover',borderRadius:20}}/>

                                ):(
                                    <Video source={{uri:item.item.sourceURL.split('file://')[1]}} style={{
                                        width:160,
                                        height:160



                                    }}
                                           muted={true}
                                           repeat={true}

                                    />
                                )}

                                <View style={{position:'absolute',width:'50%',left:10,top:-15,zIndex:10}}>
                                    <TouchableOpacity style={{paddingVertical:5,borderRadius:20,backgroundColor:'#0011FA'}}>
                                        <Text style={{fontFamily:'Roboto-Medium',fontSize:10,textAlign:'center',color:'white'}}>{item.item.mime.indexOf('video')==-1 ?I18n.t('photo'):I18n.t('video')}</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{position:'absolute',right:10,top:10,width:30,height:30,zIndex:99}}>
                                    <TouchableOpacity onPress={()=>userStore.setSelectedSecret(item.item.sourceURL.indexOf('file//')!= -1 ? item.item.sourceURL.split('file://')[1]:item.item.sourceURL)}>
                                        <Image source={userStore.secretSelected.indexOf( item.item.sourceURL.indexOf('file//')!= -1 ? item.item.sourceURL.split('file://')[1]:item.item.sourceURL) >-1 ? require('../../../assets/tick_open.png'):require('../../../assets/tick_close.png')}
                                               style={{width: 30, height: 30, zIndex: -1}}/>
                                    </TouchableOpacity>
                                </View>


                            </View>
                        </TouchableWithoutFeedback>
                    )
                }} />
                    </View>
                ):(
                <View style={styles.notAllowContainer}>
                    <GifImage
                        source={require('../../../assets/robo1.gif')}
                        style={styles.robot} resizeMode={'contain'}
                    />
                    <Image  />
                    <Text style={[styles.allowTitle,{color:userStore.activeTheme.textColor}]}>{I18n.t('noSecret')}</Text>
                    <Text style={[styles.allowDesc,{color:userStore.activeTheme.textColor}]}>{I18n.t('noSecretDesc')}</Text>

                    {/*<TouchableOpacity onPress={()=>{*/}
                    {/*    navigation.navigate('Premium')*/}
                    {/*}}>*/}
                    {/*    <View style={styles.allowButtonContainer}>*/}
                    {/*        <Text style={styles.allowButtonText}>Daha Fazla Bilgi</Text>*/}
                    {/*    </View>*/}
                    {/*</TouchableOpacity>*/}
                </View>
                )}


            <Modal animationIn={'fadeInUp'} animationOut={'fadeOutUp'} isVisible={pickerModal} onBackdropPress={()=>setPickerModal(!pickerModal)} style={{width:'90%',height:'100%',justifyContent:'flex-end',paddingBottom: 50,alignItems:'center'}}>
                <TouchableWithoutFeedback onPress={()=>setPickerModal(!pickerModal)}>

                <Text style={{color:'white',fontFamily:'Roboto-Medium',fontSize:18,marginBottom:20}}> {I18n.t('cancel')} </Text>
                </TouchableWithoutFeedback>
                <View style={{width:'90%',flexDirection:'row',justifyContent:'space-between'}}>
                    <TouchableOpacity onPress={()=>{
                        ImagePicker.openCamera({
                            cropping: false,

                        }).then(image => {
                            userStore.setSecret(image)
                            console.log(image);
                        });
                    }} style={{paddingLeft:15,flexDirection:'row',alignItems:'center',width:'48%',height:Dimensions.get('window').height*0.08,borderRadius:20,backgroundColor:userStore.activeTheme.homeBoxBackground,marginBottom:20}}>

                        <Image source={userStore.theme == 'dark' ? require('../../../assets/cameraswhite.png'):require('../../../assets/cameras.png')} style={{width:30,height:30,resizeMode:'contain'}}/>
                        <Text style={{paddingLeft:10,color:userStore.activeTheme.textColor,fontFamily:'Roboto-Medium',fontSize:16}}> {I18n.t('photo')} </Text>


                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        ImagePicker.openCamera({
                            cropping: false,
                            mediaType: "video",
                        }).then(image => {
                            userStore.setSecret(image)

                            console.log(image);
                        });
                    }} style={{paddingLeft:15,flexDirection:'row',alignItems:'center',width:'48%',height:Dimensions.get('window').height*0.08,borderRadius:20,backgroundColor:userStore.activeTheme.homeBoxBackground,marginBottom:20}}>

                        <Image source={userStore.theme == 'dark' ? require('../../../assets/camerawhite.png'):require('../../../assets/camera.png')} style={{width:30,height:30,resizeMode:'contain'}}/>

                        <Text style={{paddingLeft:10,color:userStore.activeTheme.textColor,fontFamily:'Roboto-Medium',fontSize:16}}> {I18n.t('video')} </Text>



                    </TouchableOpacity>

                </View>
                <TouchableOpacity onPress={()=>{
                    ImagePicker.openPicker({
                        multiple: true,
                        cropping:false,
                        maxFiles:100
                    }).then(images => {
                        console.log(images);
                        userStore.setSecretPicker(images)
                    });
                }} style={{paddingLeft:15,flexDirection:'row',alignItems:'center',width:'90%',height:'8%',borderRadius:20,backgroundColor:userStore.activeTheme.homeBoxBackground,marginBottom:20}}>

                    <Image source={userStore.theme == 'dark' ? require('../../../assets/gallerywhite.png'):require('../../../assets/gallery.png')} style={{width:30,height:30,resizeMode:'contain'}}/>
                    <Text style={{paddingLeft:10,color:userStore.activeTheme.textColor,fontFamily:'Roboto-Medium',fontSize:16}}> {I18n.t('import')} </Text>

                </TouchableOpacity>
            </Modal>
            {/*onPress={()=>setPickerModal(!pickerModal)}*/}
            <Modal animationIn={'fadeInUp'} animationOut={'fadeOutUp'} isVisible={deleteModal} onBackdropPress={()=>setDeleteModal(!deleteModal)} style={{width:'90%',height:'100%',justifyContent:'center',paddingBottom: 50,alignItems:'center'}}>

                <View style={{alignItems:'center',justifyContent:'space-around',paddingVertical:30,width:'100%',height:300,borderRadius:20,backgroundColor:userStore.activeTheme.homeBoxBackground}}>
                    <Image source={require('../../../assets/blueTrash.png')} style={{width:40,height:40,resizeMode:'contain'}}/>
                    <Text style={{paddingHorizontal:20,color:userStore.activeTheme.textColor,fontFamily:'Roboto-Medium',fontSize:20,textAlign:'center'}}>{I18n.t('sure')}</Text>


                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <TouchableWithoutFeedback onPress={()=> {
                            userStore.deleteSecret()
                            setDeleteModal(!deleteModal)
                        }}>
                            <View style={{width:'30%',height:40,justifyContent:'center',borderRadius:20,alignItems:'center',backgroundColor:'#0011FA'}}>
                                <Text style={{fontFamily:'Roboto-Medium',color:'white'}}>{I18n.t('delete')}</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={()=>setDeleteModal(!deleteModal)}>
                            <View style={{width:'30%',marginLeft:20,height:40,justifyContent:'center',borderRadius:20,alignItems:'center',backgroundColor:'#497CAC'}}>
                                <Text style={{fontFamily:'Roboto-Medium',color:'white'}}>{I18n.t('cancel')}</Text>
                            </View>
                        </TouchableWithoutFeedback>


                    </View>
                </View>

            </Modal>
            {userStore.secretSelected.length>0 && (<View style={{width:'100%',position:'absolute',justifyContent:'center',alignItems:'center',bottom:10}}>
                {/*<TouchableWithoutFeedback style={{*/}

                {/*}} onPress={()=>{*/}
                {/*    // setPickerModal(!pickerModal)*/}
                {/*    setDeleteModal(!deleteModal)*/}
                {/*}}>*/}
                {/*    <View style={{width:'80%',height:80,backgroundColor:'#0011FA',justifyContent:'center',alignItems:'center',borderRadius:33}}>*/}

                {/*        <Text style={{color:'white',fontFamily:'Roboto-Medium',fontSize:20}}>*/}
                {/*            /!*2 Medyayı Sil*!/*/}
                {/*            Medya Ekle*/}
                {/*        </Text>*/}
                {/*    </View>*/}
                {/*</TouchableWithoutFeedback>*/}
                <TouchableOpacity style={{paddingLeft:15,flexDirection:'row',alignItems:'center',width:'90%',height:60,borderRadius:20,backgroundColor:userStore.activeTheme.homeBoxBackground,marginBottom:10}} onPress={async ()=>{
                    // setPickerModal(!pickerModal)
                    try{
                        let links =  userStore.secretSelected.map(it=>{
                            console.log(it)
                            if(it.indexOf('file://')==-1){

                            return 'file://'+it
                            }else{

                                return it
                            }
                        })

                        Share.open({
                            urls: links
                        })
                            .then((res) => {
                                console.log(res);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                        // MultiShare.share({ videos: [userStore.secretSelected[0]] });

                    }catch (e) {
                        alert(e)
                    }


                }}>
                    <Image source={userStore.theme == 'dark' ? require('../../../assets/sharewhite.png'):require('../../../assets/share.png')} style={{width:30,height:30,resizeMode:'contain'}}/>

                        <Text style={{paddingLeft:10,color:userStore.activeTheme.textColor,fontFamily:'Roboto-Medium',fontSize:16}}>{I18n.t('share')}</Text>


                </TouchableOpacity>
                <TouchableOpacity style={{paddingLeft:15,flexDirection:'row',alignItems:'center',width:'90%',height:60,borderRadius:20,backgroundColor:userStore.activeTheme.homeBoxBackground,marginBottom:20}}  onPress={()=>{
                    // setPickerModal(!pickerModal)
                    setDeleteModal(!deleteModal)
                }}>
                    <Image source={userStore.theme == 'dark' ? require('../../../assets/deletewhite.png'):require('../../../assets/set4.png')} style={{width:30,height:30,resizeMode:'contain'}}/>

                        <Text style={{paddingLeft:10,color:userStore.activeTheme.textColor,fontFamily:'Roboto-Medium',fontSize:16}}>{I18n.t('delete')}</Text>


                </TouchableOpacity>


            </View>)}

            {userStore.secretItems.length>0 ? (<Text></Text>):(
                <View style={{marginTop:-50}}>


                </View>

            )}
            {userStore.secretItems.length==0 && (
                <View style={{width:'100%',alignItems:'center',position:'absolute',bottom:50}}>

                    <TouchableWithoutFeedback style={{
                    }} onPress={()=>{
                        setPickerModal(!pickerModal)
                        // setDeleteModal(!deleteModal)
                    }}>
                        <View style={{width:'80%',height:65,backgroundColor:'#0011FA',justifyContent:'center',alignItems:'center',borderRadius:33}}>

                            <Text style={{color:'white',fontFamily:'Roboto-Medium',fontSize:20}}>
                                {/*2 Medyayı Sil*/}
                                {I18n.t('addMedia')}
                            </Text>
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
        width:'100%',
        justifyContent:'center',
        marginTop:10,
        paddingBottom:150,
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
        marginHorizontal:20,
        paddingVertical:15,
        borderRadius:20,
        marginVertical:0,


    },
    twiceContainers:{

        width:160,
        height:160,
        backgroundColor:'gray',
        borderRadius:20,
        marginTop:20,
        marginLeft:8,
        zIndex:10
    },
    menuInsideContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%'
    },
    headerContainer:{
        marginTop:30,
        marginLeft:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingRight:20,
        marginBottom:20,
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
export default observer(Secret)
