import React, {useEffect, useState, useRef} from 'react'
import {StyleSheet, View, Text, TouchableWithoutFeedback, Image, FlatList, TouchableOpacity} from "react-native";
import {observer} from "mobx-react";
import {Icon} from "native-base";
import FastImage from "react-native-fast-image";
import userStore from "../../store/userStore";
import I18n from '../../../lang/index';

const Detail = ({navigation,route}) =>{
    useEffect(()=>{
    },[])
    const [active,setActive]=useState(route.params.index)
    const flatList = useRef(FlatList);

    return(
        <View style={[styles.container,{backgroundColor:userStore.activeTheme.background}]}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={{width:60,height:40,justifyContent:'center'}} onPress={()=>navigation.goBack()}>
                    <FastImage source={userStore.theme == 'dark' ? require('../../../assets/leftbackwhite.png'):require('../../../assets/leftback.png')} style={{width:10,height:15,marginLeft:10}}/>
                </TouchableOpacity>
                <Text style={{fontFamily:'Roboto-Bold',fontSize:20,color:userStore.activeTheme.textColor}}> {I18n.t('see')}</Text>

            </View>

            <View style={{width:'100%',height:'60%',marginVertical:30,backgroundColor: '#BEBEBE'}}>
                <FastImage source={{uri:userStore.changeLink(route.params.group.images[active])}} style={{width:'100%',height:'100%',borderRadius:10}}/>

                <View style={{position:'absolute',left:20,top:20,zIndex:99}}>

                    {active ==0&& (
                        <View style={{flexDirection:'row',backgroundColor:'#D9E3FF',padding:2,alignItems:'center',borderRadius:20,paddingHorizontal:8}}>

                            <Image source={require('../../../assets/medal.png')} style={{width:25,height:25}}/>
                            <Text style={{fontFamily:'Roboto-Regular',fontSize:12,textAlign:'center',marginLeft:5}}>{I18n.t('best')}</Text>
                        </View>
                    ) }


                </View>
                {route.params.page == 'similar' ? (
                    <View style={{position:'absolute',right:20,bottom:20,zIndex:99}}>
                        <TouchableWithoutFeedback onPress={()=>userStore.setSelected(route.params.group.images[active])}>
                            <FastImage source={userStore.selected.indexOf(route.params.group.images[active]) == -1 ? require('../../../assets/tick_close.png'): require('../../../assets/tick_open.png')  }  style={{width:30,height:30}}/>
                        </TouchableWithoutFeedback>


                    </View>
                ):route.params.page=='same'?(
                    <View style={{position:'absolute',right:20,bottom:20,zIndex:99}}>
                        <TouchableWithoutFeedback onPress={()=>userStore.setSameSelected(route.params.group.images[active])}>
                            <FastImage source={userStore.sameSelected.indexOf(route.params.group.images[active]) == -1 ? require('../../../assets/tick_close.png'): require('../../../assets/tick_open.png')  }  style={{width:30,height:30}}/>
                        </TouchableWithoutFeedback>


                    </View>):(
                    <View style={{position:'absolute',right:20,bottom:20,zIndex:99}}>
                        <TouchableWithoutFeedback onPress={()=>userStore.setSelectedScreen(route.params.group.images[active])}>
                            <FastImage source={userStore.screenSelected.indexOf(route.params.group.images[active]) == -1 ? require('../../../assets/tick_close.png'): require('../../../assets/tick_open.png')  }  style={{width:30,height:30}}/>
                        </TouchableWithoutFeedback>


                    </View>)}
            </View>
            <View style={{flexDirection: 'row',paddingHorizontal:20}}>
                <FlatList
                    ref={flatList}

                    initialScrollIndex={route.params.index}

                    onScrollToIndexFailed={info => {
                        const wait = new Promise(resolve => setTimeout(resolve, 500));
                        wait.then(() => {
                            flatList.current?.scrollToIndex({ index: info.index, animated: true });
                        });
                    }}

                    showsHorizontalScrollIndicator={false} horizontal={true} data={route.params.group.images} renderItem={({item,index})=>{

                    return(
                        <TouchableWithoutFeedback onPress={()=>{
                            setActive(index)
                        }}>
                        <View style={{backgroundColor: '#BEBEBE',width:100,height:100,borderRadius:10,marginLeft:10,borderWidth:index == active ? 5:0,borderColor:'#D9E3FF'}}>
                            <FastImage source={{uri:userStore.changeLink(item)}} style={{width:'100%',height:'100%',borderRadius:10}}/>
                            {route.params.page == 'similar' ? (
                                <View style={{position:'absolute',right:10,top:10,zIndex:99}}>
                                    <TouchableOpacity onPress={()=> {
                                        userStore.setSelected(item)
                                    }}>

                                        <FastImage source={userStore.selected.indexOf(item) == -1 ? require('../../../assets/tick_close.png'): require('../../../assets/tick_open.png')  } style={{width:20,height:20}}/>
                                    </TouchableOpacity>


                                </View>
                            ):route.params.page=='same'?( <View style={{position:'absolute',right:10,top:10,zIndex:99}}>
                                <TouchableOpacity onPress={()=> {
                                    userStore.setSameSelected(item)
                                }}>

                                    <FastImage source={userStore.sameSelected.indexOf(item) == -1 ? require('../../../assets/tick_close.png'): require('../../../assets/tick_open.png')  } style={{width:20,height:20}}/>
                                </TouchableOpacity>


                            </View>):( <View style={{position:'absolute',right:10,top:10,zIndex:99}}>
                                <TouchableOpacity onPress={()=> {
                                    userStore.setSelectedScreen(item)
                                }}>

                                    <FastImage source={userStore.screenSelected.indexOf(item) == -1 ? require('../../../assets/tick_close.png'): require('../../../assets/tick_open.png')  } style={{width:20,height:20}}/>
                                </TouchableOpacity>


                            </View>)}
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

export default observer(Detail)
