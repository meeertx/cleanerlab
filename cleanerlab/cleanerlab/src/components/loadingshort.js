import React, {useState,useEffect}  from 'react'
import {StyleSheet, View, Text, TouchableWithoutFeedback, ScrollView,} from "react-native";
import Accordion from 'react-native-collapsible/Accordion';
import {observer} from "mobx-react";
import userStore from "../store/userStore";
import FastImage from "react-native-fast-image";
import {Content, Spinner} from "native-base";
import LottieView from "lottie-react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import I18n from '../../lang/index';

const LoadingShort = ({navigation,route})=>{




    function percentage(partialValue, totalValue) {
        return (100 * partialValue) / totalValue;
    }
    return(
        <View style={styles.container}>
            <FastImage source={require('../../assets/logo.png')} style={{width:75,height:75,marginVertical:20}}/>
            <Spinner size={'large'} color={'white'}/>
            {/*<View>*/}
            {/*    <View style={{width:'100%',alignItems:'center',justifyContent:'center'}}>*/}
            {userStore.processing && (
                <View>
                    {!userStore.photosoptimized  ? (
                            <AnimatedCircularProgress
                                size={200}
                                width={3}
                                fill={percentage(userStore.photoOptimized,userStore.wholeImages.length)}
                                tintColor="#00e0ff"
                                backgroundColor="#3d5875">
                                {
                                    (fill) => (
                                        <Text style={{fontFamily:'Roboto-Medium',fontSize:20,color:'white'}}>
                                            {percentage(userStore.photoOptimized,userStore.wholeImages.length).toFixed(1)}%

                                        </Text>
                                    )
                                }
                            </AnimatedCircularProgress>

                    ):(
                        <Text style={{fontFamily:'Roboto-Medium',fontSize:20,textAlign:'center',marginTop:20,color:'white'}}>
                            {I18n.t('preparing')}...
                        </Text>
                    )}


                    <Text style={{fontFamily:'Roboto-Medium',fontSize:20,textAlign:'center',marginTop:20,color:'white'}}>{I18n.t('pleaseWait')}</Text>
                </View>

            )}

            {/*       */}

            {/*    </View>*/}

            {/*</View>*/}


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
        backgroundColor:'#0076FF',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:50,
        paddingBottom:100
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
export default observer(LoadingShort)
