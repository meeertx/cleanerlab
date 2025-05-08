import React, {useState,useEffect,useRef} from 'react'
import {
    View,
    StyleSheet,
    Image,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Text,
    Switch,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    FlatList,
    ImageBackgroundComponent,
    TouchableOpacityComponent,
    Platform,
    Alert,
    Dimensions,
    Animated, Easing
} from "react-native";
import {observer} from "mobx-react";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import {isAsync} from "@babel/core/lib/gensync-utils/async";
import {requestPurchase, requestSubscription, useIAP} from 'react-native-iap';
import AsyncStorage from "@react-native-community/async-storage";
import userStore from "../../store/userStore";
import {Spinner} from "native-base";
import axios from "axios";
import {API_BASE, key} from "../../constants";
import I18n from '../../../lang/index';
import { RewardedAd, RewardedAdEventType, BannerAdSize, BannerAd, TestIds } from 'react-native-google-mobile-ads';
import Modal from "react-native-modal";
import WebView from "react-native-webview";
const rewardedId =__DEV__ ? TestIds.REWARDED
    : 'ca-app-pub-6820745768279674/2274584287'
const rewarded = RewardedAd.createForAdRequest(rewardedId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
});
const screen = Dimensions.get('window')
const {width, height} = Dimensions.get('window');
const circleSize = width / 3;
import { AppEventsLogger } from "react-native-fbsdk-next";

