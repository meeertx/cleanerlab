import React, {useState,useEffect} from 'react'
import {
    View,
    StyleSheet,
    Image,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Text,
    ScrollView,
    TouchableOpacity, FlatList, Alert, Linking
} from "react-native";
import I18n from '../../../lang/index';

import {observer} from "mobx-react";
import {Icon, Spinner} from "native-base";
import GifImage from "@lowkey/react-native-gif/src/index";
import Modal from "react-native-modal";
import userStore from "../../store/userStore";
import {usePowerState} from 'react-native-device-info'
import FastImage from "react-native-fast-image";
import {PERMISSIONS,check,request} from "react-native-permissions";
const Contacts = ({navigation,route}) =>{
    const [pickerModal,setPickerModal] = useState(false)
    const [deleteModal,setDeleteModal] = useState(false)
    const [permis,setPermis]=useState(true)
    const powerState = usePowerState(); // 'charging'
    useEffect(()=>{


        check(PERMISSIONS.IOS.CONTACTS).then((result) => {
            if(result != 'granted'){
                setPermis(false)

                request(PERMISSIONS.IOS.CONTACTS).then(cevap=>{
                    if(cevap != 'granted'){
                        Alert.alert(I18n.t('permissionNeeded'),I18n.t('findDuplicates'),
                            [
                                {
                                    text: I18n.t('cancel'),
                                    onPress: () => console.log('Cancel Pressed'),
                                    style: 'cancel',
                                },
                                {text: I18n.t('settings'), onPress: () => Linking.openSettings()},
                            ]  )

                    }else{
                        setPermis(true)

                        userStore.getAllContacts()
                    }
                })
            }else{

                userStore.getAllContacts()

            }
        })

    },[])
    return(
        <View style={{flex:1,paddingVertical:40,backgroundColor:userStore.activeTheme.background}}>
            <View style={{position:'absolute',width:'150%',height:'40%'}}>
                <Image source={require('../../../assets/contactsFar.png')} style={{width:'100%',height:'100%',resizeMode:'cover'}}/>
            </View>
            <ScrollView>
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        style={{width:60,height:20,justifyContent:'center'}}
                        onPress={()=>navigation.goBack()}>
                        <FastImage source={userStore.theme == 'dark' ? require('../../../assets/leftbackwhite.png'):require('../../../assets/leftback.png')} style={{width:10,height:15}}/>
                    </TouchableOpacity>
                    <Text></Text>

                </View>
                <View style={styles.headerContainer}>
                    <Text style={[styles.homeTitle,{color:userStore.activeTheme.textColor}]}>{I18n.t('contacts')}</Text>
                    <Text></Text>

                </View>


                <View style={styles.mainContainer}>

                    <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>

                        <TouchableWithoutFeedback  onPress={()=>{
                            // setPickerModal(!pickerModal)
                            navigation.navigate('DuplicatedContactList')
                        }}>
                            <View style={{paddingHorizontal:15,flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'90%',height:60,borderRadius:20,backgroundColor:userStore.activeTheme.homeBoxBackground,marginBottom:20}}>
                                <Text style={{paddingLeft:10,color:userStore.activeTheme.textColor,fontFamily:'Roboto-Medium',fontSize:16}}>{I18n.t('duplicatedContacts')}</Text>
                                <View style={{height:40,width:'25%',backgroundColor:'#0011FA',justifyContent:'center',alignItems:'center',borderRadius:20}}>
                                    {userStore.contactsLoading ? (
                                        <Spinner size={'small'} color={'white'}/>
                                        ):(
                                        <Text style={{color:'white'}}>{userStore.duplicatedContactsName.length}</Text>

                                        )}
                                    <View style={{width:'100%',height:'100%',position:'absolute',alignItems:'flex-end',justifyContent:'center',paddingRight: 5}}>
                                        <Image source={require('../../../assets/rightarrow.png')} style={{width:12,height:12,resizeMode:'contain'}}/>

                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback  onPress={()=>{
                            // setPickerModal(!pickerModal)
                            navigation.navigate('ContactList')
                        }}>
                            <View style={{paddingHorizontal:15,flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'90%',height:60,borderRadius:20,backgroundColor:userStore.activeTheme.homeBoxBackground,marginBottom:20}}>
                                <Text style={{paddingLeft:10,color:userStore.activeTheme.textColor,fontFamily:'Roboto-Medium',fontSize:16}}>{I18n.t('allContacts')}</Text>
                                <View style={{height:40,width:'25%',backgroundColor:'#0011FA',justifyContent:'center',alignItems:'center',borderRadius:20}}>
                                    <Text style={{color:'white'}}>{userStore.contacts.length}</Text>
                                    <View style={{width:'100%',height:'100%',position:'absolute',alignItems:'flex-end',justifyContent:'center',paddingRight: 5}}>
                                        <Image source={require('../../../assets/rightarrow.png')} style={{width:12,height:12,resizeMode:'contain'}}/>

                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>


                    </View>


                </View>


            </ScrollView>


            <Modal animationIn={'fadeInUp'} animationOut={'fadeOutUp'} isVisible={pickerModal} onBackdropPress={()=>setPickerModal(!pickerModal)} style={{width:'90%',height:'100%',justifyContent:'flex-end',paddingBottom: 50,alignItems:'center'}}>
                <TouchableWithoutFeedback onPress={()=>setPickerModal(!pickerModal)}>

                    <Text style={{color:'white',fontFamily:'Roboto-Medium',fontSize:18,marginBottom:20}}> Vazgeç </Text>
                </TouchableWithoutFeedback>
                <View style={{paddingLeft:15,flexDirection:'row',alignItems:'center',width:'90%',height:'8%',borderRadius:20,backgroundColor:'#EFF4FF',marginBottom:20}}>
                    <Image source={require('../../../assets/camera.png')} style={{width:30,height:30,resizeMode:'contain'}}/>
                    <Text style={{paddingLeft:10,color:'black',fontFamily:'Roboto-Medium',fontSize:16}}> Fotoğraf veya video çek </Text>

                </View>
                <View style={{paddingLeft:15,flexDirection:'row',alignItems:'center',width:'90%',height:'8%',borderRadius:20,backgroundColor:'#EFF4FF',marginBottom:20}}>
                    <Image source={require('../../../assets/gallery.png')} style={{width:30,height:30,resizeMode:'contain'}}/>
                    <Text style={{paddingLeft:10,color:'black',fontFamily:'Roboto-Medium',fontSize:16}}> Fotoğraf veya videoyu içe aktar </Text>

                </View>
            </Modal>
            {/*onPress={()=>setPickerModal(!pickerModal)}*/}
            <Modal animationIn={'fadeInUp'} animationOut={'fadeOutUp'} isVisible={deleteModal} onBackdropPress={()=>setDeleteModal(!deleteModal)} style={{width:'90%',height:'100%',justifyContent:'center',paddingBottom: 50,alignItems:'center'}}>

                <View style={{alignItems:'center',justifyContent:'space-around',paddingVertical:30,width:'100%',height:300,borderRadius:20,backgroundColor:'#EFF4FF'}}>
                    <Image source={require('../../../assets/blueTrash.png')} style={{width:40,height:40,resizeMode:'contain'}}/>
                    <Text style={{paddingHorizontal:20,color:'black',fontFamily:'Roboto-Medium',fontSize:20,textAlign:'center'}}>Dosyalar gizli kütüphanenizden
                        silinecek</Text>


                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <TouchableWithoutFeedback onPress={()=>setDeleteModal(!deleteModal)}>
                            <View style={{width:'30%',height:40,justifyContent:'center',borderRadius:20,alignItems:'center',backgroundColor:'#0011FA'}}>
                                <Text style={{fontFamily:'Roboto-Medium',color:'white'}}>Sil</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={()=>setDeleteModal(!deleteModal)}>
                            <View style={{width:'30%',marginLeft:20,height:40,justifyContent:'center',borderRadius:20,alignItems:'center',backgroundColor:'#497CAC'}}>
                                <Text style={{fontFamily:'Roboto-Medium',color:'white'}}>Vazgeç</Text>
                            </View>
                        </TouchableWithoutFeedback>


                    </View>
                </View>

            </Modal>

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
export default observer(Contacts)
