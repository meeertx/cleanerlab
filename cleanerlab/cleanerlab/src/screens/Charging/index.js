import React , {useState,useEffect} from 'react'
import {StyleSheet, View, Text, Dimensions} from "react-native";
import {observer} from "mobx-react";
import GifImage from "@lowkey/react-native-gif/src/index";
import FastImage from "react-native-fast-image";
import DeviceInfo, {usePowerState,useBatteryLevel} from 'react-native-device-info'
import { NativeEventEmitter, NativeModules } from 'react-native';
const deviceInfoEmitter = new NativeEventEmitter(NativeModules.RNDeviceInfo);
import Video from "react-native-video";
import userStore from "../../store/userStore";

const Charging = ({navigation,route})=>{

    const batteryLevel = useBatteryLevel()

    return(
        <View style={{flex:1, backgroundColor:'#020A23',justifyContent:'center',alignItems:'center'}}>
            <View style={{width:'100%',height:'100%',alignItems:'center',paddingTop:50,position:'absolute',zIndex:99}}>

                <View style={{flexDirection:'row'}}>
                    <FastImage source={require('../../../assets/flash.png')} style={{width:40,height:40}}/>
                    <Text style={{fontFamily:'Roboto-Bold',fontSize:30,color:'white',marginLeft:5}}>{(batteryLevel*100).toFixed()}</Text>
                </View>
            </View>
            {/*<GifImage source={require('../../../assets/charging/charging1.gif')} style={{width:800,height:600,resizeMode:'contain'}} />*/}
            <Video
                source={userStore.chargeAnimation}
                style={styles.backgroundVideo}
                muted={true}
                repeat={true}
                resizeMode={"cover"}
                rate={1.0}
                ignoreSilentSwitch={"obey"}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    backgroundVideo: {
        height: Dimensions.get('window').height,
        position: "absolute",
        top: 0,
        left: 0,
        alignItems: "stretch",
        bottom: 0,
        right: 0
    }
})
export default observer(Charging)
