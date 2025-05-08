import React from 'react'
import {Text, View,StyleSheet,Image,ScrollView} from "react-native";
import userStore from "../../store/userStore";
import {observer} from "mobx-react";
import {TouchableOpacity} from "react-native-gesture-handler";
import {Icon} from "native-base";
import I18n from '../../../lang/index';

const AllowScreen = ()=>{
    return(
        <View style={{flex:1,backgroundColor:'white',paddingBottom:120}}>
            <View style={styles.headerContainer}>
                <TouchableOpacity>
                    <Icon name={'chevron-back-outline'}/>
                </TouchableOpacity>
                <Text style={styles.homeTitle}>CleanerLab</Text>

            </View>
            <View style={styles.notAllowContainer}>

                <Image source={require('../../../assets/robot.png')} style={styles.robot} resizeMode={'contain'}/>
                <Text style={styles.allowTitle}>Fotoğrafların taranabilmesi için erişim izini gerekiyor.</Text>
                <Text style={styles.allowDesc}>Clear ile temizliğe başlayabilmen için
                    bütün fotoğraflara erişim vermen gerekiyor.</Text>

                <TouchableOpacity>
                    <View style={styles.allowButtonContainer}>
                        <Text style={styles.allowButtonText}>İzin Ver</Text>
                    </View>
                </TouchableOpacity>
            </View>


        </View>
    )
}
const styles=StyleSheet.create({
    footerMenuText:{
        fontSize:13,
        marginTop:5
    },
    footerMenuContainer:{
        width:'18%',
        alignItems:'center',

    },
    footerContainer:{
        width:'100%',
        height:120,
        backgroundColor:'#F2F5FF',
        position:'absolute',
        bottom:0,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:30,
        paddingTop:20,
        borderRadius:20
    },
    footerMenuItem:{
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        paddingHorizontal:10,
        paddingVertical:15

    },
    footerMenuIcon:{
        width:22,
        height:22,
        resizeMode:'contain'
    },
    menuRightText:{
        color:'white'
    },
    menuRightIcon:{
        width:10,
        height:10,marginLeft:10
    },
    menuRightContainer:{
        backgroundColor:'#2007FF',
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
        backgroundColor:'#F2F5FF',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginHorizontal:20,
        paddingHorizontal:20,
        paddingVertical:10,
        borderRadius:20,
        marginVertical:10

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
        width:100,
        height:100,
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
    headerContainer:{
        marginVertical:50,
        marginHorizontal:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    homeTitle:{
        fontWeight:'normal',
        fontSize:30,
    },
    headerButtonImage:{
        width:30,
        height:30
    },
    headerBottomContainer:{
        marginHorizontal:20,
        flexDirection:'row',
        alignItems:'center',
        marginVertical:-20,
        justifyContent:'space-between'
    },
    proContainer:{
        flexDirection:'row',
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:20,
        alignItems:'center',

        backgroundColor:'#2007FF',
        justifyContent:'space-between',
        width:80
    },
    proIcon:{
        width:20,
        height:20
    },
    proText:{
        color:'white',
    }

})
export default observer(AllowScreen)
