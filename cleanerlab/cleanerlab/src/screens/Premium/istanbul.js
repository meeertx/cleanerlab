import React, {useState,useEffect,useRef} from 'react'
import {
    View,
    StyleSheet,
    Image,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Text,
    Animated,
    Easing,
    ImageBackground,
    ScrollView,
    TouchableOpacity, FlatList, ImageBackgroundComponent, TouchableOpacityComponent, Platform, Alert, Dimensions
} from "react-native";
import {observer} from "mobx-react";
import { AppEventsLogger } from "react-native-fbsdk-next";

import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import {requestPurchase, requestSubscription, useIAP} from 'react-native-iap';
import userStore from "../../store/userStore";
import {Icon, Spinner} from "native-base";
import I18n from '../../../lang/index';
import axios from "axios";
import {API_BASE, key} from "../../constants";
import { RewardedAd, RewardedAdEventType, BannerAdSize, BannerAd, TestIds } from 'react-native-google-mobile-ads';
import WebView from "react-native-webview";
import Modal from "react-native-modal";
import VideoPlayer from "react-native-video-controls";
const rewardedId =__DEV__ ? TestIds.REWARDED
    : 'ca-app-pub-6820745768279674/2274584287'
const rewarded = RewardedAd.createForAdRequest(rewardedId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
});
const screen = Dimensions.get('window')
const {width, height} = Dimensions.get('window');
const circleSize = width / 3;

