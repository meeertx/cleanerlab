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
import { AlphabetList } from "react-native-section-alphabet-list";
import I18n from '../../../lang/index';

import {usePowerState} from 'react-native-device-info'
import {FlashList} from "@shopify/flash-list";
import FastImage from "react-native-fast-image";
const ContactList = ({navigation,route}) =>{

    const data = [
        { value: 'Burak Aydın', key: 'lCUTs2s' },

        { value: 'Lillie-Mai Allen', key: 'lCUTs2' },
        { value: 'Emmanuel Goldstein', key: 'TXdL0c' },
        { value: 'Winston Smith', key: 'zqsiEw' },
        { value: 'William Blazkowicz', key: 'psg2PM' },
        { value: 'Gordon Comstock', key: '1K6I18' },
        { value: 'Philip Ravelston', key: 'NVHSkA' },
        { value: 'Rosemary Waterlow', key: 'SaHqyG' },
        { value: 'Julia Comstock', key: 'iaT1Ex' },
        { value: 'Mihai Maldonado', key: 'OvMd5e' },
        { value: 'Murtaza Molina', key: '25zqAO' },
        { value: 'Peter Petigrew', key: '8cWuu3' },
    ]
    const [pickerModal,setPickerModal] = useState(false)
    const [deleteModal,setDeleteModal] = useState(false)
    const powerState = usePowerState(); // 'charging'
    let renderCustomItem= ({item, index}) => (
        <View style={{alignItems:'center'}}>

        <TouchableWithoutFeedback  onPress={()=>{
            // setPickerModal(!pickerModal)

        }}>
            <View style={{paddingHorizontal:15,flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'90%',height:60,borderRadius:20,backgroundColor:userStore.activeTheme.homeBoxBackground,marginBottom:20}}>
                <Text style={{paddingLeft:10,color:userStore.activeTheme.textColor,fontFamily:'Roboto-Medium',fontSize:16,width:'70%'}}>{item.givenName} {item.familyName}</Text>
                <TouchableOpacity onPress={()=>{

                    userStore.setSelectedContacts(item.recordID)
                }}>

                    <FastImage source={userStore.selectedContacts.indexOf(item.recordID) != -1  ? require('../../../assets/tick_open.png'):require('../../../assets/tick_close.png')} style={{width:25,height:25,resizeMode:'contain'}}/>
                </TouchableOpacity>

            </View>
        </TouchableWithoutFeedback>
            <View style={{width:'100%'}}>
                {userStore.contacts[index+1] != undefined && item.givenName[0] && index<userStore.contacts.length && userStore.contacts[index+1].givenName[0].toUpperCase() != item.givenName[0].toUpperCase() && (
                    <View style={{marginBottom:20,marginLeft:20,paddingVertical:10,backgroundColor:'#557BA8',width:'15%',borderRadius:20,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'white',fontFamily:'Roboto-Regular',fontSize:18}}>{userStore.contacts[index+1].givenName[0].toUpperCase()}</Text>
                    </View>
                )}
            </View>

        </View>
    )
    return(
        <View style={{flex:1,paddingVertical:40,backgroundColor:userStore.activeTheme.background}}>
            <View style={{position:'absolute',width:'150%',height:'40%'}}>
                <Image source={require('../../../assets/contactsFar.png')} style={{width:'100%',height:'100%',resizeMode:'cover'}}/>
            </View>


                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        style={{width:60,height:20,justifyContent:'center'}}

                        onPress={()=>navigation.goBack()}>
                        <FastImage source={userStore.theme == 'dark'?require('../../../assets/leftbackwhite.png'):require('../../../assets/leftback.png')} style={{width:10,height:15}}/>
                    </TouchableOpacity>
                    <Text></Text>

                </View>
            <View style={styles.headerContainer}>
                <Text style={[styles.homeTitle,{color:userStore.activeTheme.textColor}]}>{I18n.t('contacts')}</Text>

                <View style={{}}>
                    <Text style={[styles.headerInfoText, {textAlign: 'right',color:userStore.activeTheme.textColor}]}>
                        {I18n.t('similarSelected',{total:userStore.selectedContacts.length})}
                    </Text>

                </View>

            </View>


                <View style={styles.mainContainer}>

                    {/*<AlphabetList*/}
                    {/*    data={userStore.contacts.map(it=>{*/}
                    {/*        it['value']=it.givenName+' '+it.familyName*/}
                    {/*        return it*/}
                    {/*    })}*/}
                    {/*    indexLetterStyle={{*/}
                    {/*        color: 'blue',*/}
                    {/*        fontSize: 15,*/}
                    {/*        */}
                    {/*    }}*/}

                    {/*    uncategorizedAtTop={true}*/}
                    {/*    renderCustomItem={renderCustomItem}*/}
                    {/*    renderCustomSectionHeader={(section) => {*/}
                    {/*        return(*/}
                    {/*            <View style={{marginLeft:30,paddingVertical:10,backgroundColor:'#557BA8',width:'15%',borderRadius:20,justifyContent:'center',alignItems:'center'}}>*/}
                    {/*                <Text style={{color:'white',fontFamily:'Roboto-Regular',fontSize:18}}>{section.title}</Text>*/}
                    {/*            </View>*/}
                    {/*        )*/}
                    {/*    }}*/}
                    {/*/>*/}

                    {userStore.contacts.length >0 && (
                        <FlashList renderItem={renderCustomItem} data={userStore.contacts.slice()} estimatedItemSize={userStore.contacts.length}/>

                    )}
                    {/*<AlphabetList*/}
                    {/*    data={data}*/}
                    {/*    indexLetterStyle={{*/}
                    {/*        color: 'blue',*/}
                    {/*        fontSize: 15,*/}
                    {/*    }}*/}
                    {/*    uncategorizedAtTop={true}*/}
                    {/*    renderCustomItem={renderCustomItem}*/}
                    {/*    renderCustomSectionHeader={(section) => {*/}
                    {/*        return(*/}
                    {/*            <View style={{marginLeft:30,paddingVertical:10,backgroundColor:'#557BA8',width:'15%',borderRadius:20,justifyContent:'center',alignItems:'center'}}>*/}
                    {/*                <Text style={{color:'white',fontFamily:'Roboto-Regular',fontSize:18}}>{section.title}</Text>*/}
                    {/*            </View>*/}
                    {/*        )*/}
                    {/*    }}*/}
                    {/*/>*/}


                </View>





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
                                <Text style={{fontFamily:'Roboto-Medium',color:'white'}}>{I18n.t('cancel')}</Text>
                            </View>
                        </TouchableWithoutFeedback>


                    </View>
                </View>

            </Modal>
            {userStore.selectedContacts.length>0 && (
                <View style={{width:'100%',position:'absolute',justifyContent:'center',alignItems:'center',bottom:50}}>
                    <TouchableWithoutFeedback style={{

                    }}
                                              onPress={()=>{
                                                  userStore.deleteContacts(navigation)
                                              }}
                    >
                        <View style={{width:'70%',height:60,backgroundColor:'#0011FA',justifyContent:'center',alignItems:'center',borderRadius:33}}>
                            {userStore.deleteLoading ? (
                                <Spinner size={'large'} color={'white'}/>
                            ):(
                                <Text style={{color:'white',fontFamily:'Roboto-Medium',fontSize:20}}>
                                    {I18n.t('deleteContacts',{total:userStore.selectedContacts.length})}
                                </Text>
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
        flex:1,


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
export default observer(ContactList)
