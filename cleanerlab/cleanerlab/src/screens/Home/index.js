import React, {useEffect, useState,useRef} from 'react'
import {
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,Linking,
    TouchableWithoutFeedback,
    Platform, Alert, Dimensions,Animated
} from "react-native";
import userStore from "../../store/userStore";
import {observer} from "mobx-react";
import GifImage from '@lowkey/react-native-gif';
import Video from "react-native-video";
import Modal from "react-native-modal";
import VideoPlayer from "../VideoPlayerHome";
import {Spinner} from "native-base";
import {check, PERMISSIONS, request} from "react-native-permissions";
import AsyncStorage from "@react-native-community/async-storage";
import CameraRoll from "@react-native-community/cameraroll";

import I18n from '../../../lang/index';
import FastImage from "react-native-fast-image";
import {useTheme} from "@react-navigation/native";
import LottieView from "lottie-react-native";
import ProgressBar from "react-native-animated-progress";
import * as MediaLibrary from 'expo-media-library';
import InAppReview from "react-native-in-app-review";

const Home = ({navigation})=>{


    let checkPhotos=()=>{
        if(Platform.OS == 'android'){

        }else{

            check(PERMISSIONS.IOS.PHOTO_LIBRARY)
                .then((result) => {
                    if(result == 'granted'){
                        userStore.start()
                        userStore.getAllPhotos()
                        let sayi=14;
                        let sonraki=null
                        let devam = true

                        let getAgain=(end)=>{
                            AsyncStorage.getItem('son').then(son=>{
                                if(son){
                                    // alert('optimize bitti')
                                }else{
                                    CameraRoll.getPhotos({
                                        after:end,
                                        first:15,
                                        assetType: 'Photos',
                                    })
                                        .then(r => {


                                            // alert(JSON.stringify(r.edges[0].node.image.uri))
                                            // // alert(Image.resolveAssetSource(r.edges[0].node.image.uri))
                                            // const cev1 = await CompImage.compress(r.edges[0].node.image.uri, {
                                            //     quality: 0.1,
                                            //
                                            // });
                                            //
                                            // RNFS.readFile(cev1, 'base64')
                                            //     .then(res =>{
                                            //         // alert(res.length)
                                            //         // nodejs.channel.send(res,res)
                                            //         // console.log(res);
                                            //     });
                                            // alert(r.edges.length)
                                            // setPhotos(r.edges)


                                            userStore.setSyncPhotos(15)
                                            getSimilarity(r.edges)
                                            devam=r.page_info.has_next_page
                                            sonraki=r.page_info.end_cursor
                                            if(r.page_info.has_next_page) {

                                                setTimeout(()=>{
                                                    AsyncStorage.setItem('last',JSON.stringify(r.page_info.end_cursor))
                                                    getAgain(r.page_info.end_cursor)

                                                },5000)
                                            }else{
                                                AsyncStorage.setItem('son',JSON.stringify(true))

                                            }





                                            console.log(r.page_info.end_cursor)
                                        })
                                        .catch((err) => {
                                            //Error Loading Images
                                        });
                                }
                            })

                        }

                        AsyncStorage.getItem('son').then(son=>{
                            if(son){
                                // alert('optimize bitti')
                            }else{
                                AsyncStorage.getItem('last').then(last=>{

                                    if(last){
                                        // CameraRoll.getPhotos({
                                        //     after:JSON.parse(last),
                                        //     first:15,
                                        //     assetType: 'Photos',
                                        // })
                                        //     .then(r => {
                                        //
                                        //         // // alert(JSON.stringify(r.edges[0].node.image.uri))
                                        //         // // alert(Image.resolveAssetSource(r.edges[0].node.image.uri))
                                        //         // const cev1 = await CompImage.compress(r.edges[0].node.image.uri, {
                                        //         //     quality: 0.1,
                                        //         //
                                        //         // });
                                        //         //
                                        //         // RNFS.readFile(cev1, 'base64')
                                        //         //     .then(res =>{
                                        //         //         // alert(res.length)
                                        //         //         // nodejs.channel.send(res,res)
                                        //         //         // console.log(res);
                                        //         //     });
                                        //         // alert(r.edges.length)
                                        //         // setPhotos(r.edges)
                                        //         getSimilarity(r.edges)
                                        //         userStore.setSyncPhotos(15)
                                        //
                                        //         devam=r.page_info.has_next_page
                                        //         sonraki=r.page_info.end_cursor
                                        //         if(r.page_info.has_next_page) {
                                        //
                                        //             setTimeout(()=>{
                                        //                 AsyncStorage.setItem('last',JSON.stringify(r.page_info.end_cursor))
                                        //                 getAgain(r.page_info.end_cursor)
                                        //
                                        //             },5000)
                                        //         }else{
                                        //             AsyncStorage.setItem('son',JSON.stringify(true))
                                        //
                                        //         }
                                        //
                                        //         console.log(r.page_info.end_cursor)
                                        //     })
                                        //     .catch((err) => {
                                        //         //Error Loading Images
                                        //     });
                                    } else{
                                        // CameraRoll.getPhotos({
                                        //     first:userStore.syncPhotos ? userStore.syncPhotos:15,
                                        //     assetType: 'Photos',
                                        // })
                                        //     .then(r => {
                                        //
                                        //         // // alert(JSON.stringify(r.edges[0].node.image.uri))
                                        //         // // alert(Image.resolveAssetSource(r.edges[0].node.image.uri))
                                        //         // const cev1 = await CompImage.compress(r.edges[0].node.image.uri, {
                                        //         //     quality: 0.1,
                                        //         //
                                        //         // });
                                        //         //
                                        //         // RNFS.readFile(cev1, 'base64')
                                        //         //     .then(res =>{
                                        //         //         // alert(res.length)
                                        //         //         // nodejs.channel.send(res,res)
                                        //         //         // console.log(res);
                                        //         //     });
                                        //         // alert(r.edges.length)
                                        //         // setPhotos(r.edges)
                                        //
                                        //         if(userStore.syncPhotos == 0){
                                        //             getSimilarity(r.edges)
                                        //             userStore.setSyncPhotos(15)
                                        //         }
                                        //
                                        //         devam=r.page_info.has_next_page
                                        //         sonraki=r.page_info.end_cursor
                                        //         if(r.page_info.has_next_page) {
                                        //
                                        //             setTimeout(()=>{
                                        //                 AsyncStorage.setItem('last',JSON.stringify(r.page_info.end_cursor))
                                        //
                                        //                 getAgain(r.page_info.end_cursor)
                                        //
                                        //             },5000)
                                        //         }else{
                                        //
                                        //         }
                                        //         console.log(r.page_info.end_cursor)
                                        //     })
                                        //     .catch((err) => {
                                        //         //Error Loading Images
                                        //     });
                                    }
                                })

                            }
                        })

                        // CameraRoll.getPhotos({
                        //     after:end,
                        //     first:15,
                        //     assetType: 'Photos',
                        // })
                        //     .then(r => {
                        //
                        //
                        //         // alert(JSON.stringify(r.edges[0].node.image.uri))
                        //         // // alert(Image.resolveAssetSource(r.edges[0].node.image.uri))
                        //         // const cev1 = await CompImage.compress(r.edges[0].node.image.uri, {
                        //         //     quality: 0.1,
                        //         //
                        //         // });
                        //         //
                        //         // RNFS.readFile(cev1, 'base64')
                        //         //     .then(res =>{
                        //         //         // alert(res.length)
                        //         //         // nodejs.channel.send(res,res)
                        //         //         // console.log(res);
                        //         //     });
                        //         // alert(r.edges.length)
                        //         // setPhotos(r.edges)
                        //         alert(r.edges.length)
                        //
                        //
                        //         console.log(r.page_info.end_cursor)
                        //     })
                        //     .catch((err) => {
                        //         //Error Loading Images
                        //     });
                        // while(devam){
                        //
                        //       if(sonraki){
                        //           CameraRoll.getPhotos({
                        //               after:sonraki,
                        //               first:14,
                        //               assetType: 'Photos',
                        //           })
                        //               .then(r => {
                        //
                        //                   // // alert(JSON.stringify(r.edges[0].node.image.uri))
                        //                   // // alert(Image.resolveAssetSource(r.edges[0].node.image.uri))
                        //                   // const cev1 = await CompImage.compress(r.edges[0].node.image.uri, {
                        //                   //     quality: 0.1,
                        //                   //
                        //                   // });
                        //                   //
                        //                   // RNFS.readFile(cev1, 'base64')
                        //                   //     .then(res =>{
                        //                   //         // alert(res.length)
                        //                   //         // nodejs.channel.send(res,res)
                        //                   //         // console.log(res);
                        //                   //     });
                        //                   // alert(r.edges.length)
                        //                   // setPhotos(r.edges)
                        //                   // getSimilarity(r.edges)
                        //                   devam=r.page_info.has_next_page
                        //                   sonraki=r.page_info.end_cursor
                        //                   alert(r.edges.length)
                        //               })
                        //               .catch((err) => {
                        //                   //Error Loading Images
                        //               });
                        //       }else{
                        //
                        //       }
                        // }
                    }else{
                        request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(res=>{
                            if(res == 'granted'){
                                userStore.start()
                                userStore.getAllPhotos()
                            }else{
                                Linking.openSettings();

                                Alert.alert(I18n.t('alert'),I18n.t('needPermission'))
                            }
                        })
                    }
                })
                .catch((error) => {
                    // …
                });
        }
    }

    const [permission,setPermission]=useState(true)
    const [play,setPlay]=useState(false)
    const screen = Dimensions.get('window')
    if(!permission){

    }else{

    }
    let secret = ()=>{
        // AppTrackingTransparency
        request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY).then(cevap=>{

        })
    }

    useEffect(()=>{
        userStore.setImageLoaded()
        secret()

        if(Platform.OS == 'android'){

        }else {
            check(PERMISSIONS.IOS.PHOTO_LIBRARY)
                .then((result) => {
                    if (result == 'granted') {
                        setPermission(true)


                    }else{
                        setPermission(false)

                    }

                })
        }

        AsyncStorage.getItem('isold').then(isold=>{
            if(isold){
                setTimeout(()=>{
                    if(!userStore.premium){
                        navigation.navigate('Premium')
                        userStore.setDeletePopup(true)
                        userStore.setDeletePage('notPremium')
                    }
                },2500)
            }else{
                setTimeout(()=>{
                    if(!userStore.premium){
                        navigation.navigate('Premium')
                        userStore.setDeletePopup(true)
                        userStore.setDeletePage('notPremium')
                    }
                },7500)
                AsyncStorage.setItem('isold',JSON.stringify(true))
            }
        })
    },[setPermission])
    return(
        <View style={{flex:1,backgroundColor:userStore.activeTheme.background,paddingBottom:120}}>
            <View style={styles.headerContainer}>
                <Text style={[styles.homeTitle,{color:userStore.activeTheme.textColor}]}>{I18n.t('homeTitle',{test: 'John'} )}</Text>
                <TouchableOpacity onPress={()=>navigation.navigate('Settings')}>
                    <FastImage onLoad={()=>{
                        userStore.setImageLoaded()
                    }} source={userStore.theme == 'dark' ? require('../../../assets/main_setttingsButtonwhite.png'):require('../../../assets/main_setttingsButton.png')} style={styles.headerButtonImage}/>
                </TouchableOpacity>
            </View>
            <View style={styles.headerBottomContainer}>
                {!userStore.premium ? (
                    <TouchableOpacity onPress={()=>navigation.navigate('Premium')}>
                        <View style={styles.proContainer}>

                            <FastImage source={require('../../../assets/king.png')} style={styles.proIcon}/>
                            <Text style={styles.proText}>{I18n.t('pro')}</Text>

                        </View>
                    </TouchableOpacity>
                ):
                    <FastImage source={require('../../../assets/premiumIcon.png')} style={{width:35,height:35,marginLeft:10}}/>

                }

                <View>

                <Text style={{color:userStore.activeTheme.textColor}}>{userStore.ekransTotal+userStore.similarsTotal+userStore.sameTotal+userStore.wholeImages.length+userStore.allVideos.length} {I18n.t('file')} | {userStore.formatBytes((userStore.ekransTotal+userStore.similarsTotal+userStore.sameTotal)*1500000+userStore.otherWholeSize+userStore.videosSize)}</Text>
                    <Text style={{color:userStore.activeTheme.textColor}}>{I18n.t('cleanableStorage')}</Text>

                </View>

            </View>
            {!userStore.finished && (
                <View style={{alignItems:'center',paddingBottom:10}}>

                    <View style={{height:40,marginTop:10,width:'70%',}}>
                        <Text style={{fontFamily:'Roboto-Medium',size:10,marginBottom:10,color:userStore.activeTheme.textColor}}>{I18n.t('analyzing')}</Text>
                        <ProgressBar  progress={(100 * userStore.photoOptimized) / userStore.checkedImages.length} height={10} backgroundColor="#2007FF" />

                    </View>
                </View>
            )}

            <ScrollView>
                {permission == false && (
                    <View style={styles.notAllowContainer}>
                        <GifImage
                            source={require('../../../assets/robo1.gif')}
                            style={styles.robot} resizeMode={'contain'}
                        />
                        <Image  />
                        <Text style={[styles.allowTitle,{color:userStore.activeTheme.textColor}]}>{I18n.t('permissionTitle')}</Text>
                        <Text style={[styles.allowDesc,,{color:userStore.activeTheme.textColor}]}>{I18n.t('permissionDesc')}</Text>

                        <TouchableOpacity onPress={()=>{
                            checkPhotos()
                        }}>
                            <View style={styles.allowButtonContainer}>
                                <Text style={styles.allowButtonText}>{I18n.t('allow')}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}

                <View style={styles.mainContainer}>

                    <TouchableWithoutFeedback onPress={()=> {
                        if(userStore.ratingActive){
                            AsyncStorage.getItem('lastReview').then(data=>{
                                if(!data){
                                    if(InAppReview.isAvailable()){
                                        InAppReview.RequestInAppReview()
                                            .then((hasFlowFinishedSuccessfully) => {
                                                navigation.navigate('Similar')
                                                AsyncStorage.setItem('lastReview',JSON.stringify(Date.now()))
                                                // when return true in android it means user finished or close review flow
                                                console.log('InAppReview in android', hasFlowFinishedSuccessfully);

                                                // when return true in ios it means review flow lanuched to user.
                                                console.log(
                                                    'InAppReview in ios has launched successfully',
                                                    hasFlowFinishedSuccessfully,
                                                );

                                                // 1- you have option to do something ex: (navigate Home page) (in android).
                                                // 2- you have option to do something,
                                                // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

                                                // 3- another option:
                                                if (hasFlowFinishedSuccessfully) {
                                                    // do something for ios
                                                    // do something for android
                                                }

                                                // for android:
                                                // The flow has finished. The API does not indicate whether the user
                                                // reviewed or not, or even whether the review dialog was shown. Thus, no
                                                // matter the result, we continue our app flow.

                                                // for ios
                                                // the flow lanuched successfully, The API does not indicate whether the user
                                                // reviewed or not, or he/she closed flow yet as android, Thus, no
                                                // matter the result, we continue our app flow.
                                            })
                                            .catch((error) => {
                                                //we continue our app flow.
                                                // we have some error could happen while lanuching InAppReview,
                                                // Check table for errors and code number that can return in catch.
                                                console.log(error);
                                            });
                                    }
                                }else{
                                    let oldDate= JSON.parse(data)
                                    if(Date.now()- oldDate <15*24*60*60*1000){
                                        navigation.navigate('Similar')
                                    }else{
                                        if(InAppReview.isAvailable()){
                                            InAppReview.RequestInAppReview()
                                                .then((hasFlowFinishedSuccessfully) => {
                                                    // when return true in android it means user finished or close review flow
                                                    console.log('InAppReview in android', hasFlowFinishedSuccessfully);
                                                    navigation.navigate('Similar')
                                                    AsyncStorage.setItem('lastReview',JSON.stringify(Date.now()))

                                                    // when return true in ios it means review flow lanuched to user.
                                                    console.log(
                                                        'InAppReview in ios has launched successfully',
                                                        hasFlowFinishedSuccessfully,
                                                    );

                                                    // 1- you have option to do something ex: (navigate Home page) (in android).
                                                    // 2- you have option to do something,
                                                    // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

                                                    // 3- another option:
                                                    if (hasFlowFinishedSuccessfully) {
                                                        // do something for ios
                                                        // do something for android
                                                    }

                                                    // for android:
                                                    // The flow has finished. The API does not indicate whether the user
                                                    // reviewed or not, or even whether the review dialog was shown. Thus, no
                                                    // matter the result, we continue our app flow.

                                                    // for ios
                                                    // the flow lanuched successfully, The API does not indicate whether the user
                                                    // reviewed or not, or he/she closed flow yet as android, Thus, no
                                                    // matter the result, we continue our app flow.
                                                })
                                                .catch((error) => {
                                                    //we continue our app flow.
                                                    // we have some error could happen while lanuching InAppReview,
                                                    // Check table for errors and code number that can return in catch.
                                                    console.log(error);
                                                });
                                        }
                                    }
                                }
                            })

                        }else{
                            navigation.navigate('Similar')

                        }

                    }}>


                <View>
            <View style={[styles.menuItemContainer,{backgroundColor:'#CCD8F6'}]}>
                <View style={[styles.menuInsideContainer,{backgroundColor:'#1F11FA'}]}>

                    <View style={styles.menuLeftContainer}>
                        <View style={styles.menuIconPadding}>

                        <FastImage style={styles.menuIcon} source={userStore.theme == 'dark' ? require('../../../assets/similarblue.png') :require('../../../assets/similarblue.png')} resizeMode={'contain'}/>
                        </View>

                        <Text style={[styles.menuText,{color:'white'}]}>{I18n.t('similar')}</Text>

                    </View>
                    <View style={styles.menuRightContainer}>

                        <View style={{marginRight:5}}>

                            <Text style={styles.menuRightText}>{userStore.similarsTotal} {I18n.t('photo')} </Text>
                            <Text style={styles.menuRightBottomText}>({userStore.formatBytes((userStore.similarsTotal)*1500000)})</Text>
                        </View>
                        <View style={{borderRadius:50,backgroundColor:'white',padding:5,marginLeft:5,justifyContent:'center',alignItems:'center'}}>

                        <FastImage style={styles.menuRightIcon} source={require('../../../assets/rightarrowblue.png')} resizeMode={'contain'}/>
                        </View>

                    </View>

                </View>
                {userStore.similars.length>0 && (
                    <View style={{flexDirection:'row',width:'105%',justifyContent:'space-between'}}>

                        <TouchableOpacity onPress={()=>{
                            if(userStore.ratingActive){
                                AsyncStorage.getItem('lastReview').then(data=>{
                                    if(!data){
                                        if(InAppReview.isAvailable()){
                                            InAppReview.RequestInAppReview()
                                                .then((hasFlowFinishedSuccessfully) => {
                                                    navigation.navigate('Similar')
                                                    AsyncStorage.setItem('lastReview',JSON.stringify(Date.now()))
                                                    // when return true in android it means user finished or close review flow
                                                    console.log('InAppReview in android', hasFlowFinishedSuccessfully);

                                                    // when return true in ios it means review flow lanuched to user.
                                                    console.log(
                                                        'InAppReview in ios has launched successfully',
                                                        hasFlowFinishedSuccessfully,
                                                    );

                                                    // 1- you have option to do something ex: (navigate Home page) (in android).
                                                    // 2- you have option to do something,
                                                    // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

                                                    // 3- another option:
                                                    if (hasFlowFinishedSuccessfully) {
                                                        // do something for ios
                                                        // do something for android
                                                    }

                                                    // for android:
                                                    // The flow has finished. The API does not indicate whether the user
                                                    // reviewed or not, or even whether the review dialog was shown. Thus, no
                                                    // matter the result, we continue our app flow.

                                                    // for ios
                                                    // the flow lanuched successfully, The API does not indicate whether the user
                                                    // reviewed or not, or he/she closed flow yet as android, Thus, no
                                                    // matter the result, we continue our app flow.
                                                })
                                                .catch((error) => {
                                                    //we continue our app flow.
                                                    // we have some error could happen while lanuching InAppReview,
                                                    // Check table for errors and code number that can return in catch.
                                                    console.log(error);
                                                });
                                        }
                                    }else{
                                        let oldDate= JSON.parse(data)
                                        if(Date.now()- oldDate <15*24*60*60*1000){
                                            navigation.navigate('Similar')
                                        }else{
                                            if(InAppReview.isAvailable()){
                                                InAppReview.RequestInAppReview()
                                                    .then((hasFlowFinishedSuccessfully) => {
                                                        // when return true in android it means user finished or close review flow
                                                        console.log('InAppReview in android', hasFlowFinishedSuccessfully);
                                                        navigation.navigate('Similar')
                                                        AsyncStorage.setItem('lastReview',JSON.stringify(Date.now()))

                                                        // when return true in ios it means review flow lanuched to user.
                                                        console.log(
                                                            'InAppReview in ios has launched successfully',
                                                            hasFlowFinishedSuccessfully,
                                                        );

                                                        // 1- you have option to do something ex: (navigate Home page) (in android).
                                                        // 2- you have option to do something,
                                                        // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

                                                        // 3- another option:
                                                        if (hasFlowFinishedSuccessfully) {
                                                            // do something for ios
                                                            // do something for android
                                                        }

                                                        // for android:
                                                        // The flow has finished. The API does not indicate whether the user
                                                        // reviewed or not, or even whether the review dialog was shown. Thus, no
                                                        // matter the result, we continue our app flow.

                                                        // for ios
                                                        // the flow lanuched successfully, The API does not indicate whether the user
                                                        // reviewed or not, or he/she closed flow yet as android, Thus, no
                                                        // matter the result, we continue our app flow.
                                                    })
                                                    .catch((error) => {
                                                        //we continue our app flow.
                                                        // we have some error could happen while lanuching InAppReview,
                                                        // Check table for errors and code number that can return in catch.
                                                        console.log(error);
                                                    });
                                            }
                                        }
                                    }
                                })

                            }else{
                                navigation.navigate('Similar')

                            }
                        }} style={styles.twiceContainers}>
                            {userStore.similars.length>0 ? (
                                <FastImage
                                    onError={e => {
                                        // console.error(e)
                                        MediaLibrary.getAssetInfoAsync(userStore.getAssetId(userStore.similars[0].images[0])).then(data=>{
                                            if(!data){
                                                userStore.catchBlanks(userStore.similars[0].images[0])
                                            }

                                        })
                                    }

                                    }
                                    source={{uri:userStore.changeLink(userStore.similars[0].images[0])}} style={{width:'100%',height:'100%',borderRadius:20}}/>

                            ):(<View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
                                <Spinner size={'small'} color={'blue'}/>
                            </View>)}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            if(userStore.ratingActive){
                                AsyncStorage.getItem('lastReview').then(data=>{
                                    if(!data){
                                        if(InAppReview.isAvailable()){
                                            InAppReview.RequestInAppReview()
                                                .then((hasFlowFinishedSuccessfully) => {
                                                    navigation.navigate('Similar')
                                                    AsyncStorage.setItem('lastReview',JSON.stringify(Date.now()))
                                                    // when return true in android it means user finished or close review flow
                                                    console.log('InAppReview in android', hasFlowFinishedSuccessfully);

                                                    // when return true in ios it means review flow lanuched to user.
                                                    console.log(
                                                        'InAppReview in ios has launched successfully',
                                                        hasFlowFinishedSuccessfully,
                                                    );

                                                    // 1- you have option to do something ex: (navigate Home page) (in android).
                                                    // 2- you have option to do something,
                                                    // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

                                                    // 3- another option:
                                                    if (hasFlowFinishedSuccessfully) {
                                                        // do something for ios
                                                        // do something for android
                                                    }

                                                    // for android:
                                                    // The flow has finished. The API does not indicate whether the user
                                                    // reviewed or not, or even whether the review dialog was shown. Thus, no
                                                    // matter the result, we continue our app flow.

                                                    // for ios
                                                    // the flow lanuched successfully, The API does not indicate whether the user
                                                    // reviewed or not, or he/she closed flow yet as android, Thus, no
                                                    // matter the result, we continue our app flow.
                                                })
                                                .catch((error) => {
                                                    //we continue our app flow.
                                                    // we have some error could happen while lanuching InAppReview,
                                                    // Check table for errors and code number that can return in catch.
                                                    console.log(error);
                                                });
                                        }
                                    }else{
                                        let oldDate= JSON.parse(data)
                                        if(Date.now()- oldDate <15*24*60*60*1000){
                                            navigation.navigate('Similar')
                                        }else{
                                            if(InAppReview.isAvailable()){
                                                InAppReview.RequestInAppReview()
                                                    .then((hasFlowFinishedSuccessfully) => {
                                                        // when return true in android it means user finished or close review flow
                                                        console.log('InAppReview in android', hasFlowFinishedSuccessfully);
                                                        navigation.navigate('Similar')
                                                        AsyncStorage.setItem('lastReview',JSON.stringify(Date.now()))

                                                        // when return true in ios it means review flow lanuched to user.
                                                        console.log(
                                                            'InAppReview in ios has launched successfully',
                                                            hasFlowFinishedSuccessfully,
                                                        );

                                                        // 1- you have option to do something ex: (navigate Home page) (in android).
                                                        // 2- you have option to do something,
                                                        // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

                                                        // 3- another option:
                                                        if (hasFlowFinishedSuccessfully) {
                                                            // do something for ios
                                                            // do something for android
                                                        }

                                                        // for android:
                                                        // The flow has finished. The API does not indicate whether the user
                                                        // reviewed or not, or even whether the review dialog was shown. Thus, no
                                                        // matter the result, we continue our app flow.

                                                        // for ios
                                                        // the flow lanuched successfully, The API does not indicate whether the user
                                                        // reviewed or not, or he/she closed flow yet as android, Thus, no
                                                        // matter the result, we continue our app flow.
                                                    })
                                                    .catch((error) => {
                                                        //we continue our app flow.
                                                        // we have some error could happen while lanuching InAppReview,
                                                        // Check table for errors and code number that can return in catch.
                                                        console.log(error);
                                                    });
                                            }
                                        }
                                    }
                                })

                            }else{
                                navigation.navigate('Similar')

                            }
                        }}  style={styles.twiceContainers}>
                            {userStore.similars.length>0 ? (
                                <FastImage
                                    onError={e => {
                                        // console.error(e)
                                        MediaLibrary.getAssetInfoAsync(userStore.getAssetId(userStore.similars[0].images[1])).then(data=>{
                                            if(!data){
                                                userStore.catchBlanks(userStore.similars[0].images[1])
                                            }

                                        })
                                    }

                                    }
                                    source={{uri:userStore.changeLink(userStore.similars[0].images[1])}} style={{width:'100%',height:'100%',borderRadius:20}}/>

                            ):(<View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
                                <Spinner size={'small'} color={'blue'}/>
                            </View>)}
                        </TouchableOpacity>

                    </View>
                )}



            </View>
                    </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=> {

                        if(userStore.ratingActive){
                            AsyncStorage.getItem('lastReview').then(data=>{
                                if(!data){
                                    if(InAppReview.isAvailable()){
                                        InAppReview.RequestInAppReview()
                                            .then((hasFlowFinishedSuccessfully) => {
                                                navigation.navigate('Duplicated', {page: 'duplicated'})
                                                AsyncStorage.setItem('lastReview',JSON.stringify(Date.now()))
                                                // when return true in android it means user finished or close review flow
                                                console.log('InAppReview in android', hasFlowFinishedSuccessfully);

                                                // when return true in ios it means review flow lanuched to user.
                                                console.log(
                                                    'InAppReview in ios has launched successfully',
                                                    hasFlowFinishedSuccessfully,
                                                );

                                                // 1- you have option to do something ex: (navigate Home page) (in android).
                                                // 2- you have option to do something,
                                                // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

                                                // 3- another option:
                                                if (hasFlowFinishedSuccessfully) {
                                                    // do something for ios
                                                    // do something for android
                                                }

                                                // for android:
                                                // The flow has finished. The API does not indicate whether the user
                                                // reviewed or not, or even whether the review dialog was shown. Thus, no
                                                // matter the result, we continue our app flow.

                                                // for ios
                                                // the flow lanuched successfully, The API does not indicate whether the user
                                                // reviewed or not, or he/she closed flow yet as android, Thus, no
                                                // matter the result, we continue our app flow.
                                            })
                                            .catch((error) => {
                                                //we continue our app flow.
                                                // we have some error could happen while lanuching InAppReview,
                                                // Check table for errors and code number that can return in catch.
                                                console.log(error);
                                            });
                                    }
                                }else{
                                    let oldDate= JSON.parse(data)
                                    if(Date.now()- oldDate <15*24*60*60*1000){
                                        navigation.navigate('Duplicated', {page: 'duplicated'})
                                    }else{
                                        if(InAppReview.isAvailable()){
                                            InAppReview.RequestInAppReview()
                                                .then((hasFlowFinishedSuccessfully) => {
                                                    // when return true in android it means user finished or close review flow
                                                    console.log('InAppReview in android', hasFlowFinishedSuccessfully);
                                                    navigation.navigate('Duplicated', {page: 'duplicated'})
                                                    AsyncStorage.setItem('lastReview',JSON.stringify(Date.now()))

                                                    // when return true in ios it means review flow lanuched to user.
                                                    console.log(
                                                        'InAppReview in ios has launched successfully',
                                                        hasFlowFinishedSuccessfully,
                                                    );

                                                    // 1- you have option to do something ex: (navigate Home page) (in android).
                                                    // 2- you have option to do something,
                                                    // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

                                                    // 3- another option:
                                                    if (hasFlowFinishedSuccessfully) {
                                                        // do something for ios
                                                        // do something for android
                                                    }

                                                    // for android:
                                                    // The flow has finished. The API does not indicate whether the user
                                                    // reviewed or not, or even whether the review dialog was shown. Thus, no
                                                    // matter the result, we continue our app flow.

                                                    // for ios
                                                    // the flow lanuched successfully, The API does not indicate whether the user
                                                    // reviewed or not, or he/she closed flow yet as android, Thus, no
                                                    // matter the result, we continue our app flow.
                                                })
                                                .catch((error) => {
                                                    //we continue our app flow.
                                                    // we have some error could happen while lanuching InAppReview,
                                                    // Check table for errors and code number that can return in catch.
                                                    console.log(error);
                                                });
                                        }
                                    }
                                }
                            })
                        }else{
                            navigation.navigate('Duplicated', {page: 'duplicated'})
                        }
                    }}>
                    <View >


                        <View style={[styles.menuItemContainer,{backgroundColor:'#BEFFEF'}]}>
                            <View style={[styles.menuInsideContainer,{backgroundColor:'#3EC78E'}]}>
                <View style={styles.menuLeftContainer}>


                    <View style={styles.menuIconPadding}>

                        <FastImage style={styles.menuIcon} source={userStore.theme == 'dark' ? require('../../../assets/recurringgreen.png') :require('../../../assets/recurringgreen.png')} resizeMode={'contain'}/>
                    </View>
                    <Text style={[styles.menuText,{color:'white'}]}>{I18n.t('duplicated')}</Text>

                </View>
                <View style={styles.menuRightContainer}>

                    <View style={{marginRight:5}}>

                        <Text style={styles.menuRightText}>{userStore.sameTotal} {I18n.t('photo')}</Text>
                        <Text style={styles.menuRightBottomText}>({userStore.formatBytes((userStore.sameTotal)*1500000)})</Text>
                    </View>
                    <View style={{borderRadius:50,backgroundColor:'white',padding:5,marginLeft:5,justifyContent:'center',alignItems:'center'}}>

                        <FastImage style={styles.menuRightIcon} source={require('../../../assets/rightarrowgreen.png')} resizeMode={'contain'}/>
                    </View>

                </View>
                </View>

                {userStore.same.length>0 && (
                    <View style={{flexDirection:'row',width:'105%',justifyContent:'space-between'}}>
                        <TouchableOpacity onPress={()=> {

                            if(userStore.ratingActive){
                                AsyncStorage.getItem('lastReview').then(data=>{
                                    if(!data){
                                        if(InAppReview.isAvailable()){
                                            InAppReview.RequestInAppReview()
                                                .then((hasFlowFinishedSuccessfully) => {
                                                    navigation.navigate('Duplicated', {page: 'duplicated'})
                                                    AsyncStorage.setItem('lastReview',JSON.stringify(Date.now()))
                                                    // when return true in android it means user finished or close review flow
                                                    console.log('InAppReview in android', hasFlowFinishedSuccessfully);

                                                    // when return true in ios it means review flow lanuched to user.
                                                    console.log(
                                                        'InAppReview in ios has launched successfully',
                                                        hasFlowFinishedSuccessfully,
                                                    );

                                                    // 1- you have option to do something ex: (navigate Home page) (in android).
                                                    // 2- you have option to do something,
                                                    // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

                                                    // 3- another option:
                                                    if (hasFlowFinishedSuccessfully) {
                                                        // do something for ios
                                                        // do something for android
                                                    }

                                                    // for android:
                                                    // The flow has finished. The API does not indicate whether the user
                                                    // reviewed or not, or even whether the review dialog was shown. Thus, no
                                                    // matter the result, we continue our app flow.

                                                    // for ios
                                                    // the flow lanuched successfully, The API does not indicate whether the user
                                                    // reviewed or not, or he/she closed flow yet as android, Thus, no
                                                    // matter the result, we continue our app flow.
                                                })
                                                .catch((error) => {
                                                    //we continue our app flow.
                                                    // we have some error could happen while lanuching InAppReview,
                                                    // Check table for errors and code number that can return in catch.
                                                    console.log(error);
                                                });
                                        }
                                    }else{
                                        let oldDate= JSON.parse(data)
                                        if(Date.now()- oldDate <15*24*60*60*1000){
                                            navigation.navigate('Duplicated', {page: 'duplicated'})
                                        }else{
                                            if(InAppReview.isAvailable()){
                                                InAppReview.RequestInAppReview()
                                                    .then((hasFlowFinishedSuccessfully) => {
                                                        // when return true in android it means user finished or close review flow
                                                        console.log('InAppReview in android', hasFlowFinishedSuccessfully);
                                                        navigation.navigate('Duplicated', {page: 'duplicated'})
                                                        AsyncStorage.setItem('lastReview',JSON.stringify(Date.now()))

                                                        // when return true in ios it means review flow lanuched to user.
                                                        console.log(
                                                            'InAppReview in ios has launched successfully',
                                                            hasFlowFinishedSuccessfully,
                                                        );

                                                        // 1- you have option to do something ex: (navigate Home page) (in android).
                                                        // 2- you have option to do something,
                                                        // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

                                                        // 3- another option:
                                                        if (hasFlowFinishedSuccessfully) {
                                                            // do something for ios
                                                            // do something for android
                                                        }

                                                        // for android:
                                                        // The flow has finished. The API does not indicate whether the user
                                                        // reviewed or not, or even whether the review dialog was shown. Thus, no
                                                        // matter the result, we continue our app flow.

                                                        // for ios
                                                        // the flow lanuched successfully, The API does not indicate whether the user
                                                        // reviewed or not, or he/she closed flow yet as android, Thus, no
                                                        // matter the result, we continue our app flow.
                                                    })
                                                    .catch((error) => {
                                                        //we continue our app flow.
                                                        // we have some error could happen while lanuching InAppReview,
                                                        // Check table for errors and code number that can return in catch.
                                                        console.log(error);
                                                    });
                                            }
                                        }
                                    }
                                })
                            }else{
                                navigation.navigate('Duplicated', {page: 'duplicated'})
                            }
                        }} style={styles.twiceContainers}>
                            {userStore.same.length>0 ? (
                                <FastImage
                                    onError={e => {
                                        // console.error(e)
                                        MediaLibrary.getAssetInfoAsync(userStore.getAssetId(userStore.same[0].images[0])).then(data=>{
                                            if(!data){
                                                userStore.catchBlanks(userStore.same[0].images[0])
                                            }

                                        })
                                    }

                                    }
                                    source={{uri:userStore.changeLink(userStore.same[0].images[0])}} style={{width:'100%',height:'100%',borderRadius:20}}/>

                            ):(<View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
                                <Spinner size={'small'} color={'blue'}/>
                            </View>)}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> {

                            if(userStore.ratingActive){
                                AsyncStorage.getItem('lastReview').then(data=>{
                                    if(!data){
                                        if(InAppReview.isAvailable()){
                                            InAppReview.RequestInAppReview()
                                                .then((hasFlowFinishedSuccessfully) => {
                                                    navigation.navigate('Duplicated', {page: 'duplicated'})
                                                    AsyncStorage.setItem('lastReview',JSON.stringify(Date.now()))
                                                    // when return true in android it means user finished or close review flow
                                                    console.log('InAppReview in android', hasFlowFinishedSuccessfully);

                                                    // when return true in ios it means review flow lanuched to user.
                                                    console.log(
                                                        'InAppReview in ios has launched successfully',
                                                        hasFlowFinishedSuccessfully,
                                                    );

                                                    // 1- you have option to do something ex: (navigate Home page) (in android).
                                                    // 2- you have option to do something,
                                                    // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

                                                    // 3- another option:
                                                    if (hasFlowFinishedSuccessfully) {
                                                        // do something for ios
                                                        // do something for android
                                                    }

                                                    // for android:
                                                    // The flow has finished. The API does not indicate whether the user
                                                    // reviewed or not, or even whether the review dialog was shown. Thus, no
                                                    // matter the result, we continue our app flow.

                                                    // for ios
                                                    // the flow lanuched successfully, The API does not indicate whether the user
                                                    // reviewed or not, or he/she closed flow yet as android, Thus, no
                                                    // matter the result, we continue our app flow.
                                                })
                                                .catch((error) => {
                                                    //we continue our app flow.
                                                    // we have some error could happen while lanuching InAppReview,
                                                    // Check table for errors and code number that can return in catch.
                                                    console.log(error);
                                                });
                                        }
                                    }else{
                                        let oldDate= JSON.parse(data)
                                        if(Date.now()- oldDate <15*24*60*60*1000){
                                            navigation.navigate('Duplicated', {page: 'duplicated'})
                                        }else{
                                            if(InAppReview.isAvailable()){
                                                InAppReview.RequestInAppReview()
                                                    .then((hasFlowFinishedSuccessfully) => {
                                                        // when return true in android it means user finished or close review flow
                                                        console.log('InAppReview in android', hasFlowFinishedSuccessfully);
                                                        navigation.navigate('Duplicated', {page: 'duplicated'})
                                                        AsyncStorage.setItem('lastReview',JSON.stringify(Date.now()))

                                                        // when return true in ios it means review flow lanuched to user.
                                                        console.log(
                                                            'InAppReview in ios has launched successfully',
                                                            hasFlowFinishedSuccessfully,
                                                        );

                                                        // 1- you have option to do something ex: (navigate Home page) (in android).
                                                        // 2- you have option to do something,
                                                        // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

                                                        // 3- another option:
                                                        if (hasFlowFinishedSuccessfully) {
                                                            // do something for ios
                                                            // do something for android
                                                        }

                                                        // for android:
                                                        // The flow has finished. The API does not indicate whether the user
                                                        // reviewed or not, or even whether the review dialog was shown. Thus, no
                                                        // matter the result, we continue our app flow.

                                                        // for ios
                                                        // the flow lanuched successfully, The API does not indicate whether the user
                                                        // reviewed or not, or he/she closed flow yet as android, Thus, no
                                                        // matter the result, we continue our app flow.
                                                    })
                                                    .catch((error) => {
                                                        //we continue our app flow.
                                                        // we have some error could happen while lanuching InAppReview,
                                                        // Check table for errors and code number that can return in catch.
                                                        console.log(error);
                                                    });
                                            }
                                        }
                                    }
                                })
                            }else{
                                navigation.navigate('Duplicated', {page: 'duplicated'})
                            }
                        }} style={styles.twiceContainers}>
                            {userStore.same.length>0 ? (
                                <FastImage
                                    onError={e => {
                                        // console.error(e)
                                        MediaLibrary.getAssetInfoAsync(userStore.getAssetId(userStore.same[0].images[1])).then(data=>{
                                            if(!data){
                                                userStore.catchBlanks(userStore.same[0].images[1])
                                            }

                                        })
                                    }

                                    }
                                    source={{uri:userStore.changeLink(userStore.same[0].images[1])}} style={{width:'100%',height:'100%',borderRadius:20}}/>

                            ):(<View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
                                <Spinner size={'small'} color={'blue'}/>
                            </View>)}
                        </TouchableOpacity>
                    </View>

                )}



            </View>
                    </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={()=> {
                        if(userStore.ratingActive){
                            AsyncStorage.getItem('lastReview').then(data=>{
                                if(!data){
                                    if(InAppReview.isAvailable()){
                                        InAppReview.RequestInAppReview()
                                            .then((hasFlowFinishedSuccessfully) => {
                                                navigation.navigate('Video')
                                                AsyncStorage.setItem('lastReview',JSON.stringify(Date.now()))
                                                // when return true in android it means user finished or close review flow
                                                console.log('InAppReview in android', hasFlowFinishedSuccessfully);

                                                // when return true in ios it means review flow lanuched to user.
                                                console.log(
                                                    'InAppReview in ios has launched successfully',
                                                    hasFlowFinishedSuccessfully,
                                                );

                                                // 1- you have option to do something ex: (navigate Home page) (in android).
                                                // 2- you have option to do something,
                                                // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

                                                // 3- another option:
                                                if (hasFlowFinishedSuccessfully) {
                                                    // do something for ios
                                                    // do something for android
                                                }

                                                // for android:
                                                // The flow has finished. The API does not indicate whether the user
                                                // reviewed or not, or even whether the review dialog was shown. Thus, no
                                                // matter the result, we continue our app flow.

                                                // for ios
                                                // the flow lanuched successfully, The API does not indicate whether the user
                                                // reviewed or not, or he/she closed flow yet as android, Thus, no
                                                // matter the result, we continue our app flow.
                                            })
                                            .catch((error) => {
                                                //we continue our app flow.
                                                // we have some error could happen while lanuching InAppReview,
                                                // Check table for errors and code number that can return in catch.
                                                console.log(error);
                                            });
                                    }
                                }else{
                                    let oldDate= JSON.parse(data)
                                    if(Date.now()- oldDate <15*24*60*60*1000){
                                        navigation.navigate('Video')

                                    }else{
                                        if(InAppReview.isAvailable()){
                                            InAppReview.RequestInAppReview()
                                                .then((hasFlowFinishedSuccessfully) => {
                                                    // when return true in android it means user finished or close review flow
                                                    console.log('InAppReview in android', hasFlowFinishedSuccessfully);
                                                    navigation.navigate('Video')

                                                    AsyncStorage.setItem('lastReview',JSON.stringify(Date.now()))

                                                    // when return true in ios it means review flow lanuched to user.
                                                    console.log(
                                                        'InAppReview in ios has launched successfully',
                                                        hasFlowFinishedSuccessfully,
                                                    );

                                                    // 1- you have option to do something ex: (navigate Home page) (in android).
                                                    // 2- you have option to do something,
                                                    // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

                                                    // 3- another option:
                                                    if (hasFlowFinishedSuccessfully) {
                                                        // do something for ios
                                                        // do something for android
                                                    }

                                                    // for android:
                                                    // The flow has finished. The API does not indicate whether the user
                                                    // reviewed or not, or even whether the review dialog was shown. Thus, no
                                                    // matter the result, we continue our app flow.

                                                    // for ios
                                                    // the flow lanuched successfully, The API does not indicate whether the user
                                                    // reviewed or not, or he/she closed flow yet as android, Thus, no
                                                    // matter the result, we continue our app flow.
                                                })
                                                .catch((error) => {
                                                    //we continue our app flow.
                                                    // we have some error could happen while lanuching InAppReview,
                                                    // Check table for errors and code number that can return in catch.
                                                    console.log(error);
                                                });
                                        }
                                    }
                                }
                            })
                        }else{
                            navigation.navigate('Video')
                        }

                    }}>
                        <View style={[styles.menuItemContainer,{backgroundColor:'#FCE2AF'}]}>
                            <View style={[styles.menuInsideContainer,{backgroundColor:'#F9BE5D'}]}>
                <View style={styles.menuLeftContainer}>
                    <View style={styles.menuIconPadding}>

                        <FastImage style={styles.menuIcon} source={userStore.theme == 'dark' ? require('../../../assets/videorange.png') :require('../../../assets/videorange.png')} resizeMode={'contain'}/>
                    </View>
                    <Text style={[styles.menuText,{color:'white'}]}>{I18n.t('videos')}</Text>

                </View>
                <View style={styles.menuRightContainer}>


                    <View style={{marginRight:5}}>

                        <Text style={styles.menuRightText}>{userStore.allVideos ? userStore.allVideos.length:0} {I18n.t('video')}</Text>
                        <Text style={styles.menuRightBottomText}>({userStore.formatBytes(userStore.videosSize)})</Text>
                    </View>
                    <View style={{borderRadius:50,backgroundColor:'white',padding:5,marginLeft:5,justifyContent:'center',alignItems:'center'}}>

                        <FastImage style={styles.menuRightIcon} source={require('../../../assets/rightarroworange.png')} resizeMode={'contain'}/>
                    </View>

                </View>

                </View>
                {userStore.allVideos.length>0 && (
                    <View style={{flexDirection:'row',width:'105%',justifyContent:'space-between'}}>
                        <TouchableOpacity onPress={()=> {
                            if(userStore.ratingActive){
                                AsyncStorage.getItem('lastReview').then(data=>{
                                    if(!data){
                                        if(InAppReview.isAvailable()){
                                            InAppReview.RequestInAppReview()
                                                .then((hasFlowFinishedSuccessfully) => {
                                                    navigation.navigate('Video')
                                                    AsyncStorage.setItem('lastReview',JSON.stringify(Date.now()))
                                                    // when return true in android it means user finished or close review flow
                                                    console.log('InAppReview in android', hasFlowFinishedSuccessfully);

                                                    // when return true in ios it means review flow lanuched to user.
                                                    console.log(
                                                        'InAppReview in ios has launched successfully',
                                                        hasFlowFinishedSuccessfully,
                                                    );

                                                    // 1- you have option to do something ex: (navigate Home page) (in android).
                                                    // 2- you have option to do something,
                                                    // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

                                                    // 3- another option:
                                                    if (hasFlowFinishedSuccessfully) {
                                                        // do something for ios
                                                        // do something for android
                                                    }

                                                    // for android:
                                                    // The flow has finished. The API does not indicate whether the user
                                                    // reviewed or not, or even whether the review dialog was shown. Thus, no
                                                    // matter the result, we continue our app flow.

                                                    // for ios
                                                    // the flow lanuched successfully, The API does not indicate whether the user
                                                    // reviewed or not, or he/she closed flow yet as android, Thus, no
                                                    // matter the result, we continue our app flow.
                                                })
                                                .catch((error) => {
                                                    //we continue our app flow.
                                                    // we have some error could happen while lanuching InAppReview,
                                                    // Check table for errors and code number that can return in catch.
                                                    console.log(error);
                                                });
                                        }
                                    }else{
                                        let oldDate= JSON.parse(data)
                                        if(Date.now()- oldDate <15*24*60*60*1000){
                                            navigation.navigate('Video')

                                        }else{
                                            if(InAppReview.isAvailable()){
                                                InAppReview.RequestInAppReview()
                                                    .then((hasFlowFinishedSuccessfully) => {
                                                        // when return true in android it means user finished or close review flow
                                                        console.log('InAppReview in android', hasFlowFinishedSuccessfully);
                                                        navigation.navigate('Video')

                                                        AsyncStorage.setItem('lastReview',JSON.stringify(Date.now()))

                                                        // when return true in ios it means review flow lanuched to user.
                                                        console.log(
                                                            'InAppReview in ios has launched successfully',
                                                            hasFlowFinishedSuccessfully,
                                                        );

                                                        // 1- you have option to do something ex: (navigate Home page) (in android).
                                                        // 2- you have option to do something,
                                                        // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

                                                        // 3- another option:
                                                        if (hasFlowFinishedSuccessfully) {
                                                            // do something for ios
                                                            // do something for android
                                                        }

                                                        // for android:
                                                        // The flow has finished. The API does not indicate whether the user
                                                        // reviewed or not, or even whether the review dialog was shown. Thus, no
                                                        // matter the result, we continue our app flow.

                                                        // for ios
                                                        // the flow lanuched successfully, The API does not indicate whether the user
                                                        // reviewed or not, or he/she closed flow yet as android, Thus, no
                                                        // matter the result, we continue our app flow.
                                                    })
                                                    .catch((error) => {
                                                        //we continue our app flow.
                                                        // we have some error could happen while lanuching InAppReview,
                                                        // Check table for errors and code number that can return in catch.
                                                        console.log(error);
                                                    });
                                            }
                                        }
                                    }
                                })
                            }else{
                                navigation.navigate('Video')
                            }

                        }} style={styles.twiceContainers}>
                            {userStore.allVideos.length>0 ? (

                                    // <VideoPlayer source={userStore.allVideos[0]}/>

                                <FastImage
                                    onError={e => {
                                        // console.error(e)
                                        MediaLibrary.getAssetInfoAsync(userStore.getAssetId(userStore.allVideos[0].node.image.uri)).then(data=>{
                                            if(!data){
                                                userStore.catchBlanks(userStore.allVideos[0].node.image.uri)
                                            }

                                        })
                                    }

                                    }
                                    source={{uri:userStore.changeLink(userStore.allVideos[0].node.image.uri)}} style={{width:'100%',height:'100%',borderRadius:20}}/>

                            ):(<View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
                                <Spinner size={'small'} color={'blue'}/>
                            </View>)}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> {
                            if(userStore.ratingActive){
                                AsyncStorage.getItem('lastReview').then(data=>{
                                    if(!data){
                                        if(InAppReview.isAvailable()){
                                            InAppReview.RequestInAppReview()
                                                .then((hasFlowFinishedSuccessfully) => {
                                                    navigation.navigate('Video')
                                                    AsyncStorage.setItem('lastReview',JSON.stringify(Date.now()))
                                                    // when return true in android it means user finished or close review flow
                                                    console.log('InAppReview in android', hasFlowFinishedSuccessfully);

                                                    // when return true in ios it means review flow lanuched to user.
                                                    console.log(
                                                        'InAppReview in ios has launched successfully',
                                                        hasFlowFinishedSuccessfully,
                                                    );

                                                    // 1- you have option to do something ex: (navigate Home page) (in android).
                                                    // 2- you have option to do something,
                                                    // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

                                                    // 3- another option:
                                                    if (hasFlowFinishedSuccessfully) {
                                                        // do something for ios
                                                        // do something for android
                                                    }

                                                    // for android:
                                                    // The flow has finished. The API does not indicate whether the user
                                                    // reviewed or not, or even whether the review dialog was shown. Thus, no
                                                    // matter the result, we continue our app flow.

                                                    // for ios
                                                    // the flow lanuched successfully, The API does not indicate whether the user
                                                    // reviewed or not, or he/she closed flow yet as android, Thus, no
                                                    // matter the result, we continue our app flow.
                                                })
                                                .catch((error) => {
                                                    //we continue our app flow.
                                                    // we have some error could happen while lanuching InAppReview,
                                                    // Check table for errors and code number that can return in catch.
                                                    console.log(error);
                                                });
                                        }
                                    }else{
                                        let oldDate= JSON.parse(data)
                                        if(Date.now()- oldDate <15*24*60*60*1000){
                                            navigation.navigate('Video')

                                        }else{
                                            if(InAppReview.isAvailable()){
                                                InAppReview.RequestInAppReview()
                                                    .then((hasFlowFinishedSuccessfully) => {
                                                        // when return true in android it means user finished or close review flow
                                                        console.log('InAppReview in android', hasFlowFinishedSuccessfully);
                                                        navigation.navigate('Video')

                                                        AsyncStorage.setItem('lastReview',JSON.stringify(Date.now()))

                                                        // when return true in ios it means review flow lanuched to user.
                                                        console.log(
                                                            'InAppReview in ios has launched successfully',
                                                            hasFlowFinishedSuccessfully,
                                                        );

                                                        // 1- you have option to do something ex: (navigate Home page) (in android).
                                                        // 2- you have option to do something,
                                                        // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

                                                        // 3- another option:
                                                        if (hasFlowFinishedSuccessfully) {
                                                            // do something for ios
                                                            // do something for android
                                                        }

                                                        // for android:
                                                        // The flow has finished. The API does not indicate whether the user
                                                        // reviewed or not, or even whether the review dialog was shown. Thus, no
                                                        // matter the result, we continue our app flow.

                                                        // for ios
                                                        // the flow lanuched successfully, The API does not indicate whether the user
                                                        // reviewed or not, or he/she closed flow yet as android, Thus, no
                                                        // matter the result, we continue our app flow.
                                                    })
                                                    .catch((error) => {
                                                        //we continue our app flow.
                                                        // we have some error could happen while lanuching InAppReview,
                                                        // Check table for errors and code number that can return in catch.
                                                        console.log(error);
                                                    });
                                            }
                                        }
                                    }
                                })
                            }else{
                                navigation.navigate('Video')
                            }

                        }} style={styles.twiceContainers}>
                            {userStore.allVideos.length>1 ? (
                                // <VideoPlayer source={userStore.allVideos[1]}/>

                                <FastImage
                                    onError={e => {
                                        // console.error(e)
                                        MediaLibrary.getAssetInfoAsync(userStore.getAssetId(userStore.allVideos[1].node.image.uri)).then(data=>{
                                            if(!data){
                                                userStore.catchBlanks(userStore.allVideos[1].node.image.uri)
                                            }

                                        })
                                    }

                                    }
                                    source={{uri:userStore.changeLink(userStore.allVideos[1].node.image.uri)}} style={{width:'100%',height:'100%',borderRadius:20}}/>

                            ):(<View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
                                <Spinner size={'small'} color={'blue'}/>
                            </View>)}
                        </TouchableOpacity>
                    </View>
                )}





            </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=> {
                        if(userStore.ratingActive){
                            AsyncStorage.getItem('lastReview').then(data=>{
                                if(!data){
                                    if(InAppReview.isAvailable()){
                                        InAppReview.RequestInAppReview()
                                            .then((hasFlowFinishedSuccessfully) => {
                                                navigation.navigate('ScreenShot')

                                                AsyncStorage.setItem('lastReview',JSON.stringify(Date.now()))
                                                // when return true in android it means user finished or close review flow
                                                console.log('InAppReview in android', hasFlowFinishedSuccessfully);

                                                // when return true in ios it means review flow lanuched to user.
                                                console.log(
                                                    'InAppReview in ios has launched successfully',
                                                    hasFlowFinishedSuccessfully,
                                                );

                                                // 1- you have option to do something ex: (navigate Home page) (in android).
                                                // 2- you have option to do something,
                                                // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

                                                // 3- another option:
                                                if (hasFlowFinishedSuccessfully) {
                                                    // do something for ios
                                                    // do something for android
                                                }

                                                // for android:
                                                // The flow has finished. The API does not indicate whether the user
                                                // reviewed or not, or even whether the review dialog was shown. Thus, no
                                                // matter the result, we continue our app flow.

                                                // for ios
                                                // the flow lanuched successfully, The API does not indicate whether the user
                                                // reviewed or not, or he/she closed flow yet as android, Thus, no
                                                // matter the result, we continue our app flow.
                                            })
                                            .catch((error) => {
                                                //we continue our app flow.
                                                // we have some error could happen while lanuching InAppReview,
                                                // Check table for errors and code number that can return in catch.
                                                console.log(error);
                                            });
                                    }
                                }else{
                                    let oldDate= JSON.parse(data)
                                    if(Date.now()- oldDate <15*24*60*60*1000){
                                        navigation.navigate('ScreenShot')


                                    }else{
                                        if(InAppReview.isAvailable()){
                                            InAppReview.RequestInAppReview()
                                                .then((hasFlowFinishedSuccessfully) => {
                                                    // when return true in android it means user finished or close review flow
                                                    console.log('InAppReview in android', hasFlowFinishedSuccessfully);
                                                    navigation.navigate('ScreenShot')


                                                    AsyncStorage.setItem('lastReview',JSON.stringify(Date.now()))

                                                    // when return true in ios it means review flow lanuched to user.
                                                    console.log(
                                                        'InAppReview in ios has launched successfully',
                                                        hasFlowFinishedSuccessfully,
                                                    );

                                                    // 1- you have option to do something ex: (navigate Home page) (in android).
                                                    // 2- you have option to do something,
                                                    // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

                                                    // 3- another option:
                                                    if (hasFlowFinishedSuccessfully) {
                                                        // do something for ios
                                                        // do something for android
                                                    }

                                                    // for android:
                                                    // The flow has finished. The API does not indicate whether the user
                                                    // reviewed or not, or even whether the review dialog was shown. Thus, no
                                                    // matter the result, we continue our app flow.

                                                    // for ios
                                                    // the flow lanuched successfully, The API does not indicate whether the user
                                                    // reviewed or not, or he/she closed flow yet as android, Thus, no
                                                    // matter the result, we continue our app flow.
                                                })
                                                .catch((error) => {
                                                    //we continue our app flow.
                                                    // we have some error could happen while lanuching InAppReview,
                                                    // Check table for errors and code number that can return in catch.
                                                    console.log(error);
                                                });
                                        }
                                    }
                                }
                            })

                        }else{
                            navigation.navigate('ScreenShot')

                        }

                    }}>

                        <View style={[styles.menuItemContainer,{backgroundColor:'#FABAAF'}]}>
                            <View style={[styles.menuInsideContainer,{backgroundColor:'#F55A59'}]}>
                <View style={styles.menuLeftContainer}>
                    <View style={styles.menuIconPadding}>

                        <FastImage style={styles.menuIcon} source={userStore.theme == 'dark' ? require('../../../assets/screenred.png') :require('../../../assets/screenred.png')} resizeMode={'contain'}/>
                    </View>
                    <Text style={[styles.menuText,{color:'white'}]}>{I18n.t('screenshots')}</Text>

                </View>
                <View style={styles.menuRightContainer}>
                    <View style={{marginRight:5}}>

                        <Text style={styles.menuRightText}>{userStore.ekransTotal} {I18n.t('photo')}</Text>



                        <Text style={styles.menuRightBottomText}>({userStore.formatBytes((userStore.ekransTotal)*1500000)})</Text>
                    </View>
                    <View style={{borderRadius:50,backgroundColor:'white',padding:5,marginLeft:5,justifyContent:'center',alignItems:'center'}}>

                        <FastImage style={styles.menuRightIcon} source={require('../../../assets/rightarrowred.png')} resizeMode={'contain'}/>
                    </View>

                </View>
                </View>

                {userStore.ekrans.length>0 && (
                    <View style={{flexDirection:'row',width:'105%',justifyContent:'space-between'}}>
                        <TouchableOpacity onPress={()=> {
                            if(userStore.ratingActive){
                                AsyncStorage.getItem('lastReview').then(data=>{
                                    if(!data){
                                        if(InAppReview.isAvailable()){
                                            InAppReview.RequestInAppReview()
                                                .then((hasFlowFinishedSuccessfully) => {
                                                    navigation.navigate('ScreenShot')

                                                    AsyncStorage.setItem('lastReview',JSON.stringify(Date.now()))
                                                    // when return true in android it means user finished or close review flow
                                                    console.log('InAppReview in android', hasFlowFinishedSuccessfully);

                                                    // when return true in ios it means review flow lanuched to user.
                                                    console.log(
                                                        'InAppReview in ios has launched successfully',
                                                        hasFlowFinishedSuccessfully,
                                                    );

                                                    // 1- you have option to do something ex: (navigate Home page) (in android).
                                                    // 2- you have option to do something,
                                                    // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

                                                    // 3- another option:
                                                    if (hasFlowFinishedSuccessfully) {
                                                        // do something for ios
                                                        // do something for android
                                                    }

                                                    // for android:
                                                    // The flow has finished. The API does not indicate whether the user
                                                    // reviewed or not, or even whether the review dialog was shown. Thus, no
                                                    // matter the result, we continue our app flow.

                                                    // for ios
                                                    // the flow lanuched successfully, The API does not indicate whether the user
                                                    // reviewed or not, or he/she closed flow yet as android, Thus, no
                                                    // matter the result, we continue our app flow.
                                                })
                                                .catch((error) => {
                                                    //we continue our app flow.
                                                    // we have some error could happen while lanuching InAppReview,
                                                    // Check table for errors and code number that can return in catch.
                                                    console.log(error);
                                                });
                                        }
                                    }else{
                                        let oldDate= JSON.parse(data)
                                        if(Date.now()- oldDate <15*24*60*60*1000){
                                            navigation.navigate('ScreenShot')


                                        }else{
                                            if(InAppReview.isAvailable()){
                                                InAppReview.RequestInAppReview()
                                                    .then((hasFlowFinishedSuccessfully) => {
                                                        // when return true in android it means user finished or close review flow
                                                        console.log('InAppReview in android', hasFlowFinishedSuccessfully);
                                                        navigation.navigate('ScreenShot')


                                                        AsyncStorage.setItem('lastReview',JSON.stringify(Date.now()))

                                                        // when return true in ios it means review flow lanuched to user.
                                                        console.log(
                                                            'InAppReview in ios has launched successfully',
                                                            hasFlowFinishedSuccessfully,
                                                        );

                                                        // 1- you have option to do something ex: (navigate Home page) (in android).
                                                        // 2- you have option to do something,
                                                        // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

                                                        // 3- another option:
                                                        if (hasFlowFinishedSuccessfully) {
                                                            // do something for ios
                                                            // do something for android
                                                        }

                                                        // for android:
                                                        // The flow has finished. The API does not indicate whether the user
                                                        // reviewed or not, or even whether the review dialog was shown. Thus, no
                                                        // matter the result, we continue our app flow.

                                                        // for ios
                                                        // the flow lanuched successfully, The API does not indicate whether the user
                                                        // reviewed or not, or he/she closed flow yet as android, Thus, no
                                                        // matter the result, we continue our app flow.
                                                    })
                                                    .catch((error) => {
                                                        //we continue our app flow.
                                                        // we have some error could happen while lanuching InAppReview,
                                                        // Check table for errors and code number that can return in catch.
                                                        console.log(error);
                                                    });
                                            }
                                        }
                                    }
                                })

                            }else{
                                navigation.navigate('ScreenShot')

                            }

                        }} style={styles.twiceContainers}>
                            {userStore.ekrans.length>0 ? (
                                <FastImage
                                    onError={e => {
                                        // console.error(e)
                                        MediaLibrary.getAssetInfoAsync(userStore.getAssetId(userStore.ekrans[0].images[0])).then(data=>{
                                            if(!data){
                                                userStore.catchBlanks(userStore.ekrans[0].images[0])
                                            }

                                        })
                                    }

                                    }
                                    source={{uri:userStore.changeLink(userStore.ekrans[0].images[0])}} style={{width:'100%',height:'100%',borderRadius:20}}/>

                            ):(<View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
                                <Spinner size={'small'} color={'blue'}/>
                            </View>)}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> {
                            if(userStore.ratingActive){
                                AsyncStorage.getItem('lastReview').then(data=>{
                                    if(!data){
                                        if(InAppReview.isAvailable()){
                                            InAppReview.RequestInAppReview()
                                                .then((hasFlowFinishedSuccessfully) => {
                                                    navigation.navigate('ScreenShot')

                                                    AsyncStorage.setItem('lastReview',JSON.stringify(Date.now()))
                                                    // when return true in android it means user finished or close review flow
                                                    console.log('InAppReview in android', hasFlowFinishedSuccessfully);

                                                    // when return true in ios it means review flow lanuched to user.
                                                    console.log(
                                                        'InAppReview in ios has launched successfully',
                                                        hasFlowFinishedSuccessfully,
                                                    );

                                                    // 1- you have option to do something ex: (navigate Home page) (in android).
                                                    // 2- you have option to do something,
                                                    // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

                                                    // 3- another option:
                                                    if (hasFlowFinishedSuccessfully) {
                                                        // do something for ios
                                                        // do something for android
                                                    }

                                                    // for android:
                                                    // The flow has finished. The API does not indicate whether the user
                                                    // reviewed or not, or even whether the review dialog was shown. Thus, no
                                                    // matter the result, we continue our app flow.

                                                    // for ios
                                                    // the flow lanuched successfully, The API does not indicate whether the user
                                                    // reviewed or not, or he/she closed flow yet as android, Thus, no
                                                    // matter the result, we continue our app flow.
                                                })
                                                .catch((error) => {
                                                    //we continue our app flow.
                                                    // we have some error could happen while lanuching InAppReview,
                                                    // Check table for errors and code number that can return in catch.
                                                    console.log(error);
                                                });
                                        }
                                    }else{
                                        let oldDate= JSON.parse(data)
                                        if(Date.now()- oldDate <15*24*60*60*1000){
                                            navigation.navigate('ScreenShot')


                                        }else{
                                            if(InAppReview.isAvailable()){
                                                InAppReview.RequestInAppReview()
                                                    .then((hasFlowFinishedSuccessfully) => {
                                                        // when return true in android it means user finished or close review flow
                                                        console.log('InAppReview in android', hasFlowFinishedSuccessfully);
                                                        navigation.navigate('ScreenShot')


                                                        AsyncStorage.setItem('lastReview',JSON.stringify(Date.now()))

                                                        // when return true in ios it means review flow lanuched to user.
                                                        console.log(
                                                            'InAppReview in ios has launched successfully',
                                                            hasFlowFinishedSuccessfully,
                                                        );

                                                        // 1- you have option to do something ex: (navigate Home page) (in android).
                                                        // 2- you have option to do something,
                                                        // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

                                                        // 3- another option:
                                                        if (hasFlowFinishedSuccessfully) {
                                                            // do something for ios
                                                            // do something for android
                                                        }

                                                        // for android:
                                                        // The flow has finished. The API does not indicate whether the user
                                                        // reviewed or not, or even whether the review dialog was shown. Thus, no
                                                        // matter the result, we continue our app flow.

                                                        // for ios
                                                        // the flow lanuched successfully, The API does not indicate whether the user
                                                        // reviewed or not, or he/she closed flow yet as android, Thus, no
                                                        // matter the result, we continue our app flow.
                                                    })
                                                    .catch((error) => {
                                                        //we continue our app flow.
                                                        // we have some error could happen while lanuching InAppReview,
                                                        // Check table for errors and code number that can return in catch.
                                                        console.log(error);
                                                    });
                                            }
                                        }
                                    }
                                })

                            }else{
                                navigation.navigate('ScreenShot')

                            }

                        }} style={styles.twiceContainers}>
                            {userStore.ekrans.length>0 ? (
                                <FastImage
                                    onError={e => {
                                        // console.error(e)
                                        MediaLibrary.getAssetInfoAsync(userStore.getAssetId(userStore.ekrans[0].images[1])).then(data=>{
                                            if(!data){
                                                userStore.catchBlanks(userStore.ekrans[0].images[1])
                                            }

                                        })
                                    }

                                    }
                                    source={{uri:userStore.changeLink(userStore.ekrans[0].images[1])}} style={{width:'100%',height:'100%',borderRadius:20}}/>

                            ):(<View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
                                <Spinner size={'small'} color={'blue'}/>
                            </View>)}
                        </TouchableOpacity>
                    </View>

                )}




            </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=> {

                        if(userStore.ratingActive){
                            AsyncStorage.getItem('lastReview').then(data=>{
                                if(!data){
                                    if(InAppReview.isAvailable()){
                                        InAppReview.RequestInAppReview()
                                            .then((hasFlowFinishedSuccessfully) => {
                                                navigation.navigate('Other')

                                                AsyncStorage.setItem('lastReview',JSON.stringify(Date.now()))
                                                // when return true in android it means user finished or close review flow
                                                console.log('InAppReview in android', hasFlowFinishedSuccessfully);

                                                // when return true in ios it means review flow lanuched to user.
                                                console.log(
                                                    'InAppReview in ios has launched successfully',
                                                    hasFlowFinishedSuccessfully,
                                                );

                                                // 1- you have option to do something ex: (navigate Home page) (in android).
                                                // 2- you have option to do something,
                                                // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

                                                // 3- another option:
                                                if (hasFlowFinishedSuccessfully) {
                                                    // do something for ios
                                                    // do something for android
                                                }

                                                // for android:
                                                // The flow has finished. The API does not indicate whether the user
                                                // reviewed or not, or even whether the review dialog was shown. Thus, no
                                                // matter the result, we continue our app flow.

                                                // for ios
                                                // the flow lanuched successfully, The API does not indicate whether the user
                                                // reviewed or not, or he/she closed flow yet as android, Thus, no
                                                // matter the result, we continue our app flow.
                                            })
                                            .catch((error) => {
                                                //we continue our app flow.
                                                // we have some error could happen while lanuching InAppReview,
                                                // Check table for errors and code number that can return in catch.
                                                console.log(error);
                                            });
                                    }
                                }else{
                                    let oldDate= JSON.parse(data)
                                    if(Date.now()- oldDate <15*24*60*60*1000){
                                        navigation.navigate('Other')
                                    }else{
                                        if(InAppReview.isAvailable()){
                                            InAppReview.RequestInAppReview()
                                                .then((hasFlowFinishedSuccessfully) => {
                                                    // when return true in android it means user finished or close review flow
                                                    console.log('InAppReview in android', hasFlowFinishedSuccessfully);
                                                    navigation.navigate('Other')


                                                    AsyncStorage.setItem('lastReview',JSON.stringify(Date.now()))

                                                    // when return true in ios it means review flow lanuched to user.
                                                    console.log(
                                                        'InAppReview in ios has launched successfully',
                                                        hasFlowFinishedSuccessfully,
                                                    );

                                                    // 1- you have option to do something ex: (navigate Home page) (in android).
                                                    // 2- you have option to do something,
                                                    // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

                                                    // 3- another option:
                                                    if (hasFlowFinishedSuccessfully) {
                                                        // do something for ios
                                                        // do something for android
                                                    }

                                                    // for android:
                                                    // The flow has finished. The API does not indicate whether the user
                                                    // reviewed or not, or even whether the review dialog was shown. Thus, no
                                                    // matter the result, we continue our app flow.

                                                    // for ios
                                                    // the flow lanuched successfully, The API does not indicate whether the user
                                                    // reviewed or not, or he/she closed flow yet as android, Thus, no
                                                    // matter the result, we continue our app flow.
                                                })
                                                .catch((error) => {
                                                    //we continue our app flow.
                                                    // we have some error could happen while lanuching InAppReview,
                                                    // Check table for errors and code number that can return in catch.
                                                    console.log(error);
                                                });
                                        }
                                    }
                                }
                            })
                        }else{
                            navigation.navigate('Other')
                        }


                    }}>
                        <View style={[styles.menuItemContainer,{backgroundColor:'#DAAFFF'}]}>
                            <View style={[styles.menuInsideContainer,{backgroundColor:'#E420EB'}]}>

                <View style={styles.menuLeftContainer}>
                    <View style={styles.menuIconPadding}>

                        <FastImage style={styles.menuIcon} source={userStore.theme == 'dark' ? require('../../../assets/otherpink.png') :require('../../../assets/otherpink.png')} resizeMode={'contain'}/>
                    </View>
                    <Text style={[styles.menuText,{color:'white'}]}>{I18n.t('other')}</Text>

                </View>



                    <View style={styles.menuRightContainer}>


                        <View style={{marginRight:5}}>

                            <Text style={styles.menuRightText}>{userStore.wholeImages.length} {I18n.t('photo')}</Text>



                            <Text style={styles.menuRightBottomText}>({userStore.formatBytes(userStore.otherWholeSize)})</Text>
                        </View>
                        <View style={{borderRadius:50,backgroundColor:'white',padding:5,marginLeft:5,justifyContent:'center',alignItems:'center'}}>

                            <FastImage style={styles.menuRightIcon} source={require('../../../assets/rightarrowping.png')} resizeMode={'contain'}/>
                        </View>

                    </View>

                </View>
                {userStore.wholeImages.length>0 && (
                    <View style={{flexDirection:'row',width:'105%',justifyContent:'space-between'}}>
                        <TouchableOpacity onPress={()=> {

                            if(userStore.ratingActive){
                                AsyncStorage.getItem('lastReview').then(data=>{
                                    if(!data){
                                        if(InAppReview.isAvailable()){
                                            InAppReview.RequestInAppReview()
                                                .then((hasFlowFinishedSuccessfully) => {
                                                    navigation.navigate('Other')

                                                    AsyncStorage.setItem('lastReview',JSON.stringify(Date.now()))
                                                    // when return true in android it means user finished or close review flow
                                                    console.log('InAppReview in android', hasFlowFinishedSuccessfully);

                                                    // when return true in ios it means review flow lanuched to user.
                                                    console.log(
                                                        'InAppReview in ios has launched successfully',
                                                        hasFlowFinishedSuccessfully,
                                                    );

                                                    // 1- you have option to do something ex: (navigate Home page) (in android).
                                                    // 2- you have option to do something,
                                                    // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

                                                    // 3- another option:
                                                    if (hasFlowFinishedSuccessfully) {
                                                        // do something for ios
                                                        // do something for android
                                                    }

                                                    // for android:
                                                    // The flow has finished. The API does not indicate whether the user
                                                    // reviewed or not, or even whether the review dialog was shown. Thus, no
                                                    // matter the result, we continue our app flow.

                                                    // for ios
                                                    // the flow lanuched successfully, The API does not indicate whether the user
                                                    // reviewed or not, or he/she closed flow yet as android, Thus, no
                                                    // matter the result, we continue our app flow.
                                                })
                                                .catch((error) => {
                                                    //we continue our app flow.
                                                    // we have some error could happen while lanuching InAppReview,
                                                    // Check table for errors and code number that can return in catch.
                                                    console.log(error);
                                                });
                                        }
                                    }else{
                                        let oldDate= JSON.parse(data)
                                        if(Date.now()- oldDate <15*24*60*60*1000){
                                            navigation.navigate('Other')
                                        }else{
                                            if(InAppReview.isAvailable()){
                                                InAppReview.RequestInAppReview()
                                                    .then((hasFlowFinishedSuccessfully) => {
                                                        // when return true in android it means user finished or close review flow
                                                        console.log('InAppReview in android', hasFlowFinishedSuccessfully);
                                                        navigation.navigate('Other')


                                                        AsyncStorage.setItem('lastReview',JSON.stringify(Date.now()))

                                                        // when return true in ios it means review flow lanuched to user.
                                                        console.log(
                                                            'InAppReview in ios has launched successfully',
                                                            hasFlowFinishedSuccessfully,
                                                        );

                                                        // 1- you have option to do something ex: (navigate Home page) (in android).
                                                        // 2- you have option to do something,
                                                        // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

                                                        // 3- another option:
                                                        if (hasFlowFinishedSuccessfully) {
                                                            // do something for ios
                                                            // do something for android
                                                        }

                                                        // for android:
                                                        // The flow has finished. The API does not indicate whether the user
                                                        // reviewed or not, or even whether the review dialog was shown. Thus, no
                                                        // matter the result, we continue our app flow.

                                                        // for ios
                                                        // the flow lanuched successfully, The API does not indicate whether the user
                                                        // reviewed or not, or he/she closed flow yet as android, Thus, no
                                                        // matter the result, we continue our app flow.
                                                    })
                                                    .catch((error) => {
                                                        //we continue our app flow.
                                                        // we have some error could happen while lanuching InAppReview,
                                                        // Check table for errors and code number that can return in catch.
                                                        console.log(error);
                                                    });
                                            }
                                        }
                                    }
                                })
                            }else{
                                navigation.navigate('Other')
                            }


                        }} style={styles.twiceContainers}>
                            {userStore.wholeImages.length>0 && (
                                <FastImage
                                    onError={e => {
                                        // console.error(e)
                                        MediaLibrary.getAssetInfoAsync(userStore.getAssetId(userStore.wholeImages[0].node.image.uri)).then(data=>{
                                            if(!data){
                                                userStore.catchBlanks(userStore.wholeImages[0].node.image.uri)
                                            }

                                        })
                                    }

                                    }
                                    source={{uri:userStore.changeLink(userStore.wholeImages[0].node.image.uri)}} style={{width:'100%',height:'100%',borderRadius:20}}/>

                            )}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> {

                            if(userStore.ratingActive){
                                AsyncStorage.getItem('lastReview').then(data=>{
                                    if(!data){
                                        if(InAppReview.isAvailable()){
                                            InAppReview.RequestInAppReview()
                                                .then((hasFlowFinishedSuccessfully) => {
                                                    navigation.navigate('Other')

                                                    AsyncStorage.setItem('lastReview',JSON.stringify(Date.now()))
                                                    // when return true in android it means user finished or close review flow
                                                    console.log('InAppReview in android', hasFlowFinishedSuccessfully);

                                                    // when return true in ios it means review flow lanuched to user.
                                                    console.log(
                                                        'InAppReview in ios has launched successfully',
                                                        hasFlowFinishedSuccessfully,
                                                    );

                                                    // 1- you have option to do something ex: (navigate Home page) (in android).
                                                    // 2- you have option to do something,
                                                    // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

                                                    // 3- another option:
                                                    if (hasFlowFinishedSuccessfully) {
                                                        // do something for ios
                                                        // do something for android
                                                    }

                                                    // for android:
                                                    // The flow has finished. The API does not indicate whether the user
                                                    // reviewed or not, or even whether the review dialog was shown. Thus, no
                                                    // matter the result, we continue our app flow.

                                                    // for ios
                                                    // the flow lanuched successfully, The API does not indicate whether the user
                                                    // reviewed or not, or he/she closed flow yet as android, Thus, no
                                                    // matter the result, we continue our app flow.
                                                })
                                                .catch((error) => {
                                                    //we continue our app flow.
                                                    // we have some error could happen while lanuching InAppReview,
                                                    // Check table for errors and code number that can return in catch.
                                                    console.log(error);
                                                });
                                        }
                                    }else{
                                        let oldDate= JSON.parse(data)
                                        if(Date.now()- oldDate <15*24*60*60*1000){
                                            navigation.navigate('Other')
                                        }else{
                                            if(InAppReview.isAvailable()){
                                                InAppReview.RequestInAppReview()
                                                    .then((hasFlowFinishedSuccessfully) => {
                                                        // when return true in android it means user finished or close review flow
                                                        console.log('InAppReview in android', hasFlowFinishedSuccessfully);
                                                        navigation.navigate('Other')


                                                        AsyncStorage.setItem('lastReview',JSON.stringify(Date.now()))

                                                        // when return true in ios it means review flow lanuched to user.
                                                        console.log(
                                                            'InAppReview in ios has launched successfully',
                                                            hasFlowFinishedSuccessfully,
                                                        );

                                                        // 1- you have option to do something ex: (navigate Home page) (in android).
                                                        // 2- you have option to do something,
                                                        // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

                                                        // 3- another option:
                                                        if (hasFlowFinishedSuccessfully) {
                                                            // do something for ios
                                                            // do something for android
                                                        }

                                                        // for android:
                                                        // The flow has finished. The API does not indicate whether the user
                                                        // reviewed or not, or even whether the review dialog was shown. Thus, no
                                                        // matter the result, we continue our app flow.

                                                        // for ios
                                                        // the flow lanuched successfully, The API does not indicate whether the user
                                                        // reviewed or not, or he/she closed flow yet as android, Thus, no
                                                        // matter the result, we continue our app flow.
                                                    })
                                                    .catch((error) => {
                                                        //we continue our app flow.
                                                        // we have some error could happen while lanuching InAppReview,
                                                        // Check table for errors and code number that can return in catch.
                                                        console.log(error);
                                                    });
                                            }
                                        }
                                    }
                                })
                            }else{
                                navigation.navigate('Other')
                            }


                        }} style={styles.twiceContainers}>
                            {userStore.wholeImages.length>0 && (
                                <FastImage
                                    onError={e => {
                                        // console.error(e)
                                        MediaLibrary.getAssetInfoAsync(userStore.getAssetId(userStore.wholeImages[1].node.image.uri)).then(data=>{
                                            if(!data){
                                                userStore.catchBlanks(userStore.wholeImages[1].node.image.uri)
                                            }

                                        })
                                    }

                                    }
                                    source={{uri:userStore.changeLink(userStore.wholeImages[1].node.image.uri)}} style={{width:'100%',height:'100%',borderRadius:20}}/>

                            )}
                        </TouchableOpacity>
                    </View>
                )}






            </View>
                    </TouchableWithoutFeedback>
                </View>
            </ScrollView>
            <Modal isVisible={play} style={{justifyContent:'center',alignItems:'center'}} onBackdropPress={()=>setPlay(false)}>
                <View style={{width:'70%',height:'70%'}}>
                    {/*<Video source={{uri:userStore.videoLink}} style={{width:'auto',height:'auto'}}/>*/}
                    {/*<VideoPlayer videoLink={userStore.videoLink} />*/}
                    {userStore.allVideos.length>0 && (
                        <VideoPlayer
                            source={{uri:userStore.allVideos[0].node.image.uri}}
                            videoWidth={100}
                            videoHeight={100}
                        />
                    )}

                </View>
            </Modal>
            <View style={[styles.footerContainer,{backgroundColor:userStore.activeTheme.homeBoxBackground}]}>
                <View style={styles.footerMenuContainer}>

                    <TouchableWithoutFeedback onPress={()=> {
                        if(userStore.passwordActive && userStore.password){
                            Alert.prompt(
                                I18n.t('enterPassword'),
                                I18n.t('yousetpassword'),
                                [
                                    {
                                        text: I18n.t('cancel'),
                                        onPress: () => console.log("Cancel Pressed"),
                                        style: "cancel"
                                    },
                                    {
                                        text: I18n.t('enter'),
                                        onPress: password => {
                                            if(password==userStore.password){
                                                navigation.navigate('Secret')

                                            }else{
                                                Alert.alert(I18n.t('fail'),I18n.t('notMatch'))
                                            }
                                        }
                                    }
                                ],
                                "secure-text"
                            );
                        }else{
                            navigation.navigate('Secret')
                        }
                    }}>
                <View style={[styles.footerMenuItem,{backgroundColor:'#5700FF'}]}>
                    <FastImage source={require('../../../assets/menu1.png')} style={styles.footerMenuIcon}/>

                </View>
                    </TouchableWithoutFeedback>
                    <Text style={[styles.footerMenuText,{color:userStore.activeTheme.textColor}]}>{I18n.t('secretPlace')}</Text>

                </View>

                <View style={styles.footerMenuContainer}>
                    <TouchableWithoutFeedback onPress={()=>navigation.navigate('Contacts')}>

                    <View style={[styles.footerMenuItem,{backgroundColor:'#6FDACF'}]}>
                        <FastImage source={require('../../../assets/menu2.png')} style={styles.footerMenuIcon}/>

                    </View>
                    </TouchableWithoutFeedback>
                    <Text style={[styles.footerMenuText,{color:userStore.activeTheme.textColor}]}>{I18n.t('contacts')}</Text>

                </View>

                <View style={styles.footerMenuContainer}>
                        <TouchableOpacity  onPress={()=>{
                            if(userStore.premium){
                                navigation.navigate('ChargingBegin')
                            }else{

                                navigation.navigate('Premium')
                            }
                        }} style={[styles.footerMenuItem,{backgroundColor:'#EE6561'}]}>
                            <FastImage source={require('../../../assets/menu3.png')} style={styles.footerMenuIcon}/>

                        </TouchableOpacity>

                    <Text style={[styles.footerMenuText,{color:userStore.activeTheme.textColor}]}>{I18n.t('charge')}</Text>

                </View>

                <View style={styles.footerMenuContainer}>

                    <TouchableOpacity  onPress={()=> {
                        if(userStore.premium){
                            navigation.navigate('CleanFast')
                        }else{

                            navigation.navigate('Premium')
                        }
                    }} style={[styles.footerMenuItem,{backgroundColor:'#FAC65E'}]}>
                        <FastImage source={require('../../../assets/menu4.png')} style={styles.footerMenuIcon}/>

                    </TouchableOpacity>
                    <Text style={[styles.footerMenuText,{color:userStore.activeTheme.textColor}]}>{I18n.t('clean')}</Text>

                </View>
            </View>
        </View>
    )
}
const styles=StyleSheet.create({
    menuIconPadding:{
        borderRadius:50,
        backgroundColor:'white',
        padding:3,marginLeft:5,
        justifyContent:'center',
        alignItems:'center'
    },
    videoImage:{
        width:'100%',
        height:'100%',
        borderRadius:20,
        resizeMode:'cover',
    },
    twiceContainers:{
        width:'48%',
        height:150,
        backgroundColor:'white',
        borderRadius:20,
        marginTop:10
    },
    menuInsideContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'105%',
        borderRadius:20,paddingHorizontal:5,paddingRight:10,paddingVertical:5
    },
    mainContainer:{
        width:'100%',
        justifyContent:'center',
        marginTop:20,
    },
    footerMenuText:{
        fontFamily: 'Roboto-Regular',
        fontSize:10,
        marginTop:5,
        textAlign:'center'
    },
    footerMenuContainer:{
        width:'18%',
        alignItems:'center',

    },
    footerContainer:{
        width:'100%',
        height:120,
        backgroundColor:'#F2F5FF',
        position:'absolute',
        bottom:0,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:30,
        paddingTop:20,
        borderRadius:20
    },
    footerMenuItem:{
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        paddingHorizontal:10,
        paddingVertical:15

    },
    footerMenuIcon:{
        width:22,
        height:22,
        resizeMode:'contain'
    },
    menuRightText:{
        color:'white',
        fontFamily:'Roboto-Regular',
        textAlign:'right',
        fontSize:13,

    },
    menuRightBottomText:{
        textAlign:'right',
        color:'white',
        fontFamily:'Roboto-Light',
        fontSize:10

    },
    menuRightIcon:{
        width:10,
        height:10
    },
    menuRightContainer:{

        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderRadius:20,
        paddingHorizontal:0,
        paddingVertical:5
    },
    menuIcon:{
        width:20,
        height:20
    },
    menuText:{
        fontSize:20,
        marginLeft: 7,
        fontWeight:'500',
        fontFamily:'Roboto-Regular',

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
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:20,
        marginVertical:10

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
    headerContainer:{
        marginVertical:50,
        marginHorizontal:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    homeTitle:{
        fontFamily:'Roboto-Bold',
        fontSize:30,
    },
    headerButtonImage:{
      width:30,
      height:30
    },
    headerBottomContainer:{
        marginHorizontal:20,
        flexDirection:'row',
        alignItems:'center',
        marginTop:-20,
        justifyContent:'space-between',
        paddingBottom:20
    },
    proContainer:{
        flexDirection:'row',
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:20,
        alignItems:'center',

        backgroundColor:'#2007FF',
        justifyContent:'space-between',
        width:80
    },
    proIcon:{
        width:20,
        height:20
    },
    proText:{
        color:'white',
    }

})
export default observer(Home)
