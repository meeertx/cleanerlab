import React,{useState,useEffect,useRef} from 'react'
import {View,StyleSheet,Text,Animated,TouchableWithoutFeedback,TouchableOpacity} from 'react-native'
import FastImage from "react-native-fast-image";
import {observer} from "mobx-react";
import userStore from "../../store/userStore";
import I18n from '../../../lang/index';

const Divider = ({navigation,route}) =>{
    useEffect(()=>{
    // alert(JSON.stringify(route.params))

    },[])
    if(route.params.page == 'similar')
    return(
                <View style={[styles.container, {backgroundColor: userStore.activeTheme.background}]}>

            <Text style={[styles.title,{color:userStore.activeTheme.textColor}]}>{I18n.t('similarPhotos')}</Text>
            <Text style={[styles.desc,{color:userStore.activeTheme.textColor}]}>{I18n.t('similarPhotosDesc')} </Text>
            <FastImage source={require('../../../assets/similarpage_image.png')} resizeMode={'contain'} style={styles.image} />
            <TouchableWithoutFeedback onPress={()=>navigation.goBack()}>
                <View style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>{I18n.t('letsStart')}</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
    else if(route.params.page == 'duplicated')
        return(
                    <View style={[styles.container, {backgroundColor: userStore.activeTheme.background}]}>

                <Text style={[styles.title,{color:userStore.activeTheme.textColor}]}>{I18n.t('samePhotos')}</Text>
                <Text style={[styles.desc,{color:userStore.activeTheme.textColor}]}>{I18n.t('samePhotosDesc')}</Text>
                <FastImage source={require('../../../assets/recurring_image.png')} resizeMode={'contain'} style={styles.image} />
                <TouchableWithoutFeedback onPress={()=>navigation.navigate('Duplicated')}>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>{I18n.t('letsStart')}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    else if(route.params.page == 'videos')
        return(
                    <View style={[styles.container, {backgroundColor: userStore.activeTheme.background}]}>

                <Text style={[styles.title,{color:userStore.activeTheme.textColor}]}>{I18n.t('videos')}</Text>
                <Text style={[styles.desc,{color:userStore.activeTheme.textColor}]}>{I18n.t('videosDesc')}</Text>
                <FastImage source={require('../../../assets/videos_image.png')} resizeMode={'contain'} style={styles.image} />
                <TouchableWithoutFeedback onPress={()=>navigation.navigate('Video')}>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>{I18n.t('letsStart')}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    else if(route.params.page == 'screenshot')
        return(
                    <View style={[styles.container, {backgroundColor: userStore.activeTheme.background}]}>

                <Text style={[styles.title,{color:userStore.activeTheme.textColor}]}>{I18n.t('screenshots')}</Text>
                <Text style={[styles.desc,{color:userStore.activeTheme.textColor}]}>{I18n.t('screenshotDesc')}</Text>
                <FastImage source={require('../../../assets/screenshots_image.png')} resizeMode={'contain'} style={styles.image} />
                <TouchableWithoutFeedback onPress={()=>navigation.navigate('ScreenShot')}>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>{I18n.t('letsStart')}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    else if(route.params.page == 'others')
        return(
                    <View style={[styles.container, {backgroundColor: userStore.activeTheme.background}]}>

                <Text style={[styles.title,{color:userStore.activeTheme.textColor}]}>{I18n.t('others')}</Text>
                <Text style={[styles.desc,{color:userStore.activeTheme.textColor}]}>{I18n.t('otherDesc')}</Text>
                <FastImage source={require('../../../assets/others_icon.png')} resizeMode={'contain'} style={styles.image} />
                <TouchableWithoutFeedback onPress={()=>navigation.navigate('Other')}>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>{I18n.t('letsStart')}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
}

let styles= StyleSheet.create({
    buttonContainer:{
        backgroundColor: '#2007FF',
        width:'70%',
        paddingVertical: '7%',
        paddingHorizontal:'10%',
        borderRadius:20,
        justifyContent:'center',
        alignItems: 'center'
    },
    buttonText:{
        color:'white',
        textAlign:'center',
        fontFamily:'Roboto-Medium',
        fontSize:20
    },
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor: 'white',
        paddingVertical:20,
    },
    title:{
        marginTop:40,
        fontFamily:'Roboto-Bold',
        fontSize:30,

    },
    desc:{
        fontFamily: 'Roboto-Medium',
        fontSize: 13,
        width:'70%',
        textAlign:'center',
        color:'#696B7F',marginTop:20
    },
    image:{
        width:'80%',
        height:'50%',
        resizeMode:'contain',
        marginVertical:30,
    },
})
export default observer(Divider)
