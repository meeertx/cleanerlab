import React, {useEffect, useState} from 'react'
import {
    View,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,Alert,
    TouchableWithoutFeedback, Platform
} from 'react-native'
import {observer} from "mobx-react";
import userStore from "../../store/userStore";
import {Icon, Spinner} from "native-base";
import GifImage from "@lowkey/react-native-gif/src/index";
import Modal from "react-native-modal";
import PasswordPopup from "../../components/passwordPopup";
import SuccessPopup from "../../components/successPopup";
import InAppReview from 'react-native-in-app-review';
import Share from 'react-native-share';
import icon from "../../../assets/logo.png";
import I18n from '../../../lang/index';
import FastImage from "react-native-fast-image";
import AsyncStorage from "@react-native-community/async-storage";
import SwitchWithIcons from "react-native-switch-with-icons";
import Toggle from "react-native-toggle-element";

const Settings = ({navigation}) =>{
    const [isEnabled, setIsEnabled] = useState(userStore.passwordActive);
    const [pw, setPw] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const [isEnabledDelete, setIsEnabledDelete] = useState(false);
    const toggleDelete = () => setIsEnabledDelete(previousState => !previousState);
    useEffect(()=>{
    },[])
    let sun = require('../../../assets/sun.png')
    let moon = require('../../../assets/half-moon.png')

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return(
        <View style={[styles.container,{backgroundColor: userStore.activeTheme.background}]}>
            <View style={styles.headerContainer}>

                <Text style={[styles.homeTitle,{color:userStore.activeTheme.textColor}]}>{I18n.t('settings')}</Text>
                <View style={{position:'absolute',width:'100%',justifyContent:'space-between',alignItems:'center',zIndex:999,flexDirection:'row'}}>
                    <TouchableOpacity style={{width:30,height:30,justifyContent:'center',alignItems:'center',zIndex:999}} onPress={()=>navigation.goBack()}>
                        <FastImage source={userStore.theme == 'dark' ? require('../../../assets/leftbackwhite.png'):require('../../../assets/leftback.png')} style={{width:10,height:15}}/>
                    </TouchableOpacity>
                    <Toggle
                        value={userStore.isDarkTheme}
                        onPress={(newState) =>  userStore.setDarkTheme(newState)}
                        thumbActiveComponent={
                            <FastImage style={{width:'100%',height:'100%'}} source={require('../../../assets/half-moon.png')}/>
                        }
                        thumbInActiveComponent={
                            <FastImage style={{width:'100%',height:'100%'}} source={require('../../../assets/sun.png')}/>
                        }
                        thumbButton={{
                            width:40,
                            height:40
                        }}
                        trackBar={{

                            activeBackgroundColor: "#9ee3fb",
                            inActiveBackgroundColor: "#FFD347",
                            borderActiveColor: "#86c3d7",
                            borderInActiveColor: "#F6B35B",
                            borderWidth: 5,
                            width: 70,
                            height:40

                        }}
                    />
                </View>

            </View>
            <ScrollView>

                {!userStore.premium && (
                    <View style={styles.notAllowContainer}>
                        <GifImage
                            source={require('../../../assets/robo2.gif')}
                            style={styles.robot} resizeMode={'contain'}
                        />
                        <Image  />
                        <Text style={[styles.allowTitle,{color:userStore.activeTheme.textColor}]}>{I18n.t('premiumTitleSettings')}</Text>
                        <Text style={[styles.allowDesc,{color:userStore.activeTheme.textColor}]}>{I18n.t('premiumDescSettings')}</Text>

                        <TouchableOpacity onPress={()=>{
                            navigation.navigate('Premium')
                        }}>
                            <View style={styles.allowButtonContainer}>
                                <Text style={styles.allowButtonText}>{I18n.t('moreInfo')}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}


                {/*divider*/}
                {/*<Text style={styles.dividerText}>SAKLANANLAR</Text>*/}

                <View style={styles.menuContainer}>
                    <TouchableWithoutFeedback onPress={()=>{
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
                                                navigation.navigate('WhiteList')

                                            }else{
                                                Alert.alert(I18n.t('fail'),I18n.t('notMatch'))
                                            }
                                        }
                                    }
                                ],
                                "secure-text"
                            );
                        }else{
                            navigation.navigate('WhiteList')
                        }
                    }}>
                        <View style={[styles.menuItemContainer,{borderTopColor:userStore.activeTheme.homeBoxBackground}]}>
                            <View style={styles.menuLeftContainer}>
                                <View style={styles.menuIconContainer}>


                                    <FastImage style={styles.menuIcon} source={require('../../../assets/hiddenlistwhite.png')} resizeMode={'contain'}/>
                                </View>
                                <Text style={[styles.menuText,{color:userStore.activeTheme.textColor}]}>{I18n.t('keptList')}</Text>

                            </View>


                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableOpacity onPress={()=>{
                        navigation.navigate('Clue')
                    }}style={[styles.menuItemContainer,{borderTopColor:userStore.activeTheme.homeBoxBackground}]}>
                        <View style={styles.menuLeftContainer}>
                            <View style={styles.menuIconContainer}>

                                <Image style={styles.menuIcon} source={require('../../../assets/cluewhite.png')} resizeMode={'contain'}/>
                            </View>

                            <Text style={[styles.menuText,{color:userStore.activeTheme.textColor}]}>{I18n.t('clues')}</Text>

                        </View>

                    </TouchableOpacity>
                </View>


                {/*divider*/}

                <View style={styles.menuContainer}>
                    <View style={[styles.menuItemContainer,{borderTopColor:userStore.activeTheme.homeBoxBackground}]}>
                        <View style={styles.menuLeftContainer}>
                            <View style={styles.menuIconContainer}>

                                <Image style={styles.menuIcon} source={require('../../../assets/pint.png')} resizeMode={'contain'}/>
                            </View>

                            <Text style={[styles.menuText,{color:userStore.activeTheme.textColor}]}>{I18n.t('usePin')}</Text>

                        </View>
                        <Switch
                            trackColor={{ false: "#497CAC", true: "#7AF800" }}
                            thumbColor={userStore.passwordActive ? "white" : "white"}
                            ios_backgroundColor="#497CAC"
                            onValueChange={()=>{
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
                                                        userStore.changePwActive(!isEnabled)
                                                        setIsEnabled(!isEnabled)

                                                    }else{
                                                        Alert.alert(I18n.t('fail'),I18n.t('notMatch'))
                                                    }
                                                }
                                            }
                                        ],
                                        "secure-text"
                                    );
                                }else{
                                    if(!userStore.password){
                                        setPw(true)

                                    }else{
                                        userStore.changePwActive(!isEnabled)
                                        setIsEnabled(!isEnabled)
                                    }

                                }


                            }}
                            value={userStore.passwordActive ? true:false}
                        />

                    </View>

                    {userStore.passwordActive && (
                        <TouchableWithoutFeedback onPress={()=>{
                            setPw(true)

                        }}>
                            <View style={[styles.menuItemContainer,{borderTopColor: userStore.activeTheme.homeBoxBackground}]}>
                                <View style={styles.menuLeftContainer}>
                                    <View style={styles.menuIconContainer}>

                                        <Image style={styles.menuIcon} source={require('../../../assets/pint.png')} resizeMode={'contain'}/>
                                    </View>

                                    <Text style={[styles.menuText, {color: !userStore.password ? 'red' :userStore.colors.primary}]}>{userStore.password ? I18n.t('changePin'):I18n.t('createPin')}</Text>

                                </View>

                            </View>
                        </TouchableWithoutFeedback>
                    )}
                    <Modal isVisible={pw} backdropColor={'white'} onBackdropPress={()=>setPw(!pw)} style={{justifyContent:'center',alignItems:'center'}}>
                        <PasswordPopup  text={I18n.t('passwordChanged')} func={setPw} sucFunc={setSuccess} />
                    </Modal>
                    <Modal isVisible={success} backdropColor={'white'} onBackdropPress={()=>setSuccess(!success)} style={{justifyContent:'center',alignItems:'center'}}>
                        <SuccessPopup text={I18n.t('passwordChanged')} />
                    </Modal>
                    <View style={[styles.menuItemContainer,{borderTopColor:userStore.activeTheme.homeBoxBackground}]}>
                        <View style={styles.menuLeftContainer}>
                            <View style={styles.menuIconContainer}>

                                <Image style={styles.menuIcon} source={require('../../../assets/removeafter.png')} resizeMode={'contain'}/>
                            </View>

                            <Text style={[styles.menuText,{color:userStore.activeTheme.textColor}]}>{I18n.t('deleteAfter')}</Text>

                        </View>
                        <Switch
                            trackColor={{ false: "#497CAC", true: "#7AF800" }}
                            thumbColor={isEnabled ? "white" : "white"}
                            ios_backgroundColor="#497CAC"
                            onValueChange={(value)=>{

                                AsyncStorage.setItem('deleteAfter',JSON.stringify(value))
                                userStore.getDeleteAfter()
                            }}
                            value={userStore.deleteAfter}
                        />
                    </View>
                </View>
                {/*divider*/}

                {/*<View style={styles.menuContainer}>*/}
                {/*    <View style={[styles.menuItemContainer,{borderTopColor:userStore.activeTheme.homeBoxBackground}]}>*/}
                {/*        <View style={styles.menuLeftContainer}>*/}
                {/*            <View style={styles.menuIconContainer}>*/}

                {/*                <Image style={styles.menuIcon} source={require('../../../assets/toolswhite.png')} resizeMode={'contain'}/>*/}
                {/*            </View>*/}

                {/*            <Text style={[styles.menuText,{color:userStore.activeTheme.textColor}]}>{I18n.t('tools')}</Text>*/}

                {/*        </View>*/}

                {/*    </View>*/}
                {/*</View>*/}
                {/*divider*/}
                <View style={styles.menuContainer}>
                    <TouchableWithoutFeedback onPress={()=>{
                        navigation.navigate('FAQ')
                    }}>
                        <View style={[styles.menuItemContainer,{borderTopColor:userStore.activeTheme.homeBoxBackground}]}>
                            <View style={styles.menuLeftContainer}>
                                <View style={styles.menuIconContainer}>

                                    <Image style={styles.menuIcon} source={require('../../../assets/ssswhite.png')} resizeMode={'contain'}/>
                                </View>

                                <Text style={[styles.menuText,{color:userStore.activeTheme.textColor}]}>{I18n.t('faq')}</Text>

                            </View>

                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableOpacity onPress={()=>{
                        navigation.navigate('Support')
                    }} style={[styles.menuItemContainer,{borderTopColor:userStore.activeTheme.homeBoxBackground}]}>
                        <View style={styles.menuLeftContainer}>
                            <View style={styles.menuIconContainer}>

                                <Image style={styles.menuIcon} source={require('../../../assets/mailwhite.png')} resizeMode={'contain'}/>
                            </View>

                            <Text style={[styles.menuText,{color:userStore.activeTheme.textColor}]}>{I18n.t('emailSupport')}</Text>

                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        setLoading(true)
                        setTimeout(()=>{
                            setLoading(false)
                        },2500)
                    }} style={[styles.menuItemContainer,{borderTopColor:userStore.activeTheme.homeBoxBackground}]}>
                        <View style={styles.menuLeftContainer}>
                            <View style={styles.menuIconContainer}>

                                <Image style={styles.menuIcon} source={require('../../../assets/takeagainwhite.png')} resizeMode={'contain'}/>
                            </View>

                            {loading ? <Spinner color={userStore.activeTheme.textColor} size={'small'} style={{marginLeft:10,height:30}}/> :
                                <Text style={[styles.menuText,{color:userStore.activeTheme.textColor}]}>{I18n.t('takeAgain')}</Text>
                            }

                        </View>

                    </TouchableOpacity>
                    <TouchableWithoutFeedback onPress={()=>navigation.navigate('Info',I18n.t('aboutUsPage'))}>
                        <View style={[styles.menuItemContainer,{borderTopColor:userStore.activeTheme.homeBoxBackground}]}>
                            <View style={styles.menuLeftContainer}>
                                <View style={styles.menuIconContainer}>

                                    <Image style={styles.menuIcon} source={require('../../../assets/aboutus.png')} resizeMode={'contain'}/>
                                </View>

                                <Text style={[styles.menuText,{color:userStore.activeTheme.textColor}]}>{I18n.t('aboutUs')}</Text>

                            </View>

                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>navigation.navigate('Info',I18n.t('privacyPage'))}>
                        <View style={[styles.menuItemContainer,{borderTopColor:userStore.activeTheme.homeBoxBackground}]}>
                            <View style={styles.menuLeftContainer}>
                                <View style={styles.menuIconContainer}>

                                    <Image style={styles.menuIcon} source={require('../../../assets/privacyicon.png')} resizeMode={'contain'}/>
                                </View>

                                <Text style={[styles.menuText,{color:userStore.activeTheme.textColor}]}>{I18n.t('privacy')}</Text>

                            </View>

                        </View>
                    </TouchableWithoutFeedback>
                </View>
                {/*divider*/}
                <View style={styles.menuContainer}>
                    <TouchableWithoutFeedback onPress={()=>{
                        if(InAppReview.isAvailable()){
                            InAppReview.RequestInAppReview()
                                .then((hasFlowFinishedSuccessfully) => {
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

                    }}>

                        <View style={[styles.menuItemContainer,{borderTopColor:userStore.activeTheme.homeBoxBackground}]}>
                            <View style={styles.menuLeftContainer}>
                                <View style={styles.menuIconContainer}>

                                    <Image style={styles.menuIcon} source={require('../../../assets/reviewapp.png')} resizeMode={'contain'}/>
                                </View>

                                <Text style={[styles.menuText,{color:userStore.activeTheme.textColor}]}>{I18n.t('reviewApp')}</Text>

                            </View>

                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={()=>{
                        const url = 'https://apps.apple.com/tr/app/cleanerlab-phone-cleaner/id1643892785';
                        const title = 'CleanerLab';
                        const message = 'I\'ve found a nice cleaner app. Please check this out.';
                        const icon = require('../../../assets/logo.png');
                        const options = Platform.select({
                            ios: {
                                activityItemSources: [
                                    {
                                        // For sharing url with custom title.
                                        placeholderItem: { type: 'url', content: url,icon },
                                        item: {
                                            default: { type: 'url', content: url,icon },
                                        },
                                        subject: {
                                            default: title,
                                        },
                                        linkMetadata: { originalUrl: url, url, title,icon },
                                    }
                                ],
                            },
                            default: {
                                title,
                                subject: title,
                                message: `${message} ${url}`,
                            },
                        });

                        Share.open({
                            title,
                            subject: title,
                            message: `${message} ${url}`,

                        })
                            .then((res) => {
                                console.log(res);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                        // Share.open(options)
                        //     .then((res) => {
                        //         console.log(res);
                        //     })
                        //     .catch((err) => {
                        //         err && console.log(err);
                        //     });
                    }}>
                        <View style={[styles.menuItemContainer,{borderTopColor:userStore.activeTheme.homeBoxBackground}]}>
                            <View style={styles.menuLeftContainer}>
                                <View style={styles.menuIconContainer}>

                                    <Image style={styles.menuIcon} source={require('../../../assets/sharewhite.png')} resizeMode={'contain'}/>
                                </View>

                                <Text style={[styles.menuText,{color:userStore.activeTheme.textColor}]}>{I18n.t('shareApp')}</Text>

                            </View>

                        </View>
                    </TouchableWithoutFeedback>
                </View>

            </ScrollView>

        </View>
    )
}


let styles = StyleSheet.create({
    menuContainer:{
        width:'100%',
        alignItems:'center'
    },
    dividerText:{
        fontFamily:'Roboto-Medium',
        fontSize:15,
        color:'#696B7F',
        marginHorizontal:20,
        paddingHorizontal:20,
        marginTop:15
    },
    container:{
        flex:1,
        backgroundColor:'white',
        paddingVertical:10
    },
    headerContainer:{
        marginVertical:50,
        marginHorizontal:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        paddingRight:20
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
        marginTop: -30,
        marginBottom:10
    },
    robot:{
        width:200,
        height:200,
        borderRadius: 20,
        marginLeft:-10,
        marginVertical:20
    },
    allowTitle:{
        fontFamily:'Roboto-Medium',

        fontSize:20,
        textAlign:'center',
        width:'80%'
    },
    allowDesc:{
        fontFamily:'Roboto-Medium',

        fontSize:13,
        textAlign:'center',
        width:'80%',
        color:'#828CA5',
        marginVertical:10
    },
    menuRightText:{
        color:'white'
    },
    menuRightIcon:{
        width:10,
        height:10,marginLeft:10
    },
    menuRightContainer:{
        backgroundColor:'#2007FF',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderRadius:20,
        paddingHorizontal:10,
        paddingVertical:5
    },
    menuIconContainer:{
        backgroundColor:'#2007FF',
        borderRadius:50,
        padding:5
    },
    menuIcon:{
        width:25,
        height:25
    },
    menuText:{
        fontFamily:'Roboto-Bold',

        fontSize:18,
        marginLeft: 10,
        fontWeight:'500'
    },
    menuLeftContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',

    },
    menuItemContainer:{
        borderTopColor:'#F2F5FF',
        borderTopWidth:2,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:10,
        paddingVertical:10,
        borderRadius:20,

        width:'95%'

    },
})
export default observer(Settings)
