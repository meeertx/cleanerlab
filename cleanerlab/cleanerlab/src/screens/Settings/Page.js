import React, {useState,useEffect}  from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import Accordion from 'react-native-collapsible/Accordion';
import {observer} from "mobx-react";
import userStore from "../../store/userStore";
import FastImage from "react-native-fast-image";
import I18n from '../../../lang/index';
import Carousel from 'react-native-reanimated-carousel';

const Page = ({navigation,route})=>{
    const width = Dimensions.get('window').width;
    let arr = [


    ]
    return(
        <View style={styles.container}>
            <View style={{width:'85%'}}>
                <TouchableWithoutFeedback onPress={()=>{
                    navigation.goBack()
                }}>

                    <FastImage source={require('../../../assets/leftback.png')} style={{width:15,height:20,marginVertical:20}} />
                </TouchableWithoutFeedback>
                <Text style={{fontFamily:'Roboto-Bold',fontSize:30,}}>
                    {route.params.title}
                </Text>
            </View>

        </View>

    )
}

let styles = StyleSheet.create({
    contentText:{

    },
    content:{
        width:'97%',
        paddingVertical:20,
        marginHorizontal:20,
        backgroundColor: '#F0F4FF',
        borderRadius:20,
        paddingHorizontal:20,

    },
    container:{
        flex:1,
        backgroundColor:'white',

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
    containers:{

        alignItems:'center',
        backgroundColor: 'white',
        paddingVertical:20,
    },
    title:{
        marginTop:10,
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
        width:Dimensions.get('window').width*0.8,
        height:Dimensions.get('window').height*0.5,
        resizeMode:'contain',
        marginVertical:30,
    },
})
export default observer(Page)
