import React, {useState,useEffect}  from 'react'
import {StyleSheet, View, Text, TouchableWithoutFeedback, ScrollView, FlatList,} from "react-native";
import Accordion from 'react-native-collapsible/Accordion';
import {observer} from "mobx-react";
import userStore from "../../store/userStore";
import FastImage from "react-native-fast-image";
import I18n from '../../../lang/index';

const Support = ({navigation,route})=>{
    const [activeSections,setActiveSections] = useState([99])
    const SECTIONS = I18n.t('emailSection')
    let anotherTitle = I18n.t('anotherTitle',{deviceId:userStore.deviceId})
    let anotherContent = I18n.t('anotherContent',{deviceId:userStore.deviceId})

    SECTIONS.push({title:anotherTitle,content:anotherContent})
    let renderSectionTitle = (section) => {
        return (
            <View style={styles.content}>
                <Text>{section.content}</Text>
            </View>
        );
    };

    let renderHeader = (section,index) => {
        return (

            <View style={[styles.header,{backgroundColor:userStore.activeTheme.homeBoxBackground,borderTopStartRadius:20,borderTopEndRadius:20,borderBottomStartRadius:activeSections == index ?0:20,borderBottomEndRadius:activeSections == index ?0:20,}]}>
                <Text style={[styles.headerText,{color:userStore.activeTheme.textColor}]}>{section.title}</Text>
                <View style={{width: 40,height:40,borderRadius: 50,justifyContent:'center',alignItems:'center',backgroundColor:'#0011FA'}}>
                   {activeSections == index ? (
                       <Text style={{fontFamily: 'Roboto-Bold', fontSize: 27,color:'white'}}>-</Text>
                       ):(
                       <Text style={{fontFamily: 'Roboto-Bold', fontSize: 27,color:'white'}}>+</Text>

                       )}
                </View>
            </View>
        );
    };

    let renderContent = (section,index) => {
        return (
            <View style={[styles.content,{backgroundColor: userStore.activeTheme.homeBoxBackground,borderBottomStartRadius:20,borderBottomEndRadius:20,borderTopStartRadius:activeSections == index ?0:20,borderTopEndRadius:activeSections == index ?0:20,}]}>
                <Text style={[styles.contentText,{color: userStore.activeTheme.textColor}]}>{section.content}</Text>

            </View>
        );
    };

    let updateSections = (activeSection) => {
        setActiveSections(activeSection)
        if(activeSection == '')
        setActiveSections([9999])



    };
    return(
        <View style={[styles.container,{backgroundColor: userStore.activeTheme.background}]}>
            <View style={{width:'85%',marginTop:30}}>
                <TouchableWithoutFeedback onPress={()=>{
                    navigation.goBack()
                }}>

            <FastImage source={require('../../../assets/closex.png')} style={{width:20,height:20,marginVertical:20}} />
                </TouchableWithoutFeedback>
                <Text style={{fontFamily:'Roboto-Bold',fontSize:30,color:userStore.activeTheme.textColor}}>
                    {I18n.t('emailSupport')}
                </Text>
            </View>

            <View style={{width: '100%',height:'80%'}}>
                <FlatList data={['a']} renderItem={(item)=>{
                    return(
                        <Accordion
                            style={{width: '90%'}}
                            sections={SECTIONS}
                            touchableComponent={TouchableWithoutFeedback}
                            activeSections={activeSections}
                            renderHeader={renderHeader}
                            renderContent={renderContent}
                            onChange={updateSections}

                        />
                    )
                }}/>

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
export default observer(Support)
