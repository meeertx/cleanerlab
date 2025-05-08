import React, {useState,useEffect} from 'react'
import {
    View,
    StyleSheet,
    Image,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Text,
    ScrollView,
    TouchableOpacity, FlatList, TouchableWithoutFeedbackComponent
} from "react-native";
import {observer} from "mobx-react";
import userStore from "../store/userStore";
import GifImage from "@lowkey/react-native-gif/src/index";
import I18n from '../../lang/index';

const PremiumCongrats = ({navigation,route})=>{
    useEffect(()=>{
        // alert(route.params.deleted+'  -  '+userStore.formatBytes(route.params.total) )
    },[])
    return(
        <View style={{flex:1,alignItems:'center',backgroundColor:'white',paddingVertical:30}}
        >
            <GifImage source={require('../../assets/robo2.gif')} style={{width:'50%',height:'30%',marginTop:'15%'}} resizeMode={'contain'} />
            <Text style={{fontFamily:'Roboto-Medium',fontSize:30}}>{I18n.t('congrats')}</Text>
            <View style={styles.midContainer}>

                <Text style={{fontFamily:'Roboto-Light',fontSize:13,textAlign:'center',paddingHorizontal:8,}}>
                    {I18n.t('yourePremium')}
                </Text>
            </View>
            <View style={{width:'100%',height:'100%',position:'absolute',justifyContent:'flex-end',alignItems:'center'}}>
                <TouchableWithoutFeedback onPress={()=>navigation.goBack()}>
                <View style={{width:'90%',backgroundColor:'#0012FF',paddingVertical: 20,borderRadius:13}}>
                    <Text style={{fontFamily:'Roboto-Bold',fontSize:15,textAlign:'center',color:'white'}}>
                        {I18n.t('continue')}

                    </Text>
                </View>
                </TouchableWithoutFeedback>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    insideRightContainer:{
        width:'35%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:12,
        backgroundColor:'white',
        padding:5,
        shadowColor: "#000",
        shadowOffset:{
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.19,
        shadowRadius: 3.65,
        elevation: 6,
    },
    midinContainer:{
        marginVertical:10,
        paddingHorizontal:10,
      flexDirection:'row',
      justifyContent:'space-between',
        alignItems:'center',
    },
    midContainer:{width:'90%',
        paddingHorizontal:10,
        paddingVertical:30,

        backgroundColor:'#E5F1FE',

        borderRadius:20,
        borderColor:'#F4F9FE',
        borderWidth:3,
        marginTop:40
    },


})

export default  observer(PremiumCongrats)
