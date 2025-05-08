import React, {useEffect, useState} from 'react'
import {StyleSheet, View, Text, TouchableWithoutFeedback, Image, FlatList} from "react-native";
import {observer} from "mobx-react";
import {Icon} from "native-base";
import FastImage from "react-native-fast-image";
import userStore from "../../store/userStore";
import I18n from '../../../lang/index';

const WhiteListDetail = ({navigation,route}) =>{
    useEffect(()=>{
    },[])
    const [active,setActive]=useState(route.params.index)

    return(
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableWithoutFeedback onPress={()=>navigation.goBack()}>
                    <Image source={require('../../../assets/back_icon.png')} style={{width:20,height:20,resizeMode:'contain'}}/>
                </TouchableWithoutFeedback>
                <Text style={{fontFamily:'Roboto-Bold',fontSize:20}}> {I18n.t('see')}</Text>

            </View>

            <View style={{width:'100%',height:'60%',marginVertical:30,backgroundColor: '#BEBEBE'}}>
                <FastImage source={{uri:userStore.changeLink(userStore.kept[active])}} style={{width:'100%',height:'100%',borderRadius:10}}/>

                <View style={{position:'absolute',left:20,top:20,zIndex:99}}>




                </View>
                <View style={{position:'absolute',right:20,bottom:20,zIndex:99}}>
                    <TouchableWithoutFeedback onPress={()=>userStore.setSelectedKept(userStore.kept[active])}>
                        <FastImage source={userStore.keptSelected.indexOf(userStore.kept[active]) == -1 ? require('../../../assets/tick_close.png'): require('../../../assets/tick_open.png')  }  style={{width:30,height:30}}/>
                    </TouchableWithoutFeedback>


                </View>
            </View>
            <View style={{flexDirection: 'row',paddingHorizontal:20}}>
                <FlatList showsHorizontalScrollIndicator={false} horizontal={true} data={userStore.kept} renderItem={({item,index})=>{

                    return(
                        <TouchableWithoutFeedback onPress={()=>{
                            setActive(index)
                        }}>
                        <View style={{backgroundColor: '#BEBEBE',width:100,height:100,borderRadius:10,marginLeft:10,borderWidth:index == active ? 5:0,borderColor:'#D9E3FF'}}>
                            <FastImage source={{uri:userStore.changeLink(item)}} style={{width:'100%',height:'100%',borderRadius:10}}/>
                            <View style={{position:'absolute',right:10,top:10,zIndex:99}}>

                                <FastImage source={userStore.keptSelected.indexOf(item) == -1 ? require('../../../assets/tick_close.png'): require('../../../assets/tick_open.png')  } style={{width:20,height:20}}/>


                            </View>
                        </View>
                        </TouchableWithoutFeedback>
                    )
                }}/>


            </View>

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
        marginLeft:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingRight:20,
    },
})

export default observer(WhiteListDetail)