const IstanbulPremium = ({navigation,route}) =>{
    const [modal,setModal]=useState(false)
    const [loading,setLoading]=useState(false)

    const move = useRef(new Animated.Value(1)).current;
    const breathIn = Easing.out(Easing.sin);
    const breathOut = Easing.in(Easing.cos);
    Animated.loop(
        Animated.sequence([
            Animated.timing(move, {
                toValue: 1.5,
                duration: 500,
                easing: breathIn,
                useNativeDriver: true,
            }),
            Animated.timing(move, {
                toValue: 1.4,
                duration: 500,
                easing: breathOut,
                useNativeDriver: true,
            }),

        ]),
    ).start();

    const translate = move.interpolate({
        inputRange: [0, 0.5],
        outputRange: [0.5,0],
    });
    let exit =  ()=>{
        if(userStore.deletePage=='similar'){
            userStore.deleteSimilar(navigation)
            userStore.setDeletePopup(false)

            userStore.setDeletePage('')
        }else if(userStore.deletePage=='same'){
            userStore.deleteSame(navigation)
            userStore.setDeletePopup(false)

            userStore.setDeletePage('')

        }else if(userStore.deletePage=='ekran'){
            userStore.deleteScreenShot(navigation)
            userStore.setDeletePopup(false)

            userStore.setDeletePage('')

        }else if(userStore.deletePage=='video'){
            userStore.deleteVideo(navigation)
            userStore.setDeletePopup(false)

            userStore.setDeletePage('')

        }else if(userStore.deletePage=='other'){
            userStore.deleteOther(navigation)
            userStore.setDeletePopup(false)

            userStore.setDeletePage('')

        }else if(userStore.deletePage=='notPremium'){
            userStore.setDeletePopup(false)
            userStore.setDeletePage('')
        }
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            // Do something
            // alert('gesture')
            // alert(navigation)

            if(userStore.deletePage!=''){
                if(!userStore.adActive){
                    exit()

                }else{

                    showAd()
                }
            }
        });

        return unsubscribe;
    }, [navigation]);
    let count = 0
    let showAd = ()=>{
        if (!rewarded.loaded){
            setTimeout(()=>{

                count++
                if(count<2){
                    rewarded.load()
                }

                if(count>10){
                    Alert.alert(I18n.t('alert'),I18n.t('tooManyAds'))

                    userStore.setDeletePopup(false)

                    userStore.setDeletePage('')
                }else{
                    showAd()
                }
                console.log('denedim')
            },500)
        }else{
            // alert('geldi')


            rewarded.show()



            // console.log('User earned reward of ', reward);
        }
    }
    useEffect(() => {

        const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
            // setLoaded(true);
        });
        const unsubscribeEarned = rewarded.addAdEventListener(
            RewardedAdEventType.EARNED_REWARD,
            reward => {
                if(userStore.deletePage=='similar'){
                    userStore.deleteSimilar(navigation)
                    userStore.setDeletePopup(false)

                    userStore.setDeletePage('')
                }else if(userStore.deletePage=='same'){
                    userStore.deleteSame(navigation)
                    userStore.setDeletePopup(false)

                    userStore.setDeletePage('')

                }else if(userStore.deletePage=='ekran'){
                    userStore.deleteScreenShot(navigation)
                    userStore.setDeletePopup(false)

                    userStore.setDeletePage('')

                }else if(userStore.deletePage=='video'){
                    userStore.deleteVideo(navigation)
                    userStore.setDeletePopup(false)

                    userStore.setDeletePage('')

                }else if(userStore.deletePage=='other'){
                    userStore.deleteOther(navigation)
                    userStore.setDeletePopup(false)

                    userStore.setDeletePage('')

                }else if(userStore.deletePage=='notPremium'){
                    userStore.setDeletePopup(false)
                    userStore.setDeletePage('')
                }

                setTimeout(()=>{

                    unsubscribeLoaded();
                    unsubscribeEarned();
                },2500)


                console.log('User earned reward of ', reward);

                // alert('kazandın')

            },

        );

        // Start loading the rewarded ad straight away
        rewarded.load();
        // alert('loading')

        // Unsubscribe from events on unmount
        return () => {
            if(userStore.deletePage==''){
                unsubscribeLoaded();
                unsubscribeEarned();
            }

        };
    }, []);


    let itemSkus;

    let  getSkus =async ()=>{
        if(userStore.subs.ios != undefined && userStore.subs.ios.length>0){
            itemSkus = Platform.select({
                ios: userStore.subs.ios.map(it => it),
                android: userStore.subs.android.map(it => it)

            });

            await getSubscriptions(itemSkus);
        }else{
            setTimeout(()=>{
                getSkus()
            },250)
        }
    }

    const {
        connected,
        products,
        subscriptions,
        getProducts,
        getSubscriptions,
        finishTransaction,
        currentPurchase,
        currentPurchaseError,
    } = useIAP();
    // const itemSkus = Platform.select(userStore.subs.ios != undefined ? userStore.subs:['com.cleanerlab.test']);
    if(userStore.subs.ios != undefined){


        const itemSkus = Platform.select({
            ios:userStore.subs.ios.map(it=>it),
            android:userStore.subs.android.map(it=>it)

        });

        // useEffect(async () => {
        //
        //     await getSubscriptions(itemSkus);
        // }, [getSubscriptions]);

        useEffect(() => {
            // alert(JSON.stringify(route))
            getSkus()
            const checkCurrentPurchase = async (purchase) => {
                if (purchase) {
                    const receipt = purchase.transactionReceipt;
                    if (receipt){
                        try {
                            const ackResult = await finishTransaction(purchase);
                            console.log('ackResult', ackResult);
                        } catch (ackErr) {
                            console.warn('ackErr', ackErr);
                        }
                        if(Platform.OS==='android'){
                            try{
                                const headers = {
                                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                                };
                                axios.post(`${API_BASE}/api/user/process?token=${userStore.token}&key=${key}`,{deviceId:userStore.deviceId,productId:purchase.productId,purchaseToken:purchase.purchaseToken,packageNameAndroid:purchase.packageNameAndroid,orderId:purchase.transactionId}, headers).then(data=>{
                                    console.log(data);
                                    if(data.data.isValid || data.data.status){
                                        navigation.goBack()
                                        subscriptions.find(it=>{
                                            if(it.productId==purchase.productId){
                                                if(it.productId.indexOf('trial')>-1){
                                                    AppEventsLogger.logPurchase(Number(it.price), it.currency,{trial:true});
                                                }else{
                                                    AppEventsLogger.logPurchase(Number(it.price), it.currency,{trial:false});
                                                }

                                            }
                                        })
                                        userStore.setPremium()
                                        setTimeout(()=>{

                                            navigation.navigate('PremiumCongrats')
                                        },1000)

                                    }
                                })
                            }catch (e) {

                            }
                        }else{
                            try {
                                const ackResult = await finishTransaction(purchase);
                                console.log('ackResult', ackResult);
                            } catch (ackErr) {
                                console.warn('ackErr', ackErr);
                            }
                            try{
                                const headers = {
                                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                                };
                                // alert('gönderdim '+userStore.deviceId)
                                axios.post(`${API_BASE}/api/user/process?token=${userStore.token}&key=${key}`,{deviceId:userStore.deviceId,productId:purchase.productId,purchaseToken:purchase.transactionReceipt,orderId:purchase.transactionId}, headers).then(data=>{

                                    if(data.data.status){
                                        userStore.setPremium()
                                        navigation.goBack()
                                        subscriptions.find(it=>{
                                            if(it.productId==purchase.productId){
                                                if(it.productId.indexOf('trial')>-1){
                                                    AppEventsLogger.logPurchase(Number(it.price), it.currency,{trial:true});
                                                }else{
                                                    AppEventsLogger.logPurchase(Number(it.price), it.currency,{trial:false});
                                                }

                                            }
                                        })
                                        setTimeout(()=>{

                                            navigation.navigate('PremiumCongrats')
                                        },500)
                                    }

                                }).catch(e=>alert(e))
                            }catch (e) {

                            }
                        }
                    }

                }
            };
            checkCurrentPurchase(currentPurchase);
        }, [currentPurchase, finishTransaction]);


        if(subscriptions.length>0){

            return(
                <View style={styles.container}>

                    <View style={styles.mainContainer}>
                        <View style={{marginBottom:0,width:'100%',flexDirection:'row',paddingVertical: 5,paddingHorizontal:20,alignItems:'center',justifyContent:'space-between'}}>
                            <View>
                                <Text>    </Text>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <FastImage
                                    style={{width:90,height:40,resizeMode:'contain'}}
                                    source={require('../../../assets/istanbulogo.png')}/>
                            </View>
                            <View>
                                <TouchableOpacity onPress={()=>navigation.goBack()}>
                                    <FastImage style={{width:15,height:15}} source={require('../../../assets/closeistanbul.png')}/>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{borderRadius:20,width:'90%',height:'25%',backgroundColor:'gray'}}>
                            <VideoPlayer isFullscreen={true} style={{borderRadius:20}}  source={require('../../../assets/istanbulvideo.mp4')}/>
                        </View>

                        <View style={{flexDirection:'row',marginTop:screen.height<800 ? 10:20,justifyContent:'space-between',paddingHorizontal:17,height:'17%',width:'100%'}}>
                            <View style={{
                                width:'48%',
                                height:'100%',
                                backgroundColor:'#D8E9FE',
                                borderRadius:20,
                                justifyContent:'center',
                                paddingHorizontal:10,

                            }}>
                                <Text style={{
                                    fontFamily:'Poppins-ExtraBold',
                                    fontSize:10,
                                    textAlign: 'center',
                                }}>
                                    {I18n.t('noAdNoLimit')}
                                </Text>
                                <Text style={{
                                    fontFamily:'Poppins-Regular',
                                    fontSize:10,
                                    textAlign: 'center',
                                }}>
                                    {I18n.t('saveTime')}
                                </Text>

                                <FastImage
                                    style={{position: 'absolute',bottom:-10,left:-10,width:50,height:50}}
                                    source={require('../../../assets/istanbulicons.png')}/>
                            </View>
                            <View style={{
                                width:'48%',
                                height:'100%',
                                backgroundColor:'#D8E9FE',
                                borderRadius:20,
                                justifyContent:'center',
                                paddingHorizontal:10,
                            }}>
                                <Text style={{
                                    fontFamily:'Poppins-ExtraBold',
                                    fontSize:10,
                                    textAlign: 'center',
                                }}>
                                    {I18n.t('deleteUnecessary')}
                                </Text>
                                <Text style={{
                                    fontFamily:'Poppins-Regular',
                                    fontSize:10,
                                    textAlign: 'center',
                                }}>
                                    {I18n.t('deleteVideoDesc')}
                                </Text>
                                <FastImage
                                    style={{position: 'absolute',top:-10,left:10,width:30,height:30}}
                                    source={require('../../../assets/istanbulicons.png')}/>
                                <FastImage

                                    style={{position: 'absolute',bottom:-10,right:10,width:40,height:40}}
                                    source={require('../../../assets/istanbulicons.png')}/>
                            </View>
                        </View>
                        <Text style={{
                            fontFamily:'Poppins-ExtraBold',
                            fontSize:15,
                            textAlign: 'center',
                            width:'70%',
                            color:'#0171FA',
                            marginTop:screen.height<800 ?10:20,
                            marginBottom:screen.height<800 ?5:20,
                        }}>
                            {I18n.t('deleteExcess')}
                        </Text>

                        <View style={{
                            borderBottomWidth:1,
                            borderColor:'#EDEDED',
                            width:'90%',

                            flexDirection:'row',
                            paddingBottom:7,
                            alignItems:'center'
                        }}>
                            <FastImage
                                style={{width:30,height:30}}
                                source={require('../../../assets/istanbulcheck.png')}/>
                            <Text style={{marginLeft: 10,fontSize:15,fontFamily:'Poppins-SemiBold'}}>
                                {I18n.t('fastFind')}
                            </Text>
                        </View>
                        <View style={{
                            borderBottomWidth:1,
                            borderColor:'#EDEDED',
                            width:'90%',
                            flexDirection:'row',
                            paddingBottom:7,
                            alignItems:'center',
                            marginVertical:5,
                        }}>
                            <FastImage
                                style={{width:30,height:30}}
                                source={require('../../../assets/istanbulcheck.png')}/>
                            <Text style={{marginLeft: 10,fontSize:15,fontFamily:'Poppins-SemiBold'}}>
                                {I18n.t('cleanDuplicate')}
                            </Text>
                        </View>
                        <View style={{
                            borderBottomWidth:1,
                            borderColor:'#EDEDED',
                            width:'90%',
                            flexDirection:'row',
                            paddingBottom:7,
                            alignItems:'center',
                        }}>
                            <FastImage
                                style={{width:30,height:30}}
                                source={require('../../../assets/istanbulcheck.png')}/>
                            <Text style={{marginLeft: 10,fontSize:15,fontFamily:'Poppins-SemiBold'}}>
                                {I18n.t('cleanStorage')}
                            </Text>
                        </View>
                        <Text style={{fontSize:15,fontFamily:'Poppins-SemiBold',marginTop:10}}>
                            {subscriptions[0].productId.indexOf('trial') != -1 ?(
                                I18n.t('priceTrial',{price:subscriptions[0].localizedPrice,
                                    period:subscriptions[0].subscriptionPeriodUnitIOS == 'DAY' || subscriptions[0].subscriptionPeriodUnitIOS == 'WEEK' ? I18n.t('weekly'):subscriptions[0].subscriptionPeriodUnitIOS == 'MONTH' ? I18n.t('monthly') :I18n.t('yearly')
                                })
                            ):(
                                I18n.t('pricePaid',{price:subscriptions[0].localizedPrice,
                                period:subscriptions[0].subscriptionPeriodUnitIOS == 'DAY' || subscriptions[0].subscriptionPeriodUnitIOS == 'WEEK' ? I18n.t('weekly'):subscriptions[0].subscriptionPeriodUnitIOS == 'MONTH' ? I18n.t('monthly') :I18n.t('yearly')
                            })
                                )}

                        </Text>
                        {subscriptions[0].productId.indexOf('trial') != -1 || subscriptions[0].productId.indexOf('test') != -1? (

                            <Text style={styles.packageDescription}>{I18n.t('daysFree')}</Text>
                        ):(
                            <Text style={styles.packageDescription}>{I18n.t('getFullAccess')}</Text>

                        )}

                        <TouchableOpacity onPress={()=>{
                            if(subscriptions.length>0){
                                // subscriptions[0].localizedPrice

                                requestSubscription(subscriptions[0].productId)
                                setLoading(true)
                                setTimeout(()=>{
                                    setLoading(false)
                                },5000)
                            }
                        }} style={styles.buttonContainer}>
                                <Animated.View style={{
                                    zIndex:999,
                                    transform: [
                                        { rotate: '180deg'},

                                        {scaleX: translate},
                                        {scaleY: translate},
                                    ]
                                    ,marginTop:0,borderWidth:5,borderColor:'#707070',backgroundColor:'#0171FA',justifyContent: 'center',alignItems:'center',width:'100%',borderRadius: 10,paddingVertical: 15,paddingHorizontal:10}}>
                                    {!loading ? <Text style={styles.buttonTitle}>
                                        {subscriptions[0].productId.indexOf('trial') != -1 ? I18n.t('startTrial'):I18n.t('startMembership')}
                                    </Text>:<View style={{height:50,marginTop:-30}}>
                                        <Spinner color={'white'} size={'small'}/>
                                    </View>}



                                </Animated.View>

                        </TouchableOpacity>

                    </View>
                    <Modal isVisible={modal} onBackdropPress={()=>setModal(!modal)} style={{width:screen.width,height:screen.height,justifyContent:'flex-end'}} >
                        <View style={{position: 'absolute',width:screen.width,zIndex:999,top:20,left:10}}>
                            <TouchableOpacity onPress={()=>setModal(!modal)}>
                                <Image source={require('../../../assets/closex.png')} style={{width:20,height:20}}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{backgroundColor:'white',top:30,borderTopEndRadius:20,borderTopStartRadius:20,height:'90%',width:'90%'}}>

                            <WebView source={{uri:"https://cleanerlabapp.com/privacy.html"}} style={{flex:1,borderTopEndRadius:10,borderTopStartRadius:10}}/>
                        </View>
                    </Modal>
                    <View style={styles.footerContainer}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',width:screen.width/2}}>
                            <TouchableOpacity onPress={()=>setModal(!modal)}>

                                <Text style={styles.rightFooterText}>{I18n.t('subsRequirements')}</Text>
                            </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.rightFooterText}>{I18n.t('reBuy')}</Text>
                        </TouchableOpacity>
                        </View>
                        <TouchableOpacity>
                            <Text style={styles.leftFooterText}>
                                {subscriptions[0].productId.indexOf('trial')!=-1 ? (
                                    I18n.t('cancelAnyTimeLong',{price:subscriptions[0].localizedPrice,
                                        period:subscriptions[0].subscriptionPeriodUnitIOS == 'DAY' || subscriptions[0].subscriptionPeriodUnitIOS == 'WEEK' ? I18n.t('week'):subscriptions[0].subscriptionPeriodUnitIOS == 'MONTH' ? I18n.t('month') :I18n.t('year')
                                    })
                                ):(
                                    I18n.t('cancelAnyTimeShort',{price:subscriptions[0].localizedPrice,
                                        period:subscriptions[0].subscriptionPeriodUnitIOS == 'DAY' || subscriptions[0].subscriptionPeriodUnitIOS == 'WEEK' ? I18n.t('week'):subscriptions[0].subscriptionPeriodUnitIOS == 'MONTH' ? I18n.t('month') :I18n.t('year')
                                    })
                                )}
                            </Text>
                        </TouchableOpacity>
                        <View style={{position:'absolute',bottom:-50,height:50,zIndex:999}}>
                            <ScrollView showsVerticalScrollIndicator={false}>

                                <Text style={{ color:'#BFBFBF',
                                    fontFamily:'Roboto-Medium',
                                    fontSize:10,width:screen.width,textAlign:'center',paddingHorizontal:20,flexWrap:'wrap'}}>
                                    Information about the auto-renewable nature of the subscription: Your subscription automatically renews for $4.99 per week, $9.99 per month or $39.99 pre year at the
                                    end of 3-day trail period. Payment will be charged to iTunes Account at confirmation of purchase. Subscription automatically renews unless auto-renew is turned off at least 24-hours before the end of the current period. Account will be charged for renewal within 24-hours prior to the end of the current period. After the trial period, monthly subscription will start for $9,99 and weekly subscription will start for $4.99. Trials will be 3 days, after which the subscription will auto-renew. Any unused portion of a free trial period, if offered, will be forfeited when the user purchases a subscription to that publication, where applicable. You can cancel your subscription via this url: https://support.apple.com/en-us/HT202039

                                    Privacy Policy : https://cleanerlabapp.com/privacy.html
                                    Terms & EULA : https://cleanerlabapp.com/terms.html
                                </Text>
                            </ScrollView>

                        </View>
                    </View>
                </View>
            )



        }else{
            return(
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Spinner color={'blue'} size={'large'}/>
                </View>
            )
        }
    }else{
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Spinner color={'blue'} size={'large'}/>
            </View>
        )
    }


}
let styles= StyleSheet.create({
    mainContainer:{
        width:'95%',
        borderRadius: 20,
        height:screen.height<800 ?'90%':'90%',
        alignItems:'center',
        backgroundColor:'white',
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity:  0.16,
        shadowRadius: 1.51,
        elevation: 2
    },
    leftFooterText:{
        color:'#BFBFBF',
        fontFamily:'Roboto-Medium',
        fontSize:10,
        textAlign: 'center'
    },
    rightFooterText:{
        textDecorationLine:'underline',
        color:'#BFBFBF',
        fontFamily:'Roboto-Medium',
        fontSize:10,
        textAlign: 'center'
    },
    footerContainer:{
        position:'absolute',
        width:'100%',
        bottom:screen.height<800 ?5:20,
        alignItems: 'center'
    },
    buttonContainer:{
        width:'90%',

        marginTop:screen.height < 800 ? 5:10,
    },
    buttonTitle:{
        fontFamily:'Poppins-ExtraBold',
        fontSize:21,
        color:'white',
    },
    packageTitle:{
        fontFamily:'Roboto-Black',
        fontSize:17
    },
    packageDescription:{
        fontFamily:'Roboto-Regular',
        fontSize:16
    },
    packageInfoContainer:{
        alignItems:'center'
    },
    rightTopText:{
        fontFamily:'Roboto-Black',
        fontSize:14,
        color:'#0283FD'
    },
    rightBottomText:{
        fontFamily:'Roboto-Medium',
        fontSize:12,
        color:'gray'
    },
    itemRightContainer:{
        width:'70%',
        marginLeft:15,

    },
    featureItemContainer:{
      flexDirection:'row',
        alignItems:'center',
        marginVertical:15
    },
    featureIcon:{
        width:30,
        height:30,
        marginTop:5
    },
    featureIconText:{
      fontFamily:'Roboto-Bold',
      fontSize:14
    },
    featureIconContainer:{
        alignItems:'center',
        justifyContent:'center',
        borderRadius:15,
        paddingVertical:10,
        paddingHorizontal:15,
        backgroundColor:'white',
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity:  0.18,
        shadowRadius: 4.59,
        elevation: 5
    },
    featureContainer:{
      paddingHorizontal:20,

      marginVertical:screen.height < 800 ? 20: 80,
    },
   title:{
       textAlign:'center',
       fontFamily:'Roboto-Bold',
       fontSize:25,
       width:'70%'
   },
    container:{
        flex:1,
        backgroundColor: '#EDEDED',
        paddingTop:screen.height < 800 ? 20: 40,
        alignItems:'center',

    },


})
export default observer(IstanbulPremium)
