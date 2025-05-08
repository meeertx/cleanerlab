import React, {useState, useEffect, useRef, useCallback} from 'react'
import {
    View,
    StyleSheet,
    Image,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Text, Animated,
    ImageBackground, Alert,
    ScrollView,
    TouchableOpacity, FlatList, ImageBackgroundComponent, TouchableOpacityComponent, Dimensions, Platform, Easing
} from "react-native";
import {observer} from "mobx-react";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import userStore from "../../store/userStore";
import Carousel from "react-native-snap-carousel";
import  LottieView from 'lottie-react-native';
import  Lottie from 'lottie-react-native';
import Animation from 'lottie-react-native';
import I18n from '../../../lang/index';
import {Spinner} from "native-base";
import axios from "axios";
import {API_BASE, key} from "../../constants";
import {requestPurchase, requestSubscription, useIAP} from 'react-native-iap';
import { RewardedAd, RewardedAdEventType, BannerAdSize, BannerAd, TestIds } from 'react-native-google-mobile-ads';
    const rewardedId =__DEV__ ? TestIds.REWARDED
        : 'ca-app-pub-6820745768279674/2274584287'
const rewarded = RewardedAd.createForAdRequest(rewardedId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
});
import { AppEventsLogger } from "react-native-fbsdk-next";

