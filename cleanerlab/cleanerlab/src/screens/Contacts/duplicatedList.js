import React, {useState,useEffect} from 'react'
import {
    View,
    StyleSheet,
    Image,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Text,
    ScrollView,
    TouchableOpacity, FlatList, Alert, Dimensions
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
import {runInAction} from "mobx";
import Flash from "../Premium/flash";
import Contacts from "react-native-contacts";
import AsyncStorage from "@react-native-community/async-storage";
const DuplicatedContactList = ({navigation,route}) =>{
    const screen = Dimensions.get('window')
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
    let renderCustomItem= ({item, index}) => {
        // console.log(item)
        let name = item.givenName + ' ' + item.familyName
        // console.log(name)
        let arr = []

        // Contacts.getContactsMatchingString(JSON.stringify(match)).then(data=>{
        //     console.log('......',data.length)
        // })

        userStore.mergeArr.find((it,indis)=>{
            if(it.givenName + ' ' + it.familyName == name ){
                console.log('varr',arr.length)
                if(arr.length>0){

                        arr.push(it)

                }else{
                arr.push(it)

                }

            }
            // if(indis==)
        })
        // let allSelected = userStore.activeMergeList.find(it=>{
        //     if(it[0].givenName+' '+it[0].familyName == name){
        //         let sonuc =  arr.find((ar,inx)=>{
        //             if(it.indexOf(ar)==-1){
        //                 return false
        //             }else if(inx==arr.length-1){
        //                 return true
        //             }
        //         })
        //         return sonuc
        //     }
        //
        // })
        let allSelected=arr.find((it,indis)=>{
            if(userStore.selectedMerges.indexOf(it.recordID) == -1) return false
            else if(indis==arr.length-1) return true
        })

        if(arr.length>1){
            return(

                <View style={{alignItems: 'center'}}>

                    <TouchableWithoutFeedback onPress={() => {
                        // setPickerModal(!pickerModal)
                        // alert('bastim')
                        // userStore.resetDuplicatedContacts()
                        // userStore.getContactByName(item.givenName + ' ' + item.familyName)
                        // navigation.navigate('DupDetail', {item})
                    }}>

                        <View style={{paddingHorizontal:20,width:'100%',marginVertical:10}}>

                            <Text style={{fontFamily:'Roboto-Medium',fontSize:20,color:userStore.activeTheme.textColor}}> {I18n.t('merged')}</Text>
                            <View style={{width:'100%',backgroundColor:'#497CAC',height:90,borderRadius:20,marginTop:20,justifyContent:'center'}}>
                                <Text style={{fontSize:15,fontFamily:'Roboto-Medium',color:'white',paddingHorizontal:15}}>{name}</Text>

                                <View style={{flexDirection:'row'}}>
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginHorizontal:10}}>


                                        {userStore.activeMergeList.length<1 ? [...new Set(arr.map(item => item.phoneNumbers.length>0 &&  item.phoneNumbers[0].number))].map((item,indis)=>{


                                            if(indis==0)
                                                return(
                                                    // <Text style={{fontSize:15,fontFamily:'Roboto-Medium',color:'white',paddingLeft:15,marginTop:10}}>{userStore.activeDuplicated.map(it=>it.recordID == item && it.phoneNumbers && it.phoneNumbers.map(ss=>ss.number))}</Text>
                                                    <Text style={{fontSize:15,fontFamily:'Roboto-Medium',color:'white',paddingLeft:15,marginTop:10}}>{item}</Text>

                                                )
                                            else
                                                return(
                                                    // <Text style={{fontSize:15,fontFamily:'Roboto-Medium',color:'white',paddingLeft:15,marginTop:10}}>{userStore.activeDuplicated.map(it=>it.recordID == item && it.phoneNumbers && it.phoneNumbers.map(ss=>ss.number))}</Text>
                                                    <Text style={{fontSize:15,fontFamily:'Roboto-Medium',color:'white',paddingLeft:15,marginTop:10}}> - {item}</Text>

                                                )


                                        }) :userStore.activeMergeList.map((merge,sira)=>{
                                            if(merge[0].givenName+' '+merge[0].familyName == name){
                                                return [...new Set(userStore.activeMergeList[sira].map(item => item.phoneNumbers.length>0 &&  item.phoneNumbers[0].number))].map((item,indis)=>{


                                                    if(indis==0)
                                                        return(
                                                            // <Text style={{fontSize:15,fontFamily:'Roboto-Medium',color:'white',paddingLeft:15,marginTop:10}}>{userStore.activeDuplicated.map(it=>it.recordID == item && it.phoneNumbers && it.phoneNumbers.map(ss=>ss.number))}</Text>
                                                            <Text style={{fontSize:15,fontFamily:'Roboto-Medium',color:'white',paddingLeft:15,marginTop:10}}>{item}</Text>

                                                        )
                                                    else
                                                        return(
                                                            // <Text style={{fontSize:15,fontFamily:'Roboto-Medium',color:'white',paddingLeft:15,marginTop:10}}>{userStore.activeDuplicated.map(it=>it.recordID == item && it.phoneNumbers && it.phoneNumbers.map(ss=>ss.number))}</Text>
                                                            <Text style={{fontSize:15,fontFamily:'Roboto-Medium',color:'white',paddingLeft:15,marginTop:10}}> - {item}</Text>

                                                        )


                                                })
                                            }else if(sira==userStore.activeMergeList.length-1){
                                                return [...new Set(arr.map(item => item.phoneNumbers.length>0 &&  item.phoneNumbers[0].number))].map((item,indis)=>{


                                                    if(indis==0)
                                                        return(
                                                            // <Text style={{fontSize:15,fontFamily:'Roboto-Medium',color:'white',paddingLeft:15,marginTop:10}}>{userStore.activeDuplicated.map(it=>it.recordID == item && it.phoneNumbers && it.phoneNumbers.map(ss=>ss.number))}</Text>
                                                            <Text style={{fontSize:15,fontFamily:'Roboto-Medium',color:'white',paddingLeft:15,marginTop:10}}>{item}</Text>

                                                        )
                                                    else
                                                        return(
                                                            // <Text style={{fontSize:15,fontFamily:'Roboto-Medium',color:'white',paddingLeft:15,marginTop:10}}>{userStore.activeDuplicated.map(it=>it.recordID == item && it.phoneNumbers && it.phoneNumbers.map(ss=>ss.number))}</Text>
                                                            <Text style={{fontSize:15,fontFamily:'Roboto-Medium',color:'white',paddingLeft:15,marginTop:10}}> - {item}</Text>

                                                        )


                                                })
                                            }
                                        })}
                                    </ScrollView>

                                </View>

                                {/*<View style={{position:'absolute',height:'100%',justifyContent:'center',right:20}}>*/}
                                {/*    <Image source={require('../../../assets/rightarrow.png')} style={{width:12,height:12,resizeMode:'contain'}}/>*/}

                                {/*</View>*/}
                            </View>
                        </View>
                        {/*<View style={{*/}
                        {/*    paddingHorizontal: 15,*/}
                        {/*    flexDirection: 'row',*/}
                        {/*    justifyContent: 'space-between',*/}
                        {/*    alignItems: 'center',*/}
                        {/*    width: '90%',*/}
                        {/*    height: 60,*/}
                        {/*    borderRadius: 20,*/}
                        {/*    backgroundColor: userStore.activeTheme.homeBoxBackground,*/}
                        {/*    marginBottom: 20*/}
                        {/*}}>*/}
                        {/*    <Text style={{*/}
                        {/*        paddingLeft: 10,*/}
                        {/*        color:userStore.activeTheme.textColor,*/}
                        {/*        fontFamily: 'Roboto-Medium',*/}
                        {/*        fontSize: 16,*/}
                        {/*        width: '70%'*/}
                        {/*    }}>{item.givenName} {item.familyName}</Text>*/}
                        {/*    <TouchableOpacity onPress={ () => {*/}
                        {/*        userStore.selectDupContacts(item.givenName + ' ' + item.familyName)*/}
                        {/*    }}>*/}

                        {/*        <FastImage*/}
                        {/*            source={userStore.willMergeNames.indexOf(name) != -1 ? require('../../../assets/tick_open.png') : require('../../../assets/tick_close.png')}*/}
                        {/*            style={{width: 25, height: 25, resizeMode: 'contain'}}/>*/}
                        {/*    </TouchableOpacity>*/}

                        {/*</View>*/}
                    </TouchableWithoutFeedback>
                    {/*<View style={{width:'100%'}}>*/}
                    {/*    {item.givenName[0] && index<userStore.duplicatedContactsName.length && userStore.duplicatedContactsName[index+1].givenName[0].toUpperCase() != item.givenName[0].toUpperCase() && (*/}
                    {/*        <View style={{marginBottom:20,marginLeft:20,paddingVertical:10,backgroundColor:'#557BA8',width:'15%',borderRadius:20,justifyContent:'center',alignItems:'center'}}>*/}
                    {/*            <Text style={{color:'white',fontFamily:'Roboto-Regular',fontSize:18}}>{userStore.duplicatedContactsName[index+1].givenName[0].toUpperCase()}</Text>*/}
                    {/*        </View>*/}
                    {/*    )}*/}
                    {/*</View>*/}

                    {arr.length>0 && (
                        <View>
                            <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal: 0,marginVertical:10,width:screen.width*0.9}}>
                                <Text style={{fontFamily:'Roboto-Medium',fontSize:20,color:userStore.activeTheme.textColor}}> {I18n.t('willMerge')}</Text>
                                <TouchableOpacity onPress={()=>{

                                    console.error('bu kim',allSelected)

                                    if(userStore.activeMergeList.length<1){
                                        arr.find(val=>{
                                            userStore.setMergedList(val)
                                            userStore.setSelectedMerges(val.recordID)
                                        })
                                    }else{
                                        if(allSelected == undefined){
                                            userStore.activeMergeList.find((it,son)=>{

                                                if(it[0].givenName+' '+it[0].familyName == name){
                                                    arr.find(val=>{
                                                        // alert('var')
                                                        if(it.indexOf(val)==-1){
                                                            console.error(val)
                                                            userStore.setMergedList(val)
                                                            userStore.setSelectedMerges(val.recordID)
                                                        }
                                                    })
                                                }else if(son == userStore.activeMergeList.length-1){

                                                    arr.find(val=>{

                                                        console.error(val)
                                                        userStore.setMergedList(val)
                                                        userStore.setSelectedMerges(val.recordID)

                                                    })
                                                }

                                            })
                                        }else{
                                            userStore.activeMergeList.find(vas=>{

                                                if(vas[0].givenName+' '+vas[0].familyName == name){
                                                    arr.find(sip=>{
                                                        if(vas.indexOf(sip)!=-1){

                                                            userStore.setMergedList(sip)
                                                            userStore.setSelectedMerges(sip.recordID)
                                                        }
                                                    })
                                                }

                                            })
                                            // if(userStore.activeMergeList.length<1){
                                            //
                                            // }else{
                                            //     userStore.activeMergeList.find(vas=>{
                                            //
                                            //         if(vas[0].givenName+' '+vas[0].familyName == name){
                                            //             alert(JSON.stringify(vas))
                                            //         }
                                            //
                                            //     })
                                            // }

                                        }
                                    }


                                    // if(allSelected ){

                                    // }else{
                                    //     userStore.activeMergeList.find(it=>{
                                    //         if(it[0].givenName+' '+it[0].familyName == name){
                                    //             arr.find(val=>{
                                    //                 if(it.indexOf(val)!=-1){
                                    //                     console.error(val)
                                    //                 userStore.setMergedList(val)
                                    //                 userStore.setSelectedMerges(val.recordID)
                                    //                 }
                                    //             })
                                    //         }
                                    //
                                    //     })
                                    // }

                                    // if(allSelected){
                                    //     userStore.activeDuplicated.find(it=>{
                                    //         // if(allSelected){
                                    //         // }else{
                                    //         //
                                    //         // if(userStore.selected.indexOf(it)!= -1) userStore.setSelected(it)
                                    //         // }
                                    //         if(userStore.selectedDuplicated.indexOf(it.recordID)!=-1)
                                    //             userStore.setSelectedDuplicated(it.recordID)
                                    //
                                    //
                                    //     })
                                    // }else{
                                    //     userStore.activeDuplicated.find(it=>{
                                    //         // if(allSelected){
                                    //         // }else{
                                    //         //
                                    //         // if(userStore.selected.indexOf(it)!= -1) userStore.setSelected(it)
                                    //         // }
                                    //         if(userStore.selectedDuplicated.indexOf(it.recordID)==-1)
                                    //             userStore.setSelectedDuplicated(it.recordID)
                                    //
                                    //
                                    //     })
                                    // }

                                    // userStore.activeDuplicated.find((it,indis)=>{
                                    //     if(userStore.selectedDuplicated.indexOf(it.recordID) == -1) {
                                    //         setAllSelected(false)
                                    //
                                    //         return false
                                    //
                                    //     }
                                    //     else if(indis==userStore.activeDuplicated.length-1) {
                                    //         setAllSelected(true)
                                    //         // alert(true)
                                    //
                                    //         return true
                                    //     }
                                    // })

                                }} style={styles.menuRightContainer}>

                                    <Text style={[styles.menuRightText,{color:userStore.activeTheme.textColor}]}>{allSelected ? I18n.t('deselectAll'):I18n.t('selectAll')}</Text>

                                </TouchableOpacity>
                            </View>
                            <FlatList data={arr.slice()} keyExtractor={(value)=>value.recordID} renderItem={(value)=>{
                                return(
                                    <View style={{width:'100%',backgroundColor:'#D7E3FF',height:90,borderRadius:20,marginVertical:10,justifyContent:'center'}}>
                                        <Text style={{fontSize:15,fontFamily:'Roboto-Medium',paddingHorizontal:15}}>{item.givenName} {item.familyName}</Text>
                                        {item.phoneNumbers.length>0 ?
                                            <Text style={{fontSize:15,fontFamily:'Roboto-Medium',paddingHorizontal:15,marginTop:10}}>{item.phoneNumbers[0].number}</Text>:
                                            <Text style={{fontSize:15,fontFamily:'Roboto-Medium',paddingHorizontal:15,marginTop:10}}>{I18n.t('noNumber')}</Text>

                                        }

                                        <View style={{position:'absolute',height:'100%',justifyContent:'center',right:20}}>
                                            <TouchableOpacity onPress={ () => {
                                                userStore.setMergedList(value.item)
                                                userStore.setSelectedMerges(value.item.recordID)

                                                // userStore.selectDupContacts(item.givenName + ' ' + item.familyName)
                                            }}>

                                                <FastImage
                                                    source={userStore.selectedMerges.indexOf(value.item.recordID) != -1 ? require('../../../assets/tick_open.png') : require('../../../assets/tick_close.png')}
                                                    style={{width: 25, height: 25, resizeMode: 'contain'}}/>
                                            </TouchableOpacity>



                                        </View>
                                    </View>

                                )
                            }}/>
                        </View>

                    )}


                </View>
            )
        }else{
            userStore.deleteDupName(item)
        }

    }
    // useEffect(()=>{
    //     setTimeout(()=>{
    //         AsyncStorage.setItem('duplicatedContactsName',JSON.stringify(userStore.duplicatedContactsName))
    //     },500)
    // },[])
    const [select,setSelect]=useState(false)
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
                <TouchableWithoutFeedback onPress={()=>{
                    if(!userStore.premium){
                        navigation.navigate('Premium')
                    }else{
                        // setSelect(true)
                        userStore.selectAllDupContacts()


                        // if(userStore.selectedAll){
                        //     userStore.selectAllDupContacts()
                        // }else{
                        //     userStore.selectAllSimilar()
                        //
                        // }
                    }

                    // userStore.similars.find(it=>{
                    //     it.images.find((item,indis)=>{
                    //
                    //         if(it.images[0] != item) userStore.setSelected(item)
                    //     })
                    // })
                }}
                disabled={userStore.mergesLoading}
                >
                    {userStore.mergesLoading ? (
                        <View style={[styles.buttonsLoadingContainer]}>

                            <View style={{position:'absolute',flex:1,alignItems:'center',justifyContent:'center'}}>

                            <Spinner color={'white'} size={'small'}/>
                            </View>
                        </View>
                        ):(
                        <View style={[styles.buttonsContainer,{backgroundColor:userStore.activeTheme.homeBoxBackground}]}>
                            <FastImage source={userStore.mergesSelected ? require('../../../assets/tick_open.png'):require('../../../assets/tick_close.png')} style={{resizeMode:'contain',width:23,height:23}}/>
                            <Text style={{fontFamily:'Roboto-Medium',marginLeft:10,color:userStore.activeTheme.textColor}}>{userStore.mergesSelected ? I18n.t('selectedAll'):I18n.t('selectAll')}</Text>
                        </View>
                        )}

                </TouchableWithoutFeedback>

            </View>
            <View style={styles.headerContainer}>
                <Text style={[styles.homeTitle,{color:userStore.activeTheme.textColor}]}>{I18n.t('duplicatedContact')}</Text>


                <View style={{}}>
                    <Text style={[styles.headerInfoText, {textAlign: 'right',color:userStore.activeTheme.textColor}]}>
                        {I18n.t('similarSelected',{total:userStore.activeMergeListLength})}

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
                {userStore.duplicatedContactsName.length>0 && (

                <FlashList renderItem={renderCustomItem} data={userStore.duplicatedContactsName.slice()} estimatedItemSize={userStore.contacts.length}/>
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
                                <Text style={{fontFamily:'Roboto-Medium',color:'white'}}>Vazgeç</Text>
                            </View>
                        </TouchableWithoutFeedback>


                    </View>
                </View>

            </Modal>
            {userStore.activeMergeLength>0 && (
                <View style={{width:'100%',position:'absolute',justifyContent:'center',alignItems:'center',bottom:50}}>

                        <TouchableOpacity   onPress={()=>{
                            Alert.alert(I18n.t('alert'),I18n.t('noBack'),[
                                    {text: 'Birleştir', onPress: ()=>{
                                            userStore.mergeContacts(navigation)
                                        }, style: 'destructive'},
                                    {text: 'Vazgeç'},
                                ],
                                {cancelable: false})
                            // userStore.mergeContacts(navigation)
                        }} style={{width:'70%',height:60,backgroundColor:'#0011FA',justifyContent:'center',alignItems:'center',borderRadius:33}}>
                            {userStore.deleteLoading ? (
                                <Spinner size={'large'} color={'white'}/>
                            ):(
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <FastImage source={require('../../../assets/mergeIcon.png')} style={{width:20,height:20,marginRight:10}}/>
                                    <Text style={{color:'white',fontFamily:'Roboto-Medium',fontSize:20}}>
                                        {I18n.t('mergeContacts',{total:userStore.activeMergeLength})}
                                    </Text>
                                </View>
                            )}

                        </TouchableOpacity>
                </View>
            )}
        </View>
    )
}
let styles= StyleSheet.create({
    buttonsLoadingContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        borderRadius:20,

        paddingHorizontal: 10,
        paddingVertical:7,
        alignItems:'center',
    },
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
export default observer(DuplicatedContactList)
