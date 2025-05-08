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

const Clue = ({navigation,route})=>{
    const width = Dimensions.get('window').width;
    let arr = [


    ]
    return(
        <View style={[styles.container,{backgroundColor:userStore.activeTheme.background}]}>
            <View style={[styles.headerContainer]}>
                <View style={{position:'absolute',width:'100%',}}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <FastImage style={{width:10,height:15,marginLeft:10}} source={userStore.isDarkTheme ? require('../../../assets/leftbackwhite.png'):require('../../../assets/leftback.png')} resizeMode={'contain'}/>
                    </TouchableOpacity>
                </View>
                <Text style={[styles.homeTitle,{color:userStore.activeTheme.textColor}]}>{I18n.t('clues')}</Text>

            </View>

            <Carousel
                style={{marginTop:-20}}
                loop
                width={width}
                height={'70%'}
                autoPlay={true}
                data={[...new Array(5).keys()]}
                scrollAnimationDuration={2500}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index }) => {
                    if(index==0)
                        return(
                            <View style={[styles.container, {backgroundColor: userStore.activeTheme.background}]}>

                                <Text style={[styles.title,{color:userStore.activeTheme.textColor}]}>{I18n.t('similarPhotos')}</Text>
                                <Text style={[styles.desc,{color:userStore.activeTheme.textColor}]}>{I18n.t('similarPhotosDesc')} </Text>
                                <FastImage source={require('../../../assets/similarpage_image.png')} resizeMode={'contain'} style={styles.image} />
                            </View>
                        )
                    else if(index==1)
                        return(
                            <View style={[styles.container, {backgroundColor: userStore.activeTheme.background}]}>

                                <Text style={[styles.title,{color:userStore.activeTheme.textColor}]}>{I18n.t('samePhotos')}</Text>
                                <Text style={[styles.desc,{color:userStore.activeTheme.textColor}]}>{I18n.t('samePhotosDesc')}</Text>
                                <FastImage source={require('../../../assets/recurring_image.png')} resizeMode={'contain'} style={styles.image} />
                            </View>
                        )
                    else if(index==2)
                        return(
                            <View style={[styles.container, {backgroundColor: userStore.activeTheme.background}]}>

                                <Text style={[styles.title,{color:userStore.activeTheme.textColor}]}>{I18n.t('videos')}</Text>
                                <Text style={[styles.desc,{color:userStore.activeTheme.textColor}]}>{I18n.t('videosDesc')}</Text>
                                <FastImage source={require('../../../assets/videos_image.png')} resizeMode={'contain'} style={styles.image} />
                            </View>
                        )
                    else if(index==3)
                        return(
                            <View style={[styles.container, {backgroundColor: userStore.activeTheme.background}]}>

                                <Text style={[styles.title,{color:userStore.activeTheme.textColor}]}>{I18n.t('screenshots')}</Text>
                                <Text style={[styles.desc,{color:userStore.activeTheme.textColor}]}>{I18n.t('screenshotDesc')}</Text>
                                <FastImage source={require('../../../assets/screenshots_image.png')} resizeMode={'contain'} style={styles.image} />

                            </View>
                        )
                    else if(index==4)
                        return(
                            <View style={[styles.container, {backgroundColor: userStore.activeTheme.background}]}>

                                <Text style={[styles.title,{color:userStore.activeTheme.textColor}]}>{I18n.t('others')}</Text>
                                <Text style={[styles.desc,{color:userStore.activeTheme.textColor}]}>{I18n.t('otherDesc')}</Text>
                                <FastImage source={require('../../../assets/others_icon.png')} resizeMode={'contain'} style={styles.image} />

                            </View>
                        )
                }}
            />

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
export default observer(Clue)