const {width, height} = Dimensions.get('window');
const circleSize = width / 3;
const LondonPremium = ({navigation,route}) =>{

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

    const {
        connected,
        products,
        subscriptions,
        getProducts,
        getSubscriptions,
        setSubscriptions,
        finishTransaction,
        currentPurchase,
        currentPurchaseError,
    } = useIAP();

    // useEffect(() => {
    //     animationRef.current?.play()
    //
    //     // Or set a specific startFrame and endFrame with:
    //     animationRef.current?.play(30, 120);
    // }, [])
    let title= 'CleanerLab'
    let carouselItems= I18n.t('londonComments')
    const screen = Dimensions.get('window')

    const [selected,setSelected]=useState()

    const [now,setNow]=useState(1)
    const [active,setActive]=useState(1)
    const [selectedPage, setSelectedPage] = useState(0);
    const [which,setWhich]=useState(1)
    const [freeIndex,setFreeIndex]=useState(0)
    const [subs,setSubs]=useState([])


    useEffect(()=>{

        // changeIt()
        userStore.premiumGate()
    },[])

    let fadeAnim = useRef(new Animated.Value(0.2)).current  // Initial value for opacity: 0
    let fadeAnimx = useRef(new Animated.Value(1)).current  // Initial value for opacity: 0


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

    let changeWhich=async (index)=>{
        try{
            Animated.timing(
                fadeAnimx,
                {
                    toValue: 0,
                    duration: 0,
                }
            ).start();
            setWhich(index)
            setTimeout(()=>{
                Animated.timing(
                    fadeAnimx,
                    {
                        toValue: 1,
                        duration: 2000,
                    }
                ).start();
            },250)


        }catch (e) {

        }

    }
    setTimeout(()=>{
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 3000,
            }
        ).start();
    },100)
    // useEffect(() => {
    //
    // }, [fadeAnim])
    let renderItem = ({item, index}) => {
        return (
            <View style={{height:'100%',alignItems:'center',borderRadius:20}}>
                <View style={{flexDirection: 'row'}}>
                    {[1,2,3,4,5].map((item)=>{
                        return(
                            <Image key={item} source={require('../../../assets/star.png')} style={{width:20,resizeMode:'contain',height:20}}/>
                        )
                    })}
                </View>
                <Text style={{fontFamily:'Roboto-Medium',color:'white',fontSize:12,textAlign:'center'}}>{item.text}</Text>
            </View>
        );
    }

    if(userStore.subs.ios != undefined){

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

            // setSubs([subscriptions])
        }, [currentPurchase, finishTransaction]);

        // useEffect(())
        if (subscriptions.length > 0){
            // setSubs(subscriptions)
            let array = subscriptions
            function array_move(arr, old_index, new_index) {
                if (new_index >= arr.length) {
                    var k = new_index - arr.length + 1;
                    while (k--) {
                        arr.push(undefined);
                    }
                }
                arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
                return arr; // for testing
            };
            //
            array.find((it,indis)=>{
                // alert(JSON.stringify(it))

                if(it.subscriptionPeriodUnitIOS == 'YEAR'){
                    // alert(true)
                    let newArr = array_move(array, indis, 2)
                    // alert(JSON.stringify(newArr))
                    // setSubs(array)
                    array = newArr
                    return true
                }

                if(it.productId.indexOf('trial') != -1){
                    // alert(true)
                    let newArr = array_move(array, indis, 1)
                    // alert(JSON.stringify(newArr))
                    // setSubs(array)
                    array = newArr
                    return true
                }
            })

            return(
                <View style={styles.container}>

                    <Image source={require('../../../assets/londonbackground.png')} style={{top:-50,height:'70%',width:'180%',position:'absolute',resizeMode:'center',zIndex:-1}} />
                    <View style={styles.footerContainer}>
                        <TouchableOpacity onPress={()=>{
                            if(userStore.deletePopup){
                                // showAd()
                                navigation.goBack()


                            }else{

                                navigation.goBack()
                            }
                        }}>
                            <FastImage source={require('../../../assets/closepremium.png')} style={{width:30,height:30}}/>
                        </TouchableOpacity>

                    </View>

                    <Text style={styles.title}>{title}</Text>
                    {/*{userStore.screen &&             <Text style={styles.title}>{userStore.screen.height} - {userStore.screen.width}</Text>*/}
                    {/*}*/}

                    <View style={styles.featureContainer}>

                        <View style={{justifyContent:'center',alignItems:'center',marginTop:-50}}>
                            <View style={{justifyContent:'center',alignItems:'center',marginLeft: 20,marginTop:20}}>
                                <View style={styles.featureContainerx}>
                                    <View style={styles.premiumLeft}>
                                        <Image source={require('../../../assets/premium1.png')} style={styles.premiumImage}/>

                                    </View>
                                    <View style={styles.featureRight}>
                                        <Text style={styles.featureTitle}>{I18n.t('scanSimilars')}</Text>

                                    </View>
                                </View>
                                <View style={styles.featureContainerx}>
                                    <View style={styles.premiumLeft}>
                                        <Image source={require('../../../assets/premium2.png')} style={styles.premiumImage}/>

                                    </View>
                                    <View style={styles.featureRight}>
                                        <Text style={styles.featureTitle}>{I18n.t('noAdNoLimit')}</Text>

                                    </View>
                                </View>
                                <View style={styles.featureContainerx}>

                                    <View style={styles.premiumLeft}>
                                        <Image source={require('../../../assets/premium3.png')} style={styles.premiumImage}/>
                                    </View>
                                    <View style={styles.featureRight}>
                                        <Text style={styles.featureTitle}>{I18n.t('takeTime')}</Text>

                                    </View>
                                </View>

                            </View>
                            <View style={{height:'25%',marginTop:20,marginBottom:-50}}>

                                <Carousel
                                    layout={"default"}
                                    autoplay={true}
                                    loop={true}

                                    data={carouselItems}
                                    sliderWidth={Dimensions.get('window').width*0.80}
                                    itemWidth={300}
                                    renderItem={renderItem}
                                />
                            </View>
                            {/*<View style={styles.premiumCommentContainer}>*/}

                            {/*</View>*/}
                        </View>


                    </View>
                    <View style={styles.mainContainer}>
                        {array.map((item,index)=>{
                            console.log(item)




                            if(which==index){
                                return(
                                    <TouchableWithoutFeedback onPress={()=> {


                                    }}>

                                        <Animated.View style={[styles.mainsideContainerActive,{opacity:fadeAnimx,backgroundColor:'white'}]}>


                                            {item.productId.indexOf('trial') != -1 ?
                                                (<LinearGradient colors={['#008CF5', '#4154FF', '#6F2EFF']} style={{paddingVertical:5,alignItems:'center',width:'100%',height:'100%',borderRadius:10}}>

                                                    <Text style={styles.packageTitleActive}>{I18n.t('popular')}</Text>
                                                    <View style={styles.packageDayContainerActive}>
                                                        <Text style={styles.packageDayActive}>3</Text>
                                                        <Text style={styles.packageDayTextActive}>{I18n.t('freeDays')}</Text>
                                                    </View>
                                                    <View style={styles.packageFooterContainerActive}>
                                                        <Text style={styles.packageFooterTextActive}>
                                                            {I18n.t('autoRenewableUltraShort',{price:item.localizedPrice,
                                                                period:item.subscriptionPeriodUnitIOS == 'DAY' ||item.subscriptionPeriodUnitIOS == 'WEEK' ? I18n.t('week'):item.subscriptionPeriodUnitIOS == 'MONTH' ? I18n.t('month') :I18n.t('year')
                                                            })}
                                                        </Text>

                                                    </View>
                                                </LinearGradient>):
                                                item.subscriptionPeriodUnitIOS == 'MONTH' ?
                                                    (<LinearGradient colors={['#008CF5', '#4154FF', '#6F2EFF']} style={{paddingVertical:5,alignItems:'center',width:'100%',height:'100%',borderRadius:10}}>

                                                            <Text style={styles.packageTitleActive}>{index ==0 ? I18n.t('save60'):index==1? I18n.t('popular'):I18n.t('save80')}</Text>
                                                            <View style={styles.packageDayContainerActive}>
                                                                <Text style={[styles.packageDayTextActive,{fontSize: 12}]}>{item.localizedPrice.substr(0,1)}{I18n.t('autoRenewableUltraShort',{price:(item.price/4).toFixed(1),
                                                                    period:I18n.t('week')
                                                                })}</Text>
                                                            </View>
                                                            <View style={styles.packageFooterContainerActive}>
                                                                <Text style={styles.packageFooterTextActive}>
                                                                    {I18n.t('autoRenewableUltraShort',{price:item.localizedPrice,
                                                                        period:item.subscriptionPeriodUnitIOS == 'DAY' ||item.subscriptionPeriodUnitIOS == 'WEEK' ? I18n.t('week'):item.subscriptionPeriodUnitIOS == 'MONTH' ? I18n.t('month') :I18n.t('year')
                                                                    })}
                                                                </Text>

                                                            </View>
                                                        </LinearGradient>

                                                    ): item.subscriptionPeriodUnitIOS == 'DAY' || item.subscriptionPeriodUnitIOS == 'WEEK' ?
                                                        (<LinearGradient colors={['#008CF5', '#4154FF', '#6F2EFF']} style={{paddingVertical:5,alignItems:'center',width:'100%',height:'100%',borderRadius:10}}>

                                                                <Text style={styles.packageTitleActive}>{index ==0 ? I18n.t('save60'):index==1? I18n.t('popular'):I18n.t('save80')}</Text>
                                                                <View style={styles.packageDayContainerActive}>
                                                                    <Text style={[styles.packageDayTextActive,{fontSize: 12}]}>{item.localizedPrice.substr(0,1)}{I18n.t('autoRenewableUltraShort',{price:item.price,
                                                                        period:I18n.t('week')
                                                                    })}</Text>
                                                                </View>
                                                                <View style={styles.packageFooterContainerActive}>
                                                                    <Text style={styles.packageFooterTextActive}>
                                                                        {I18n.t('autoRenewableUltraShort',{price:item.localizedPrice,
                                                                            period:item.subscriptionPeriodUnitIOS == 'DAY' ||item.subscriptionPeriodUnitIOS == 'WEEK' ? I18n.t('week'):item.subscriptionPeriodUnitIOS == 'MONTH' ? I18n.t('month') :I18n.t('year')
                                                                        })}
                                                                    </Text>

                                                                </View>
                                                            </LinearGradient>

                                                        )
                                                        :

                                                        (
                                                        <LinearGradient colors={['#008CF5', '#4154FF', '#6F2EFF']} style={{paddingVertical:5,alignItems:'center',width:'100%',height:'100%',borderRadius:10}}>

                                                            <Text style={styles.packageTitleActive}>{index ==0 ? I18n.t('save60'):index==1? I18n.t('popular'):I18n.t('save80')}</Text>
                                                            <View style={styles.packageDayContainerActive}>
                                                                <Text style={[styles.packageDayTextActive,{fontSize: 12}]}>{item.localizedPrice.substr(0,1)}{I18n.t('autoRenewableUltraShort',{price:(item.price/48).toFixed(0),
                                                                    period:I18n.t('week')
                                                                })}</Text>
                                                            </View>
                                                            <View style={styles.packageFooterContainerActive}>
                                                                <Text style={styles.packageFooterTextActive}>
                                                                    {I18n.t('autoRenewableUltraShort',{price:item.localizedPrice,
                                                                        period:item.subscriptionPeriodUnitIOS == 'DAY' ||item.subscriptionPeriodUnitIOS == 'WEEK' ? I18n.t('week'):item.subscriptionPeriodUnitIOS == 'MONTH' ? I18n.t('month') :I18n.t('year')
                                                                    })}
                                                                </Text>

                                                            </View>
                                                        </LinearGradient>
                                                    )}


                                        </Animated.View>
                                    </TouchableWithoutFeedback>

                                )
                            }else{

                                return(
                                    <TouchableWithoutFeedback onPress={()=> {
                                        changeWhich(index)
                                        setSelected(item)


                                    }}>
                                        <Animated.View style={[styles.mainsideContainer,{opacity:fadeAnim,backgroundColor:'white',justifyContent:'center',paddingVertical:5,borderColor: '#DEDEDE',borderWidth: 1}]}>
                                            <View style={{width:'100%',top:0,alignItems:'center'}}>

                                                <Text style={styles.packageTitle}>{index ==0 ? I18n.t('save60'):index==1? I18n.t('popular'):I18n.t('save80')}</Text>
                                            </View>

                                                {item.productId.indexOf('trial') != -1 ?
                                                    (<View style={styles.packageDayContainer}>
                                                    <Text style={styles.packageDay}>3</Text>
                                                    <Text style={styles.packageDayTextActive}>{I18n.t('freeDays')}</Text>


                                                </View>):
                                                    item.subscriptionPeriodUnitIOS == 'MONTH' ?
                                                        (<View style={styles.packageDayContainer}>
                                                            <Text style={[styles.packageDayTextActive,{fontSize: 12}]}>{item.localizedPrice.substr(0,1)}{I18n.t('autoRenewableUltraShort',{price:(item.price/4).toFixed(0),
                                                                period:I18n.t('week')
                                                            })}</Text>



                                                    </View>

                                                )
                                                        : item.subscriptionPeriodUnitIOS == 'DAY' || item.subscriptionPeriodUnitIOS == 'WEEK' ?
                                                            (<View style={styles.packageDayContainer}>
                                                                    <Text style={[styles.packageDayTextActive,{fontSize: 12}]}>{item.localizedPrice.substr(0,1)}{I18n.t('autoRenewableUltraShort',{price:item.price,
                                                                        period:I18n.t('week')
                                                                    })}</Text>



                                                                </View>

                                                            ):(
                                                    <View style={styles.packageDayContainer}>
                                                        <Text style={[styles.packageDayTextActive,{fontSize: 12}]}>{item.localizedPrice.substr(0,1)}{I18n.t('autoRenewableUltraShort',{price:(item.price/48).toFixed(0),
                                                            period:I18n.t('week')
                                                        })}</Text>

                                                    </View>
                                                    )}

                                            <View style={styles.packageFooterContainer}>


                                            </View>
                                            <View style={{position:'absolute',width:'100%',bottom:13,alignItems:'center'}}>
                                                <Text style={styles.packageFooterText}>
                                                    {I18n.t('autoRenewableUltraShort',{price:item.localizedPrice,
                                                        period:item.subscriptionPeriodUnitIOS == 'DAY' ||item.subscriptionPeriodUnitIOS == 'WEEK' ? I18n.t('week'):item.subscriptionPeriodUnitIOS == 'MONTH' ? I18n.t('month') :I18n.t('year')
                                                    })}
                                                </Text>

                                            </View>

                                        </Animated.View>
                                    </TouchableWithoutFeedback>
                                )
                            }

                        })}



                    </View>
                    <View style={{position:'absolute',width:'100%',height:screen.height>800?'25%':'15%',justifyContent:'center',alignItems:'center',zIndex:10,bottom:50}}>
                            {/*<LottieView autoSize source={require("../../../assets/animations/72511-button.json")} autoPlay loop style={{marginTop:userStore.screen ? userStore.screen.height<700 ?100:30:50,justifyContent:'center',alignItems:'center',width:'100%'}}>*/}

                            {/*</LottieView>*/}
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
                            <TouchableOpacity  onPress={()=>{
                                if(!selected){
                                    setSelected(subscriptions[which])
                                    requestSubscription(subscriptions[which].productId)

                                }else{

                                    requestSubscription(selected.productId)
                                }
                                setLoading(true)
                                setTimeout(()=>{
                                    setLoading(false)
                                },5000)
                            }} style={styles.buttonContainer}>
                                <LinearGradient colors={['#0012FF', '#000DC8', '#00098B']} style={{alignItems:'center',width:'100%',borderRadius: 50,paddingHorizontal:15,paddingVertical: 15}}>
                                    <Animated.View style={{
                                        zIndex:999,
                                        transform: [
                                            { rotate: '180deg'},
                                            {scaleX: translate},
                                            {scaleY: translate},
                                        ],
                                    }}>
                                        {!loading ?
                                    <Text style={styles.buttonTitle}>{selected ?
                                        selected.productId.indexOf('trial') != -1?I18n.t('startTrial'):I18n.t('startMembership')
                                        :
                                        subscriptions[1].productId.indexOf('trial') != -1 ?I18n.t('startTrial'):I18n.t('startMembership')

                                    }</Text>
                                            :
                                            <View style={{height:50,marginTop:-30}}>
                                                <Spinner color={'white'} size={'small'}/>
                                            </View>}
                                    </Animated.View>
                                </LinearGradient>
                            </TouchableOpacity>
                        </Animated.View>
                        <Text style={{marginVertical:7,color:'#C9C9C9',fontFamily:'Roboto-Regular',fontSize:15,}}>
                            {I18n.t('autoRenewCancel')}
                        </Text>
                        <TouchableOpacity>
                            <Text style={styles.rightFooterText}>{I18n.t('reBuy')}</Text>
                        </TouchableOpacity>
                        <View style={{height:75,zIndex:999,marginTop:10}}>
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
                    <View style={{position:'absolute',width:'100%',height:'100%',justifyContent:'flex-end',alignItems:'center',zIndex:-1,bottom:userStore.screen ? userStore.screen.height<700 ?30:50:40}}>


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
    packageDayContainer:{
        width:'80%',
        marginTop:10,
        height:'40%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',

    },
    packageDay:{
        textAlign:'center',
        fontSize:18,

        fontFamily:'Roboto-Bold'
    },
    packageDayText:{
        textAlign:'center',
        fontSize:14,
        fontFamily:'Roboto-Regular'
    },
    packageFooterContainer:{
        borderTopWidth:1,
        borderColor: '#DEDEDE',
        width:'80%',
        marginTop:5,
        height:'20%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        borderBottomLeftRadius:6,
        borderBottomRightRadius:6,
    },
    packageFooterText:{
        textAlign:'center',
        fontSize:12,

        fontFamily:'Roboto-Bold'
    },
    packageTitleActive:{
        color:'white',
        textAlign:'center',
        fontSize:13,
        marginTop:10,
        fontFamily:'Roboto-Bold'
    },
    packageDayContainerActive:{
        width:'80%',
        marginTop:10,
        height:'45%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        paddingVertical:10
    },
    packageDayActive:{
        textAlign:'center',
        fontSize:23,

        fontFamily:'Roboto-Bold'
    },
    packageDayTextActive:{
        textAlign:'center',
        fontSize:14,
        fontFamily:'Roboto-Regular'
    },
    packageFooterContainerActive:{
        width:'80%',
        marginTop:3,
        height:'25%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        borderBottomLeftRadius:6,
        borderBottomRightRadius:6,

    },
    packageFooterTextActive:{
        textAlign:'center',
        fontSize:13,

        fontFamily:'Roboto-Bold'
    },
    mainsideContainerActive:{

        borderColor:'#707070',
        borderWidth:.4,
        width:'35%',
        height:'110%',
        marginTop:-20,
        marginHorizontal:5,
        borderRadius:10,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity:  0.18,
        shadowRadius: 4.59,
        elevation: 5

    },
    mainsideContainer:{
        borderColor:'#707070',
        borderWidth:.4,
        alignItems:'center',
      width:'32%',
      height:'100%',
      borderRadius:9,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity:  0.18,
        shadowRadius: 4.59,
        elevation: 5
    },
    mainContainer:{
        width:'90%',
        height:140,
        marginTop:-20,
        marginBottom:20,
        flexDirection:'row',
        justifyContent:'space-between',
        zIndex:999
    },
    featureTitle:{
        fontFamily:'Roboto-Bold',
        fontSize:13,
        color:'white'
    },
    premiumImage:{
        resizeMode:'contain',
        width:40,
        height:40
    },
    leftFooterText:{
        textDecorationLine:'underline',
        color:'#BFBFBF',
        fontFamily:'Roboto-Medium',
        fontSize:13
    },
    rightFooterText:{
        textDecorationLine:'underline',
        color:'#BFBFBF',
        fontFamily:'Roboto-Medium',
        fontSize:13
    },
    footerContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:20,
        alignItems:'center',
        width:'100%',

        zIndex:99,
        position:'absolute',
        top:Dimensions.get('window').height > 800 ? 75:50

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
    buttonContainer:{
        width:'90%',
        marginTop:30
    },
    premiumLeft:{
        width:'13%',
        height: 25,
        borderRadius:20,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight:10
    },
    buttonTitle:{
        fontFamily:'Roboto-Medium',
        fontSize:20,
        color:'white',
    },
    packageTitle:{
        fontFamily:'Roboto-Bold',
        fontSize:12,
        textAlign:'center',
    },
    packageDescription:{
        fontFamily:'Roboto-Regular',
        fontSize:16
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
        marginTop:'15%',
    },
    featureContainerx:{
        flexDirection:'row',
        marginVertical:10,
        justifyContent:'center',
        marginLeft:-20
    },
    title:{
        textAlign:'center',
        fontFamily:'Roboto-Bold',
        fontSize:20,
        marginTop:userStore.screen ? userStore.screen.height<700 ? 30:70:100,
        width:'60%',
        color:'white'
    },
    container:{
        flex:1,
        backgroundColor: 'white',
        paddingTop:10,
        alignItems:'center'

    },


})
export default observer(LondonPremium)
