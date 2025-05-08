import React, {useState,useEffect,useRef} from 'react'
import {
    View,
    StyleSheet,
    Image,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Text,Animated,
    ImageBackground,Alert,
    ScrollView,
    TouchableOpacity, FlatList, ImageBackgroundComponent, TouchableOpacityComponent, Dimensions
} from "react-native";
import {observer} from "mobx-react";
import FastImage from "react-native-fast-image";
import {Icon} from "native-base";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import GifImage from "@lowkey/react-native-gif/src/index";
import I18n from '../../lang/index';

const SuccessPopup =({func,text})=>{
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const CELL_COUNT = 4;
    return(
        <View style={{width:'80%',paddingHorizontal:20,paddingVertical:20,backgroundColor:'#D7E3FF',borderRadius:10,}}>
            <View style={{alignItems:'center',width:'100%',marginTop:-75}}>

            <GifImage source={require('../../assets/robo2.gif')} style={{width:150,height:150}}  />
                <Text style={{fontFamily:'Roboto-Medium',fontSize:15}}>{text}</Text>
            </View>


        </View>
    )
}
const styles = StyleSheet.create({
    allowButtonContainer:{
        backgroundColor: '#2007FF',
        paddingHorizontal:20,
        paddingVertical:10,
        borderRadius:10,
        marginVertical:10,
        width:'60%',

    },
    allowButtonText:{
        color:'white',
        textAlign:'center'
    },
    codeFieldRoot: {marginTop: 20},
    cell: {
        width: 50,
        height: 50,
        lineHeight: 43,
        borderRadius:20,
        fontSize: 30,
        borderWidth: 2,
        borderColor: '#00000030',
        textAlign: 'center',
    },
    focusCell: {
        borderColor: '#000',
    },
    headerText:{
        fontFamily:'Roboto-Medium',
        fontSize:20,

    },
    container:{

    },
    headerContainer:{
        flexDirection:'row',
        justifyContent:'space-between',

        alignItems:'center'

    }
})
export default observer(SuccessPopup)
