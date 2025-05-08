import React, {useState,useEffect} from 'react'
import {
    StyleSheet,
    RefreshControl,
    View,
    ScrollView,
    TouchableWithoutFeedback,
    Image,
    Text,
    TouchableOpacity
} from "react-native";
import {observer} from "mobx-react";
import VideoPlayer from "../VideoPlayer";
import FastImage from "react-native-fast-image";
import I18n from '../../../lang/index';
import userStore from "../../store/userStore";
const Player = ({navigation,route}) =>{

    return(
        <View style={[styles.container,{backgroundColor:userStore.activeTheme.background}]}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={{width:40,height:40,justifyContent:'center',alignItems:'center'}} onPress={()=>navigation.goBack()}>
                    <FastImage source={userStore.theme == 'dark' ? require('../../../assets/leftbackwhite.png'):require('../../../assets/leftback.png')} style={{width:10,height:15}}/>
                </TouchableOpacity>
                <Text style={{fontFamily:'Roboto-Bold',fontSize:20,color:userStore.activeTheme.textColor}}> {I18n.t('review')}</Text>

            </View>


            <VideoPlayer source={route.params.item} />

        </View>
    )

}
let styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        paddingTop:40,
    },
    headerContainer:{
        marginTop:20,
        marginBottom:20,

        marginLeft:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingRight:20,
    },
})

export default observer(Player)
