import React, {useState,useEffect,useRef} from 'react'
import {
    Text,
    View,
    StyleSheet,
    Image,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Platform, Alert, Animated, Easing
} from "react-native";
import userStore from "../../store/userStore";
import {observer} from "mobx-react";
import { PageSlider } from '@pietile-native-kit/page-slider';
import { FadeView } from '@pietile-native-kit/fade-view';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {requestPurchase, requestSubscription, useIAP} from 'react-native-iap';
import {Spinner} from "native-base";
import I18n from '../../../lang/index';
import FastImage from "react-native-fast-image";
import axios from "axios";
import {API_BASE, key} from "../../constants";
import { RewardedAd, RewardedAdEventType, BannerAdSize, BannerAd, TestIds } from 'react-native-google-mobile-ads';
import WebView from "react-native-webview";
import Modal from "react-native-modal";
import LinearGradient from "react-native-linear-gradient";
const rewardedId =__DEV__ ? TestIds.REWARDED
    : 'ca-app-pub-6820745768279674/2274584287'
const rewarded = RewardedAd.createForAdRequest(rewardedId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
});
import { AppEventsLogger } from "react-native-fbsdk-next";

const screen = Dimensions.get('window')
const {width, height} = Dimensions.get('window');
const circleSize = width / 3;
const Flash = ({navigation,route})=>{
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
        inputRange: [0.0, 0.5],
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

    const [selected,setSelected]=useState()
    const [now,setNow]=useState(1)
    const [active,setActive]=useState(1)
    const [selectedPage, setSelectedPage] = useState(0);

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

    useEffect(()=>{
        // changeIt()
        userStore.premiumGate()
    },[])



    let renderItem = ({item, index}) => {
        return (

            <View style={{backgroundColor:'#F2F5FF',height:'100%',alignItems:'center',paddingVertical:10,borderRadius:20}}>
                <View style={{flexDirection: 'row'}}>
                    {[1,2,3,4,5].map((item)=>{
                        return(
                            <Image key={item} source={require('../../../assets/star.png')} style={{width:20,resizeMode:'contain',height:20}}/>
                        )
                    })}
                </View>
                <Text style={{fontFamily:'Roboto-Medium',color:'#696B7F',fontSize:12}}>{item.text}</Text>
            </View>
        );
    }
    let carouselItems= I18n.t('londonComments')



    if(userStore.subs.ios != undefined) {


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
                                axios.post(`${API_BASE}/api/user/process?token=${userStore.token}&key=${key}`,{
                                    deviceId:userStore.deviceId,
                                    productId:purchase.productId,
                                    purchaseToken:purchase.transactionReceipt,
                                    orderId:purchase.transactionId
                                }, headers).then(data=>{

                                    if(data.data.status){
                                        userStore.setPremium()
                                        navigation.goBack()
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

        let title = 'HOW YOUR FREE TRIAL WORKS'

        if (subscriptions.length > 0) {



            return(
                <View  style={styles.container}>
                    <View style={{width:'100%',position:'absolute',top:50,left:30,zIndex:999}}>
                        <TouchableOpacity onPress={()=>{
                            if(userStore.deletePopup){
                                navigation.goBack()

                                // showAd()
                            }else{

                                navigation.goBack()
                            }
                        }}>
                            <FastImage source={require('../../../assets/closepremium.png')} style={{width:25,height:25}}/>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.headerText}>{active==1?I18n.t('howWorksFreeTrial'):I18n.t('accessUnlimited')}</Text>
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
                    {active==2 ? (
                        <View style={{justifyContent:'center',alignItems:'center',marginTop:-50}}>
                            <View style={{justifyContent:'center',alignItems:'center',marginLeft: 20}}>
                                <View style={styles.featureContainer}>
                                    <View style={styles.premiumLeft}>
                                        <Image source={require('../../../assets/premium1.png')} style={styles.premiumImage}/>

                                    </View>
                                    <View style={styles.featureRight}>
                                        <Text style={[styles.featureTitle,{color:userStore.premiumCount==1 ? '#2007FF':'black'}]}>{I18n.t('scanSimilars')}</Text>

                                    </View>
                                </View>
                                <View style={styles.featureContainer}>
                                    <View style={styles.premiumLeft}>
                                        <Image source={require('../../../assets/premium2.png')} style={styles.premiumImage}/>

                                    </View>
                                    <View style={styles.featureRight}>
                                        <Text style={[styles.featureTitle,{color:userStore.premiumCount==2 ? '#2007FF':'black'}]}>{I18n.t('noAdNoLimit')}</Text>

                                    </View>
                                </View>
                                <View style={styles.featureContainer}>

                                    <View style={styles.premiumLeft}>
                                        <Image source={require('../../../assets/premium3.png')} style={styles.premiumImage}/>
                                    </View>
                                    <View style={styles.featureRight}>
                                        <Text style={[styles.featureTitle,{color:userStore.premiumCount==3 ? '#2007FF':'black'}]}>{I18n.t('takeTime')}</Text>

                                    </View>
                                </View>

                            </View>
                            <View style={{height:'22%',marginTop:20,marginBottom:-30}}>

                                <Carousel
                                    layout={"default"}
                                    data={carouselItems}
                                    sliderWidth={Dimensions.get('window').width*0.80}
                                    itemWidth={300}
                                    renderItem={renderItem}
                                />
                            </View>
                            {/*<View style={styles.premiumCommentContainer}>*/}

                            {/*</View>*/}
                        </View>

                    ):(
                        <View style={{justifyContent:'center',alignItems:'center',marginLeft: 20}}>
                            <View style={styles.featureContainer}>
                                <View style={[styles.featureLeft,{backgroundColor:userStore.premiumCount==1 ? '#2007FF':'black'}]}>
                                    <Text style={styles.featureNumber}>1</Text>
                                    <Image source={require('../../../assets/king.png')} style={styles.featureImage}/>

                                </View>
                                <View style={styles.featureRight}>
                                    <Text style={[styles.featureTitle,{color:userStore.premiumCount==1 ? '#2007FF':'black'}]}>{I18n.t('getToday')}</Text>
                                    <Text style={styles.featureText}>{I18n.t('getTodayDesc')}</Text>

                                </View>
                            </View>
                            <View style={styles.featureContainer}>
                                <View style={[styles.featureLeft,{backgroundColor:userStore.premiumCount==2 ? '#2007FF':'black'}]}>
                                    <Text style={styles.featureNumber}>2</Text>
                                    <Image source={require('../../../assets/king.png')} style={styles.featureImage}/>

                                </View>
                                <View style={styles.featureRight}>
                                    <Text style={[styles.featureTitle,{color:userStore.premiumCount==2 ? '#2007FF':'black'}]}>{I18n.t('remindTomorrow')}</Text>
                                    <Text style={styles.featureText}>{I18n.t('remindTomorrowDesc')}</Text>

                                </View>
                            </View>
                            <View style={styles.featureContainer}>
                                <View style={[styles.featureLeft,{backgroundColor:userStore.premiumCount==3 ? '#2007FF':'black'}]}>
                                    <Text style={styles.featureNumber}>3</Text>
                                    <Image source={require('../../../assets/king.png')} style={styles.featureImage}/>
                                </View>
                                <View style={styles.featureRight}>
                                    <Text style={[styles.featureTitle,{color:userStore.premiumCount==3 ? '#2007FF':'black'}]}>{I18n.t('trialEnd')}</Text>
                                    <Text style={styles.featureText}>
                                        {I18n.t('subsWillStart',
                                            {month:I18n.t('months')[new Date(new Date().getTime()+3*24*60*60*1000).toLocaleString('default', { month: 'numeric' })-1],
                                                day:new Date(new Date().getTime()+3*24*60*60*1000).getDate()})}
                                    </Text>
                                </View>
                            </View>
                        </View>


                    )}

                    <TouchableOpacity onPress={()=>{
                        setActive(1)
                        setSelected(subscriptions[1])

                    }} style={{width:'100%',alignItems:'center',height:'10%'}} >
                        <View style={active == 1 ? styles.selectContainerActive:styles.selectContainer}>
                            <Text style={styles.selectTitle}>
                                {I18n.t('autoRenewableShort',{price:subscriptions[1].localizedPrice,
                                    period:subscriptions[1].subscriptionPeriodUnitIOS == 'DAY' || subscriptions[1].subscriptionPeriodUnitIOS == 'WEEK' ? I18n.t('week'):subscriptions[1].subscriptionPeriodUnitIOS == 'MONTH' ? I18n.t('month') :I18n.t('year')
                                })}
                            </Text>
                            {subscriptions[1].productId.indexOf('trial') != -1 ? (
                                <Text style={styles.selectText}>{I18n.t('daysFree')}</Text>

                            ):(
                                <Text style={styles.selectText}>{I18n.t('getFullAccess')}</Text>

                                )}

                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        setActive(2)
                        setSelected(subscriptions[0])
                    }} style={{width:'100%',alignItems:'center',height:'10%',marginVertical:20}} >
                        <View style={active == 2 ? styles.selectContainerActive:styles.selectContainer}>
                            <Text style={styles.selectTitle}>
                                {I18n.t('autoRenewableShort',{price:subscriptions[0].localizedPrice,
                                    period:subscriptions[0].subscriptionPeriodUnitIOS == 'DAY' || subscriptions[0].subscriptionPeriodUnitIOS == 'WEEK' ? I18n.t('week'):subscriptions[0].subscriptionPeriodUnitIOS == 'MONTH' ? I18n.t('month') :I18n.t('year')
                                })}
                            </Text>
                            {subscriptions[0].productId.indexOf('trial') != -1 ? (
                                <Text style={styles.selectText}>{I18n.t('daysFree')}</Text>

                            ):(
                                <Text style={styles.selectText}>{I18n.t('getFullAccess')}</Text>

                            )}
                            <ImageBackground source={require('../../../assets/earnflash.png')} style={styles.flashImage}>

                                <Text style={{fontFamily:'Roboto-Black',fontSize:13,transform: [{ rotate: '-10deg'}]}}>{I18n.t('percent')} </Text>
                                <Text style={{fontFamily:'Roboto-Black',fontSize:12,marginTop:-2,textAlign: 'right',transform: [{ rotate: '-10deg'}]}}>{I18n.t('earn')} </Text>

                            </ImageBackground>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={()=>{
                            if(!selected){
                                setSelected(subscriptions[1])

                                requestPurchase(subscriptions[1].productId)

                            }else{

                            requestPurchase(selected.productId)
                            }
                            setLoading(true)
                            setTimeout(()=>{
                                setLoading(false)
                            },5000)
                        }}
                        style={{backgroundColor:'#2007FF',borderRadius:50,marginTop:screen.height<800 ? 20:30,width:screen.width*0.80}}>

                            <LinearGradient colors={['#0012FF', '#000DC8', '#00098B']} style={{
                                alignItems:'center',width:'100%',borderRadius: 100,paddingHorizontal:15,paddingVertical: 20}}>
                                <Animated.View style={{
                                    zIndex:999,
                                    transform: [
                                        { rotate: '180deg'},
                                        {scaleX: translate},
                                        {scaleY: translate},
                                    ],
                                }}>

                                    {!loading?  <Text style={styles.premiumButtonText}>
                                            {selected ?
                                                selected.productId.indexOf('trial') != -1?I18n.t('startTrial'):I18n.t('startMembership')
                                                :
                                                subscriptions[1].productId.indexOf('trial') != -1 ?I18n.t('startTrial'):I18n.t('startMembership')

                                            }</Text>:
                                        <View style={{height:50,marginTop:-30}}>
                                            <Spinner color={'white'} size={'small'}/>
                                        </View>}





                        </Animated.View>
                            </LinearGradient>

                    </TouchableOpacity>
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
    leftFooterText:{
        textDecorationLine:'underline',
        color:'#000000',
        fontFamily:'Roboto-Medium',
        fontSize:13
    },
    rightFooterText:{
        textDecorationLine:'underline',
        color:'#000000',
        fontFamily:'Roboto-Medium',
        fontSize:13
    },
    footerContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:20,
        position:'absolute',
        width:'100%',
        bottom:screen.height<800 ?40:70,
    },
    premiumCommentContainer:{
      width:Dimensions.get('window').width*0.80,
      height:100,
      backgroundColor:'#F2F5FF',
        borderRadius:20
    },
    premiumButtonText:{
        fontFamily:'Roboto-Medium',
        color:'white',
        fontSize:22
    },
    premiumLeft:{
        width:'13%',
        height: 25,
        borderRadius:20,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight:10
    },
    premiumImage:{
      resizeMode:'contain',
      width:60,
      height:60
    },
    flashImage:{
        position: 'absolute',
        paddingTop:13,
        paddingHorizontal:5,
        width:50,
        height:50,
        right:-20,
        top:-20
    },

    selectText:{
        fontFamily:'Roboto-Regular',
        fontSize:14

    },
    selectTitle:{
        fontFamily:'Roboto-Black',
        fontSize:15
    },
    selectContainer:{
        width:'80%',
        height:'100%',
        borderRadius: 20,
        backgroundColor:'#F2F5FF',
        padding:20,
        justifyContent:'center',
        marginVertical: 20

    },
    selectContainerActive:{
        width:'80%',
        height:'100%',
        borderRadius: 20,borderWidth:1,
        backgroundColor:'#D7DFF9',
        padding:20,
        justifyContent:'center',
        marginVertical: 20,
        borderColor:'#2007FF',
        shadowColor: "#000",
        shadowOffset:{
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
    featureText:{
        fontFamily:'Roboto-Medium',

        color:'#696B7F'
    },
    featureTitle:{
        fontFamily:'Roboto-Black',
        fontSize:15,
        marginBottom:10,
    },
    featureNumber:{
        color:'white',
        fontWeight: '900',
        fontSize: 15
    },
    featureImage:{
        width: 45,
        height:45,
        position:'absolute',
        left:-20,
        top:-14
    },
    featureRight:{
        width:'60%',
        marginLeft:10,
        marginTop:1
    },
    featureLeft:{
        backgroundColor: 'black',
        width:'13%',
        height: 25,
        borderRadius:20,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight:10
    },
    container:{
        flex:1,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:20
    },
    headerText:{
        fontFamily:'Roboto-Black',
        fontSize:27,
        textAlign:'center',
        width:'90%',
        marginBottom: 20
    },
    featureContainer:{
        flexDirection:'row',
        marginVertical:screen.height>800 ? 15:5,
        justifyContent:'center'
    }


})

export default observer(Flash)
