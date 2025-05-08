import React, {useState,useEffect} from 'react'
import {
    View,
    StyleSheet,
    Image,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Text,
    ScrollView,
    TouchableOpacity, FlatList
} from "react-native";
import {observer} from "mobx-react";
import {Icon, Spinner} from "native-base";
import GifImage from "@lowkey/react-native-gif/src/index";
import Modal from "react-native-modal";
import userStore from "../../store/userStore";
import {usePowerState} from 'react-native-device-info'
import {FlashList} from "@shopify/flash-list";
import I18n from '../../../lang/index';
import FastImage from "react-native-fast-image";
import Contacts from "react-native-contacts";

const DupDetail = ({navigation,route}) =>{
    const [pickerModal,setPickerModal] = useState(false)
    const [deleteModal,setDeleteModal] = useState(false)
    const [selected,setSelected]=useState([])

    useEffect(()=>{

    },[])
    const [allSelected,setAllSelected] = useState(userStore.activeDuplicated.find((it,indis)=>{
        if(userStore.selectedDuplicated.indexOf(it) == -1) return false
        else if(indis==userStore.activeDuplicated.length-1) return true
    }))
    const powerState = usePowerState(); // 'charging'
    return(
        <View style={{flex:1,paddingVertical:40,backgroundColor:userStore.activeTheme.background}}>
            <View style={{position:'absolute',width:'150%',height:'40%'}}>
                <Image source={require('../../../assets/contactsFar.png')} style={{width:'100%',height:'100%',resizeMode:'cover'}}/>
            </View>

            <ScrollView >

                <View style={styles.headerContainer}>
                    <TouchableWithoutFeedback onPress={()=> {
                        navigation.goBack()
                        userStore.resetDuplicatedContacts()
                    }}>
                        <FastImage source={userStore.theme == 'dark'?require('../../../assets/leftbackwhite.png'):require('../../../assets/leftback.png')} style={{width:10,height:15}}/>
                    </TouchableWithoutFeedback>
                    <View style={{}}>
                        <Text style={[styles.headerInfoText, {textAlign: 'right',color:userStore.activeTheme.textColor}]}>


                            {I18n.t('similarSelected',{total:userStore.selectedDuplicated.length})}

                        </Text>

                    </View>

                </View>
                <View style={styles.headerContainer}>
                    <Text style={[styles.homeTitle,{color:userStore.activeTheme.textColor}]}>{I18n.t('contacts')}</Text>

                    <Text></Text>

                </View>


                <View style={styles.mainContainer}>



                    {userStore.selectedDuplicated.length>0 && (
                        <View style={{paddingHorizontal:30,width:'100%',marginVertical:10}}>

                        <Text style={{fontFamily:'Roboto-Medium',fontSize:20,color:userStore.activeTheme.textColor}}> {I18n.t('merged')}</Text>
                        <View style={{width:'100%',backgroundColor:'#497CAC',height:90,borderRadius:20,marginTop:20,justifyContent:'center'}}>
                            <Text style={{fontSize:15,fontFamily:'Roboto-Medium',color:'white',paddingHorizontal:15}}>{route.params.item.givenName} {route.params.item.familyName}</Text>

                            <View style={{flexDirection:'row'}}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginHorizontal:10}}>
                                    {userStore.selectedDuplicated && userStore.selectedDuplicated.map((item,indis)=>{
                                        console.log(JSON.stringify(item))


                                        if(indis==0)
                                            return(
                                                <Text style={{fontSize:15,fontFamily:'Roboto-Medium',color:'white',paddingLeft:15,marginTop:10}}>{userStore.activeDuplicated.map(it=>it.recordID == item && it.phoneNumbers && it.phoneNumbers.slice(0,1).map(ss=>ss.number))}</Text>

                                            )


                                    })}
                                </ScrollView>

                            </View>

                            {/*<View style={{position:'absolute',height:'100%',justifyContent:'center',right:20}}>*/}
                            {/*    <Image source={require('../../../assets/rightarrow.png')} style={{width:12,height:12,resizeMode:'contain'}}/>*/}

                            {/*</View>*/}
                        </View>
                    </View>)}


                    <View style={{paddingHorizontal:30,width:'100%',marginVertical:10}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{fontFamily:'Roboto-Medium',fontSize:20,color:userStore.activeTheme.textColor}}> {I18n.t('willMerge')}</Text>
                            <TouchableOpacity onPress={()=>{
                                if(allSelected){
                                    userStore.activeDuplicated.find(it=>{
                                        // if(allSelected){
                                        // }else{
                                        //
                                        // if(userStore.selected.indexOf(it)!= -1) userStore.setSelected(it)
                                        // }
                                        if(userStore.selectedDuplicated.indexOf(it.recordID)!=-1)
                                            userStore.setSelectedDuplicated(it.recordID)


                                    })
                                }else{
                                    userStore.activeDuplicated.find(it=>{
                                        // if(allSelected){
                                        // }else{
                                        //
                                        // if(userStore.selected.indexOf(it)!= -1) userStore.setSelected(it)
                                        // }
                                        if(userStore.selectedDuplicated.indexOf(it.recordID)==-1)
                                            userStore.setSelectedDuplicated(it.recordID)


                                    })
                                }

                                userStore.activeDuplicated.find((it,indis)=>{
                                    if(userStore.selectedDuplicated.indexOf(it.recordID) == -1) {
                                        setAllSelected(false)

                                        return false

                                    }
                                    else if(indis==userStore.activeDuplicated.length-1) {
                                        setAllSelected(true)
                                        // alert(true)

                                        return true
                                    }
                                })

                            }} style={styles.menuRightContainer}>

                                <Text style={[styles.menuRightText,{color:userStore.activeTheme.textColor}]}>{allSelected ? I18n.t('deselectAll'):I18n.t('selectAll')}</Text>

                            </TouchableOpacity>
                        </View>
                        {userStore.activeDuplicated.map((item,index)=>{
                            console.log(item.phoneNumbers)
                            // alert(JSON.stringify())
                            return(
                                <View style={{width:'100%',backgroundColor:'#D7E3FF',height:90,borderRadius:20,marginTop:20,justifyContent:'center'}}>
                                    <Text style={{fontSize:15,fontFamily:'Roboto-Medium',paddingHorizontal:15}}>{item.givenName} {item.familyName}</Text>
                                    {item.phoneNumbers.length>0 ?
                                        <Text style={{fontSize:15,fontFamily:'Roboto-Medium',paddingHorizontal:15,marginTop:10}}>{item.phoneNumbers[0].number}</Text>:
                                        <Text style={{fontSize:15,fontFamily:'Roboto-Medium',paddingHorizontal:15,marginTop:10}}>{I18n.t('noNumber')}</Text>

                                    }

                                    <View style={{position:'absolute',height:'100%',justifyContent:'center',right:20}}>
                                        <TouchableOpacity onPress={()=> {
                                            userStore.setSelectedDuplicated(item.recordID)
                                            userStore.activeDuplicated.find((it,indis)=>{
                                                if(userStore.selectedDuplicated.indexOf(it.recordID) == -1) {
                                                    setAllSelected(false)

                                                    return false

                                                }
                                                else if(indis==userStore.activeDuplicated.length-1) {
                                                    setAllSelected(true)
                                                    // alert(true)

                                                    return true
                                                }
                                            })

                                        }}>

                                        <Image source={userStore.selectedDuplicated.indexOf(item.recordID) != -1 ? require('../../../assets/tick_open.png'):require('../../../assets/tick_close.png')} style={{width:25,height:25,resizeMode:'contain'}}/>
                                        </TouchableOpacity>


                                    </View>
                                </View>
                            )
                        })}

                    </View>


                </View>


            </ScrollView>



            {userStore.selectedDuplicated.length>1 && (
                <View style={{width:'100%',position:'absolute',justifyContent:'center',alignItems:'center',bottom:50}}>
                    <TouchableWithoutFeedback style={{

                    }}
                                              onPress={()=>{
                                                  userStore.mergeContacts(navigation)
                                              }}
                    >
                        <View style={{width:'70%',height:60,backgroundColor:'#0011FA',justifyContent:'center',alignItems:'center',borderRadius:33}}>
                            {userStore.deleteLoading ? (
                                <Spinner size={'large'} color={'white'}/>
                            ):(
                                <View style={{flexDirection:'row'}}>
                                    <FastImage source={require('../../../assets/mergeIcon.png')} style={{width:20,height:20}}/>
                                <Text style={{color:'white',fontFamily:'Roboto-Medium',fontSize:20}}>
                                    {I18n.t('mergeContacts',{total:userStore.selectedDuplicated.length})}
                                </Text>
                                </View>
                            )}

                        </View>
                    </TouchableWithoutFeedback>
                </View>
            )}
        </View>
    )
}
let styles= StyleSheet.create({
    buttonsContainer: {flexDirection:'row',
        justifyContent:'space-between',
        borderRadius:20,
        backgroundColor:'#D9E3FF',
        paddingHorizontal: 10,
        paddingVertical:7,
        alignItems:'center',  },
    headerInfoText:{color:'#5D6073',fontFamily:'Roboto-Regular',fontSize:15},
    mainContainer:{
        width:'100%',
        justifyContent:'center',
        marginTop:30,

    },
    buttonText:{
        color:'white',
        textAlign:'center',
        fontFamily:'Roboto-Medium',
        fontSize:20
    },
    container:{
        flex:1,
        backgroundColor: 'white',
        paddingTop:50,

    },
    menuRightText:{
        color:'#C1C1C1',
        fontSize:15,
        fontFamily: 'Roboto-Medium'
    },
    menuRightIcon:{
        width:10,
        height:10,marginLeft:10
    },
    menuRightContainer:{

        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderRadius:20,
        paddingHorizontal:10,
        paddingVertical:5
    },
    menuIcon:{
        width:25,
        height:25
    },
    menuText:{
        fontSize:20,
        marginLeft: 10,
        fontWeight:'500'
    },
    menuLeftContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',

    },
    menuItemContainer:{
        alignItems:'center',
        justifyContent:'space-between',
        marginHorizontal:20,
        paddingVertical:15,
        borderRadius:20,
        marginVertical:0,


    },
    twiceContainers:{

        width:160,
        height:160,
        backgroundColor:'gray',
        borderRadius:20,
        marginTop:20,
        marginLeft:8,
        zIndex:10
    },
    menuInsideContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%'
    },
    headerContainer:{
        marginTop:20,
        marginLeft:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingRight:20,
    },
    homeTitle:{
        fontFamily:'Roboto-Bold',
        fontSize:30,
    },
    allowButtonContainer:{
        backgroundColor: '#2007FF',
        paddingHorizontal:20,
        paddingVertical:10,
        borderRadius:10,
        marginVertical:10

    },
    allowButtonText:{
        color:'white',
    },
    notAllowContainer:{
        justifyContent:'center',
        alignItems:'center',
        marginVertical: 20
    },
    robot:{
        width:200,
        height:200,
        borderRadius: 20,
        marginLeft:-10,
        marginVertical:20
    },
    allowTitle:{
        fontWeight:'500',
        fontSize:20,
        textAlign:'center',
        width:'80%'
    },
    allowDesc:{
        fontWeight:'400',
        fontSize:15,
        textAlign:'center',
        width:'80%',
        color:'#828CA5',
        marginVertical:10
    },

})
export default observer(DupDetail)
