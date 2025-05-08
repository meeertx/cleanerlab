/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import DeviceCountry, {
    TYPE_ANY,
    TYPE_TELEPHONY,
    TYPE_CONFIGURATION,
} from 'react-native-device-country';
import React, {useEffect, useRef, useState} from 'react';
import type {Node} from 'react';
import DeviceInfo from "react-native-device-info";
import * as RNLocalize from "react-native-localize";
import { enableScreens } from 'react-native-screens';
enableScreens()
import {
    LogBox,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    NativeModules,AppState,
    Text,
    Button,Linking,
    useColorScheme,
    View, Alert, Image, Animated, Dimensions,
} from 'react-native';
LogBox.ignoreAllLogs();
import nodejs from 'nodejs-mobile-react-native';
import CameraRoll from "@react-native-community/cameraroll";
import { Buffer } from "@craftzdog/react-native-buffer";
import OneSignal from "react-native-onesignal"
import ProgressBar from "react-native-animated-progress";
const SharedStorage = NativeModules.SharedStorage;

import KeepAwake from '@sayem314/react-native-keep-awake';
import Video from "react-native-video";

var RNFS = require('react-native-fs')
import { Image as CompImage } from 'react-native-compressor';
import userStore from "./src/store/userStore";
import {observer} from 'mobx-react'
import {FlatList, TouchableOpacity} from "react-native-gesture-handler";
import ImageResizer from 'react-native-image-resizer';
import { stat } from 'react-native-fs';
import {Container, Icon, Spinner, } from "native-base";
import AppIntroSlider from 'react-native-app-intro-slider';
import I18n from "./lang";
import AsyncStorage from "@react-native-community/async-storage";
import {getTotalDiskCapacity, getFreeDiskStorage, getTotalDiskCapacityOld} from "react-native-device-info";
import * as Progress from 'react-native-progress';
import Home from "./src/screens/Home";
import Flash from "./src/screens/Premium/flash";
import VideoPlayer from "./src/screens/VideoPlayerLoading";
import Router from './src/router'
import Loading from "./src/components/loading";
import {useTheme} from "@react-navigation/native";
import SharedGroupPreferences from 'react-native-shared-group-preferences';
import RNRestart from "react-native-restart";
// import { Settings } from 'react-native-fbsdk-next';

const appGroupIdentifier = 'group.com.battery.ReactNativeWidget';


