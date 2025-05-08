
import React, {useState,useEffect} from "react";
import {View, Text, Button, StyleSheet, Dimensions, Animated, TouchableWithoutFeedback} from "react-native";
import Swiper from "react-native-deck-swiper"
import {observer} from "mobx-react";
import FastImage from "react-native-fast-image";
import userStore from "../../store/userStore";
import Modal from "react-native-modal";
import {Icon, Spinner} from "native-base";
import {TouchableOpacity} from "react-native-gesture-handler";
import I18n from "react-native-i18n";
import * as MediaLibrary from "expo-media-library";
const CleanFast=({navigation,route})=>{
    const [fadeAnim] = useState(new Animated.Value(0));
    const [where,setWhere]=useState(0)
    const [cardindex,setCard]=useState(0)

    const screen = Dimensions.get('window')
    useEffect(()=>{
        if(route.params != undefined){
            if(route.params.others == true){

                userStore.setCards(route.params.indis)
            }else{
                userStore.getFastClean()

            }
        }else{
           userStore.getFastClean()
        }



    },[])

    return(
        <View style={[styles.container,{backgroundColor: userStore.activeTheme.background}]}>



            {userStore.fastClean.length>0 && (
                <Swiper
                    containerStyle={{zIndex:99,marginTop:-30}}
                    infinite={true}
                    cardStyle={{borderRadius: 20,}}
                    horizontalSwipe={false}
                    cards={userStore.fastClean}
                    onSwiping={(x,y)=>{
                        console.log(x,y)
                        setWhere(y)
                    }}

                    renderCard={(card,indis) => {
                        if(card == undefined)alert(JSON.stringify(card))
                        else
                        return (
                            <View style={styles.card}>

                                <View style={{position:'absolute',borderRadius: 10,bottom:-20,right:-10,width:100,height:40,backgroundColor:'#2007FF',zIndex:99,justifyContent: 'center',alignItems:'center'}}>
                                    <Text  style={{color:'white',fontSize: 16,fontFamily:'Roboto-Medium'}}>{userStore.formatBytes(card.node.image.fileSize)}</Text>

                                </View>
                                <FastImage
                                    onError={e => {
                                        // console.error(e)
                                        MediaLibrary.getAssetInfoAsync(userStore.getAssetId(card.node.image.uri)).then(data=>{
                                            if(!data){
                                                userStore.catchBlanks(card.node.image.uri)
                                            }

                                        })
                                    }

                                    }
                                    source={{uri:userStore.changeLink(card.node.image.uri)}} style={{width:'100%',height:'100%',zIndex:-1,borderRadius: 20,}}/>
                                {/*<Text style={styles.text}>{card}</Text>*/}

                            </View>
                        )
                    }}

                    onSwiped={(cardIndex) => {
                        // alert(cardIndex)

                        // setCard(cardIndex)
                        // alert(cardIndex)
                    }}

                    onSwipedTop={(index)=>{
                        // setTimeout(()=>{
                        // },1000)
                        userStore.fastCleanDelete(userStore.fastClean[index])
                        setWhere(0)
                        setCard(cardindex+1)

                    }}
                    onSwipedBottom={(index)=>{
                        // alert('saklandi')

                        setWhere(0)
                        setCard(cardindex+1)


                    }}
                    cardIndex={cardindex}

                    onSwipedAborted={()=>{

                        setWhere(0)
                    }}
                    backgroundColor={'transparent'}
                    stackSize= {3}
                    swipeBackCard
                    ref={swiper => {
                        this.swiper = swiper;
                    }}
                    overlayLabels={{
                        bottom: {
                            title: I18n.t('keep'),

                            style: {
                                label: {
                                    backgroundColor: "darkgreen",
                                    borderColor: "darkgreen",
                                    color: "white",
                                    borderWidth: 1
                                },
                                wrapper: {
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "flex-start"
                                }
                            }
                        },

                        top: {

                            title: I18n.t('deleteBig'),
                            style: {
                                label: {
                                    backgroundColor: "darkred",
                                    borderColor: "darkred",
                                    color: "white",
                                    borderWidth: 1
                                },
                                wrapper: {
                                    marginBottom: 20,
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "flex-end"
                                }
                            }
                        }
                    }}
                    animateOverlayLabelsOpacity
                    animateCardOpacity

                >


                </Swiper>
            )}
            <View style={{position:'absolute',width: screen.width,height: 60,justifyContent: 'center',alignItems:'center',top:70,zIndex:9999}}>

                <View style={styles.headerContainer}>

                    <TouchableOpacity style={{width:50,height:75,justifyContent:'center',alignItems:'center',zIndex:9999999,
                    backgroundColor:userStore.activeTheme.background}} onPress={()=> {
                        navigation.goBack()
                        userStore.resetTrash()
                    }}>
                        <FastImage source={userStore.theme == 'dark' ? require('../../../assets/leftbackwhite.png'):require('../../../assets/leftback.png')} style={{width:10,height:15}}/>
                    </TouchableOpacity>
                    <View style={{position:'absolute',width:screen.width*0.89,alignItems:'center'}}>

                    <Text style={{fontFamily:'Roboto-Medium',color:userStore.activeTheme.textColor}}>{I18n.t('fastClean')}</Text>
                    </View>

                    {cardindex!=0 && (
                        <TouchableOpacity style={{}} onPress={()=> {
                            this.swiper.swipeBack()


                            setTimeout(()=>{

                                userStore.undoTrash(cardindex-1)
                                setCard(cardindex-1)
                            },1000)
                        }}>
                            <FastImage source={userStore.theme == 'dark' ? require('../../../assets/undowhite.png'):require('../../../assets/undo.png')} style={{width:30,height:30}}/>
                        </TouchableOpacity>
                    )}


                </View>
                {userStore.fastCleanTrash.length ==0 && (

                <View style={{justifyContent: 'center',alignItems:'center',backgroundColor:'#2107FF',paddingHorizontal:20,borderRadius: 20,zIndex: -1}}>

                    <Text style={{color:'white',fontFamily:'Roboto-Medium'}}>{I18n.t('cleanClue')}</Text>
                </View>
                )}
            </View>
            {/*{where!=0 && (*/}
            {/*    <View style={{height:20,position:'absolute',bottom:100,width:screen.width,justifyContent:'center',alignItems: 'center',zIndex:99}}  >*/}
            {/*        <View style={{width:screen.width*0.4,height:60,justifyContent:'center',alignItems: 'center',backgroundColor:'white',borderWidth:2,borderColor:where<0?'#EE0304':'#3BC600',borderRadius: 20}}>*/}
            {/*            <Text style={{fontFamily:'Roboto-Regular',fontSize: 20}}>{where<0?'Sil':'Sakla'}</Text>*/}

            {/*        </View>*/}
            {/*    </View>*/}
            {/*)}*/}
            {userStore.fastCleanTrash.length>0 && (
                <View style={{height:20,position:'absolute',bottom:60,width:screen.width*0.9,marginLeft:20,zIndex:99}}  >


                    <View style={{borderRadius: 10,flexDirection:'row',paddingHorizontal:15,alignItems:'center',justifyContent: 'space-between',height:70,width:'100%',backgroundColor:userStore.activeTheme.homeBoxBackground}}>
                        <View style={{flexDirection: 'row',}}>

                        <View style={{width:40,height:40,borderRadius: 20,justifyContent: 'center',alignItems:'center',backgroundColor:'#F2F5FF'}}>
                            <Text>{userStore.fastCleanTrash.length}</Text>
                        </View>

                            <Text style={{marginLeft: 10,fontFamily:'Roboto-Medium',color:userStore.activeTheme.textColor}}>{I18n.t('inTrash')}</Text>

                        </View>
                        <TouchableOpacity onPress={()=>{
                            userStore.emptyTrash(navigation)
                        }} disabled={userStore.deleteLoading} style={{flexDirection:'row',backgroundColor:'#2007FF',paddingHorizontal:20,height:40,alignItems:'center',borderRadius: 20}}>
                            {userStore.deleteLoading ? (
                                <Spinner size={'small'} color={'white'}/>
                            ):(
                                <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems:'center'}}>
                                    <Icon name={'trash-outline'} style={{color:'white'}}/>
                                    <Text style={{fontFamily:'Roboto-Medium',fontSize: 13,color:'white'}}>{I18n.t('emptyTrash')}</Text>
                                </View>
                            )}


                        </TouchableOpacity>


                    </View>
                </View>
            )}

        </View>
    )
}
export default observer(CleanFast)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5FCFF",

    },
    card: {
        width:Dimensions.get('window').width*0.9,
        height:Dimensions.get('window').height*0.6,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#E8E8E8",
        justifyContent: "center",
        backgroundColor: "white",
        overflow:'visible',
        marginTop:100
    },
    text: {
        textAlign: "center",
        fontSize: 50,
        backgroundColor: "transparent"
    },
    headerContainer:{
        marginTop:20,
        marginBottom:30,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'90%',

        zIndex:99994,

    },
});