const ParisPremium = ({navigation,route}) =>{

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

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            // Do something
            // alert('gesture')
            if(userStore.deletePage!='' && userStore.adActive){

            showAd()
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
    const [isEnabled, setIsEnabled] = useState(false);
    const [active,setActive]=useState(0)
    const toggleSwitch = () => {
        setIsEnabled(!isEnabled)
        if(active==0){
            setActive(1)
        }else{
            setActive(0)
        }
    };


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
    if (subscriptions.length > 0) {



        return(
            <View style={styles.container}>
                <View style={{width:'100%',position:'absolute',top:75,left:30}}>
                    <TouchableOpacity onPress={()=>{
                        if(userStore.deletePopup){
                            // showAd()
                            navigation.goBack()

                        }else{

                        navigation.goBack()
                        }
                    }}>
                        <FastImage source={require('../../../assets/closepremium.png')} style={{width:25,height:25}}/>
                    </TouchableOpacity>
                </View>
                <Image source={require('../../../assets/pariscoffee.png')} style={{width:screen.height<800 ? 300:350,height:screen.height<800 ? 200:300,left:screen.height<800 ? 70:30,resizeMode:'contain'}} />

                <Text style={styles.title}>{I18n.t('equalCoffee',{price:isEnabled?subscriptions[1].localizedPrice:subscriptions[0].localizedPrice})}</Text>
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
                <View style={styles.featureContainer}>
                    <Text style={styles.featureText}>
                        {I18n.t('unlimitedDelete')}
                    </Text>
                    <TouchableOpacity onPress={()=>{
                        navigation.goBack()
                    }}>
                        <Text style={styles.featureMidText}>
                            {I18n.t('orGoWithPremium')}
                        </Text>

                    </TouchableOpacity>

                    <Text style={styles.featureBottomText}>
                        {I18n.t('autoRenewable',{price:isEnabled?subscriptions[1].localizedPrice:subscriptions[0].localizedPrice,
                            period:subscriptions[active].subscriptionPeriodUnitIOS == 'DAY' || subscriptions[active].subscriptionPeriodUnitIOS == 'WEEK' ? I18n.t('week'):subscriptions[active].subscriptionPeriodUnitIOS == 'MONTH' ? I18n.t('month') :I18n.t('year')
                        })}
                    </Text>

                </View>

                <View style={styles.sureContainer}>

                    {isEnabled ? (
                            <Text style={styles.packageDescription}>{I18n.t('trialEnabled')}</Text>

                        )
                        :(<View>

                            <Text style={styles.packageTitle}>{I18n.t('notSureYet')}</Text>
                            <Text style={styles.packageDescription}>{I18n.t('enableTrial')}</Text>
                        </View>)}

                    <Switch
                        trackColor={{ false: "#497CAC", true: "#7AF800" }}
                        thumbColor={isEnabled ? "white" : "white"}
                        ios_backgroundColor="#497CAC"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                <Animated.View style={[{
                    zIndex:999,
                    transform: [
                        { rotate: '180deg'},
                        {scaleX: translate},
                        {scaleY: translate},
                    ],
                    width:'100%',
                    alignItems:'center'
                }]} >
                    <TouchableOpacity onPress={()=>{
                        if(isEnabled){
                            requestPurchase(subscriptions[1].productId)

                        }else{
                            requestPurchase(subscriptions[0].productId)
                        }
                        setLoading(true)
                        setTimeout(()=>{
                            setLoading(false)
                        },5000)
                    }} style={styles.buttonContainer}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#58A2FB', '#4A91E9', '#3787E2',]} style={{alignItems:'center',width:'100%',borderRadius: 50,paddingHorizontal:15,paddingVertical: screen.height<800 ? 15:25}}>
                            <Animated.View style={{
                                zIndex:999,
                                transform: [
                                    { rotate: '180deg'},
                                    {scaleX: translate},
                                    {scaleY: translate},
                                ],
                            }}>
                                {!loading ?

                            <Text style={styles.buttonTitle}>{isEnabled ? I18n.t('try3Days'):I18n.t('getFullAccess')}</Text>
                                    :

                                <View style={{height:50,marginTop:-30}}>
                                    <Spinner color={'white'} size={'small'}/>
                                </View>
                                }
                            </Animated.View>
                        </LinearGradient>
                    </TouchableOpacity>
                </Animated.View>

                <View style={styles.footerContainer}>
                    <TouchableOpacity onPress={()=>setModal(!modal)}>
                        <Text style={styles.leftFooterText}>{I18n.t('subsRequirements')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.rightFooterText}>{I18n.t('reBuy')}</Text>
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
            <View style={{flex:1,backgroundColor:userStore.activeTheme.background,justifyContent:'center',alignItems:'center'}}>
                <Spinner color={'blue'} size={'large'}/>
            </View>
        )
    }

    // if(userStore.subs.ios != undefined && userStore.subs.android.length>0) {
    //
    //
    //
    //
    //
    //
    //
    // }else{
    //     return(
    //         <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    //             <Spinner color={'blue'} size={'large'}/>
    //         </View>
    //     )
    // }




}
let styles= StyleSheet.create({
    featureBottomText:{
        fontSize:13,
        color:'#063052',
        fontFamily:'Roboto-Medium',
        textAlign:'center',
        textDecorationLine:'underline',
    },
    featureMidText:{
        fontSize:15,
        color:'#063052',
        fontFamily:'Roboto-Medium',
        textAlign:'center',
        marginVertical:15,
        textDecorationLine:'underline',
    },
    featureText:{
        fontSize:15,
        color:'#063052',
        fontFamily:'Roboto-Medium',
        textAlign:'center',
    },
    sureContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:15,
        paddingVertical:15,
        width:'90%',
        backgroundColor:'white',
        borderRadius:15,
        shadowColor: "#000",
        shadowOffset:{
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    leftFooterText:{
        textDecorationLine:'underline',
        color:'#2D4454',
        fontFamily:'Roboto-Medium',
        fontSize:13,

    },
    rightFooterText:{
        textDecorationLine:'underline',
        color:'#2D4454',
        fontFamily:'Roboto-Medium',
        fontSize:13
    },
    footerContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:20,
        position:'absolute',
        width:'100%',
        bottom:screen.height<800 ?30:60,
    },
    buttonContainer:{
        width:'90%',
        marginTop:30
    },
    buttonTitle:{
        fontFamily:'Roboto-Medium',
        fontSize:20,
        color:'white',
    },
    packageTitle:{
        fontFamily:'Roboto-Medium',
        fontSize:14,
        color:'#7A7A7A'
    },
    packageDescription:{
        fontFamily:'Roboto-Black',
        fontSize:14,
        color:'#7A7A7A'
    },
    packageInfoContainer:{
        alignItems:'center'
    },
    rightTopText:{
        fontFamily:'Roboto-Bold',
        fontSize:15,
        color:'#0087FF'
    },
    rightBottomText:{
        fontFamily:'Roboto-Medium',
        fontSize:15,
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
        marginVertical:30,
    },
    title:{
        textAlign:'center',
        fontFamily:'Roboto-Black',
        fontSize:20,
        width:'70%'
    },
    container:{
        flex:1,
        backgroundColor: '#EFF4FF',
        paddingBottom:50,
        alignItems:'center',
        justifyContent:'center'
    },


})
export default observer(ParisPremium)