const App = ()=>{

    const [inputText, setInputText] = useState('deneme widget');
    const widgetData = {
        displayText: inputText,
    };


    // useEffect(()=>{
    //
    //     Settings.setAppID('1733148233736998');
    //     setTimeout(()=>{
    //
    //     Settings.initializeSDK();
    //     },2500)
    //
    // },[])

    useEffect(async ()=>{
        SharedStorage.set(
            JSON.stringify({text: 'This is data from the React Native app'})
        );
        await userStore.saveUserDataToSharedStorage()
    },[])
    const handleSubmit = async () => {
        try {
            await SharedGroupPreferences.setItem(
                'savedData', // this is a key to pull from later in Swift
                widgetData,
                appGroupIdentifier,
            );
        } catch (error) {
            console.log({ error });
        }
    };
    const [first,setFirst]=useState(false)
    const [total,setTotal]=useState(null)
    const [totalByte,setTotalByte]=useState(null)
    const [last,setLast]=useState(false)

    const [free,setFree]=useState(null)
    const [percent,setPercent]=useState(null)
    const [count,setCount]=useState(0)

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
    function percentage(partialValue, totalValue) {
        return (100 * partialValue) / totalValue;
    }

    // const appState = useRef(AppState.currentState);
    // const [appStateVisible, setAppStateVisible] = useState(appState.current);
    // useEffect(() => {
    //     const subscription = AppState.addEventListener("change", nextAppState => {
    //         if (
    //             appState.current.match(/inactive|background/) &&
    //             nextAppState === "active"
    //         ) {
    //             console.log("App has come to the foreground!");
    //         }
    //
    //         appState.current = nextAppState;
    //         setAppStateVisible(appState.current);
    //         console.log("AppState", appState.current);
    //         if(appState.current=='background'){
    //             console.error('durdur')
    //
    //         }
    //     });
    //
    //     return () => {
    //         subscription.remove();
    //     };
    // }, []);


    let notify = ()=>{
        OneSignal.setLogLevel(6, 0);
        OneSignal.setAppId("fd02c62d-7dba-4309-aedb-851adfe7059b");

        OneSignal.promptForPushNotificationsWithUserResponse(response => {

            console.log("Prompt response:", response);
            userStore.getPlayerId()

        });
        OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
            console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
            let notification = notificationReceivedEvent.getNotification();
            console.log("notification: ", notification);
            const data = notification.additionalData
            console.log("additionalData: ", data);
            const button1 = {
                text: "Cancel",
                onPress: () => { notificationReceivedEvent.complete(); },
                style: "cancel"
            };
            const button2 = { text: "Complete", onPress: () => { notificationReceivedEvent.complete(notification); }};
            Alert.alert("Complete notification?", "Test", [ button1, button2], { cancelable: true });
        });

        OneSignal.setNotificationOpenedHandler(notification => {
            console.log("OneSignal: notification opened:", notification);
        });

    }


    let getBytes = ()=>{
        getTotalDiskCapacity().then(data=>{
            let exact ;
            if(data<17179869184){
                setTotalByte(17179869184)
                exact=17179869184

                setTotal(formatBytes(17179869184))
            }else if(data<34359738368){
                setTotalByte(34359738368)
                exact=34359738368
                setTotal(formatBytes(34359738368))

            }else if(data<68719476736){
                setTotalByte(68719476736)
                exact=68719476736
                setTotal(formatBytes(68719476736))

            }else if(data<137438953472){
                setTotalByte(137438953472)
                exact=137438953472
                setTotal(formatBytes(137438953472))

            }else if(data<274877906944){
                setTotalByte(274877906944)
                exact=274877906944
                setTotal(formatBytes(274877906944))

            }else if(data<549755813888){
                setTotalByte(549755813888)
                exact=549755813888
                setTotal(formatBytes(549755813888))

            }else if(data<1099511627776){
                setTotalByte(1099511627776)
                exact=1099511627776
                setTotal(formatBytes(1099511627776))

            }else{
                exact=data

                setTotalByte(data)
                setTotal(formatBytes(data).split(' ')[0])
            }
            getFreeDiskStorage().then(value=>{
                if(Platform.OS=='android'){
                    setFree(formatBytes(exact-value).split(' ')[0])
                    // alert(data)
                    // alert(exact)
                    setPercent(percentage(exact-value,exact))
                }else{
                    setFree(formatBytes(data-value).split(' ')[0])
                    setPercent(percentage(data-value,exact))
                    // setFree(formatBytes(exact-value).split(' ')[0])
                    // // alert(data)
                    // // alert(exact)
                    // setPercent(percentage(exact-value,exact))
                }

            })


        })



    }
    useEffect(()=>{


        getBytes()


        DeviceCountry.getCountryCode(TYPE_ANY)
            .then((result) => {

                // console.log(deviceLanguage); //en_US
                // console.log();

                // ülke
                // alert(result.code)
                // telefon dili
                // alert(RNLocalize.getLocales()[0].languageCode)



            })
            .catch((e) => {
                console.log(e);
            });


        // getTotalDiskCapacity().then(async data=>{
        //     try{
        //
        //
        //         getFreeDiskStorage().then(value=>{
        //             // alert(value)
        //
        //
        //         })
        //     }catch (e) {
        //         console.log(e)
        //     }
        //
        // })


        // alert(Number(percentage(free,total))/100)

    },[])
    const slides = [
        {
            key: 1,
            title: I18n.t('title1'),
            text: I18n.t('description1'),
            image: require('./assets/firstslider.png'),
            backgroundColor: '#59b2ab',
        },
        {
            key: 2,
            title: I18n.t('title2'),
            text: I18n.t('description2'),
            image: require('./assets/slider2.png'),
            backgroundColor: '#febe29',
        },
        {
            key: 3,
            title: I18n.t('title3'),
            text: I18n.t('description3'),
            image: require('./assets/slider3_1.png'),
            image2: require('./assets/slider3_2.png'),

            backgroundColor: '#22bcb5',
        }
    ];

    let _renderItem = ({ item,index }) => {
        if(index==2){
            // alert('varim')
            // checkPhotos()
            return (
                <Container style={styles.slide}>
                    <View>
                        <Text style={[styles.title]}>{item.title}</Text>
                    </View>
                    <View style={[styles.header,{flexDirection:'row',height:'10%'}]}>
                        <View style={{alignItems:'center'}}>

                        <Image style={{width:80,height:80}}  resizeMode={'contain'} source={item.image} />
                            <Text>{I18n.t('photos')}</Text>
                        </View>
                        <View style={{alignItems:'center',marginLeft:20}}>

                            <Image style={{width:80,height:80}}  resizeMode={'contain'} source={item.image2} />
                            <Text>iCloud</Text>
                        </View>

                    </View>
                    <View style={{alignItems:'center'}}>
                        <Text style={[styles.title]}>{Math.round(free)}/{total}</Text>
                        <Text style={styles.text}>{I18n.t('used',{total:Math.round(percent)})}</Text>
                        {free && total && (

                            <View style={{height:10,marginTop:20,width:'70%',backgroundColor:'white'}}>
                                {last &&                             <ProgressBar  progress={percent ? percent:50} height={10} backgroundColor="#2007FF" />
                                }

                            </View>


                        )}


                    </View>
                    <View style={{alignItems:'center',marginTop:0}}>
                        <Text style={[styles.text,{textAlign:'center',color:'black',marginTop:20,fontFamily:'Roboto-Regular'}]}>
                            {I18n.t('popupInfo')}

                        </Text>
                        <View style={{flexDirection:'row',paddingHorizontal: 50}}>

                        <TouchableOpacity onPress={()=>{
                            Linking.openURL('https://cleanerlabapp.com/privacy.html')
                        }}>
                            <Text style={[styles.textClick,{    textDecorationLine: "underline",textAlign:'center',color:'black',marginTop:10,fontFamily:'Roboto-Regular'}]}>
                                {I18n.t('privacy')}
                            </Text>
                        </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{
                                Linking.openURL('https://cleanerlabapp.com/terms.html')
                            }}>
                                <Text style={[styles.textClick,{textDecorationLine: "underline",textAlign:'center',color:'black',marginTop:10,fontFamily:'Roboto-Regular'}]}>
                                    {I18n.t('termsOfUse')}
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </Container>
            );
        }else{

            return (
                <Container style={styles.slide}>
                    <View style={{marginTop:index==2?-40:-30,paddingBottom:20}}>
                        <Text style={[styles.title]}>{item.title}</Text>
                        <Text style={styles.text}>{item.text}</Text>
                    </View>
                    <View style={[styles.header,{height:'50%',paddingTop:20}]}>

                        <Image style={{width:'60%'}} resizeMode={'contain'} source={item.image} />
                    </View>


                </Container>
            );
        }

    }
    let _onDone = () => {
        // User finished the introduction. Show real app through
        // navigation or simply by controlling state
        userStore.setFirst()
        AsyncStorage.setItem('first',JSON.stringify(false))
        userStore.firststep()


    }
    let shakeAnimation = new Animated.Value(0);
    let startShake = () => {
        Animated.sequence([
            Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true })
        ]).start();
    }
    let _renderNextButton = () => {
        startShake()
        return (
            <TouchableOpacity onPress={()=>{
                // startShake()
            }}>

            <Animated.View style={[styles.buttonCircle,{transform: [{translateX: shakeAnimation}]}]}>
                <Icon
                    name="arrow-forward-outline"
                    style={{color:'white'}}
                    size={24}
                />
            </Animated.View>
            </TouchableOpacity>
        );
    };
    let _renderDoneButton = () => {
        setTimeout(()=>{

        startShake()
        },1500)

        return (

            <Animated.View style={[styles.buttonCircle,{transform: [{translateX: shakeAnimation}]}]}>
                <Icon
                    name="checkmark-done-outline"
                    style={{color:'white'}}
                    size={24}
                />
            </Animated.View>
        );
    };
    let _renderSkipButton = () => {
        return (
            <View style={styles.buttonSkip}>
                <Text style={{color:'black'}}>
                    Skip
                </Text>
            </View>
        );
    };

    const convertLocalIdentifierToAssetLibrary = (localIdentifier, ext) => {
        const hash = localIdentifier.split('/')[0];
        return `assets-library://asset/asset.${ext}?id=${hash}&ext=${ext}`;
    };
  const [photos,setPhotos]=useState([])
    const [select,setSelect]=useState(false)

    const [similars,setSimilars] = useState([])
    let compare=()=>{
      if(userStore.photos.length>0){
          // alert('Calistim')
          userStore.photos.forEach((it,index)=>{

              userStore.photos.forEach((item,indis)=>{

                  if(index != indis){
                      nodejs.channel.send(it,item)


                  }
              })
          })
      }else{
          setTimeout(()=>{

              compare()
          },500)
      }

    }
    let getSimilarity=(photos)=>{
        userStore.setPhotos(photos)

      if(photos.length>0){
          let newArray = []

              try{

                  photos.forEach(async(it,index)=>{
                      function formatBytes(bytes, decimals = 2) {
                          if (bytes === 0) return '0 Bytes';

                          const k = 1024;
                          const dm = decimals < 0 ? 0 : decimals;
                          const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

                          const i = Math.floor(Math.log(bytes) / Math.log(k));

                          return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
                      }
                      // alert(JSON.stringify(formatBytes(it.node.image.fileSize)))


                      // const cev1 = await CompImage.compress(it.node.image.uri, {
                      // quality: 0.1,
                      //
                      //   });
                      // alert(JSON.stringify(it.node))



                      // createResizedImage(it.node.image.uri, 16, 16,'JPEG',50)
                      //     .then(response => {
                      //         // response.uri is the URI of the new image that can now be displayed, uploaded...
                      //         // response.path is the path of the new image
                      //         // alert(response.path)
                      //         it.node.location='/private'+response.path
                      //         if(index==photos.length-1){
                      //             setTimeout(()=>{
                      //                 setPhotos(photos)
                      //                 userStore.setPhotos(photos)
                      //                 userStore.analyze(photos)
                      //             },10000)
                      //
                      //             // compare()
                      //         }
                      //         // RNFS.readFile(response.path, 'base64')
                      //         //     .then(res =>{
                      //         //         // alert(res.length)
                      //         //         //cev1.split('file://')[1]
                      //         //
                      //         //     });
                      //         // response.name is the name of the new image with the extension
                      //         // response.size is the size of the new image
                      //     })
                      //     .catch(err => {
                      //         // Oops, something went wrong. Check that the filename is correct and
                      //         // inspect err to get more details.
                      //     });




              })
              }catch (e) {

                  alert(e)
              }


      }else{
          setTimeout(()=>{
              console.log('res.length'+photos.length);

              getSimilarity()
          },250)
      }


    }
    let getAllPhotos = async () =>{
        const albums = await CameraRoll.getAlbums({ assetType: 'All' });
        const totalPics = albums.reduce((total, current) => total + current.count, 0);
        alert(totalPics)
    }


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




  useEffect(()=>{
      // userStore.getCleanable()
      userStore.getFirst()
      userStore.startApp()
      // alert(JSON.stringify(colors))





  },[])
    const screen = Dimensions.get('window')

    if(userStore.loading ){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <View style={{width:'200%',height:'200%',justifyContent:'center',alignItems:'center'}}>

                    <Video  source={require('./assets/opening.mp4')} style={{
                        width:screen.width*1.25,
                        height:screen.height*1.25,
                        resizeMode:'contain',


                    }}

                            repeat={true}

                    />
                </View>

            </View>
        )
    }else if(userStore.first){
        return(
            <AppIntroSlider
                data={slides}
                renderItem={_renderItem}
                onSlideChange={index=>{
                    if(index==1) {
                        notify()

                        setLast(false)
                    }else if(index==2){
                        setTimeout(()=>{

                        setLast(true)
                        },500)
                        checkPhotos()
                    }
                }}
                renderDoneButton={_renderDoneButton}
                renderNextButton={_renderNextButton}
                renderSkipButton={_renderSkipButton}
                onDone={_onDone}
                activeDotStyle={{backgroundColor:'#2007FF'}}
            />
        )
    }else{
        return(
            <View style={{flex:1}}>
                <KeepAwake />

                <Router />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF'
    },
    slide:{
        flex:1,
        paddingTop:'10%',
        backgroundColor:'white'
    },
    buttonCircle: {
        width: 60,
        height: 60,
        backgroundColor: '#2007FF',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:10,
        marginTop:-10,
    },
    buttonSkip:{
        width: 400,
        height: 40,
        backgroundColor: 'gray',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{
        textAlign:'center',
        fontSize: 30,
        marginHorizontal: 40,
        marginVertical: 30,
        marginTop:40,
        fontFamily:'Roboto-Bold',

        color:'#000000'
    },
    text:{
        textAlign:'center',

        fontSize: 16,
        marginHorizontal: 40,
        fontFamily:'Roboto-Regular',

        color:'#696B7F'
    },
    textClick:{
        textAlign:'center',

        fontSize: 16,
        fontFamily:'Roboto-Regular',
        marginHorizontal:10,
        color:'#696B7F'
    },
    header:{
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:20,
        marginTop:30,

    }
});

export default observer(App);
