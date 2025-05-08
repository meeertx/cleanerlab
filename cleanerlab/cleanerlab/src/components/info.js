import React, {useState,useEffect}  from 'react'
import {StyleSheet, View, Text, TouchableWithoutFeedback, ScrollView,} from "react-native";
import Accordion from 'react-native-collapsible/Accordion';
import {observer} from "mobx-react";
import userStore from "../store/userStore";
import FastImage from "react-native-fast-image";
import {Content} from "native-base";
import I18n from '../../lang/index';

const Info = ({navigation,route})=>{





    return(
        <View style={[styles.container,{backgroundColor: userStore.activeTheme.background}]}>
            <View style={{width:'85%',paddingBottom:10,marginTop:40}}>
                <TouchableWithoutFeedback onPress={()=>{
                    navigation.goBack()
                }}>

                    <FastImage source={require('../../assets/closex.png')} style={{width:30,height:30,marginVertical:20}} />
                </TouchableWithoutFeedback>
                <Text style={{fontFamily:'Roboto-Bold',fontSize:30,color:userStore.activeTheme.textColor}}>
                    {route.params.title}
                </Text>
            </View>
            <Content>
                <View style={[styles.content,{borderRadius:20,backgroundColor: userStore.activeTheme.homeBoxBackground}]}>
                    <Text style={[styles.contentText,{color:userStore.activeTheme.textColor}]}>{route.params.content}</Text>

                </View>
            </Content>


        </View>

    )
}

let styles = StyleSheet.create({
    contentText:{

    },
    content:{
        width:'90%',
        paddingVertical:20,
        marginHorizontal:20,
        backgroundColor: '#F0F4FF',
        borderRadius:20,
        paddingHorizontal:20,
        marginTop:20

    },
    container:{
        flex:1,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center'
    },
    header:{
        marginTop:20,
        width:'87%',
        height:80,
        marginHorizontal:20,
        backgroundColor: '#F0F4FF',
        flexDirection:'row',
        justifyContent: 'space-between',
        borderRadius:20,
        alignItems: 'center',
        paddingHorizontal:20,
    },
    headerText:{
        fontFamily:'Roboto-Bold',
        fontSize:15,
        color:'black',
        width:'80%'
    },
})
export default observer(Info)
