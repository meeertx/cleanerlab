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
import userStore from "../store/userStore";
import I18n from '../../lang/index';

const PasswordPopup =({func,sucFunc})=>{
    const [old, setOld] = useState('');
    const [wrong, setWrong] = useState(false);

    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const CELL_COUNT = 4;
    return(
        <View style={{width:'90%',paddingHorizontal:20,paddingVertical:20,backgroundColor:'#F3F5FF',borderRadius:10,}}>
            <View style={styles.headerContainer}>
                <TouchableWithoutFeedback onPress={()=>func()}>
                    <Icon name={'close-outline'}  style={{width:40,height:40}}/>
                </TouchableWithoutFeedback>
                <Text style={styles.headerText}>
                    {userStore.password ? I18n.t('changePassword'):I18n.t('setPassword')}
                </Text>
            </View>

            {userStore.password && (
                <View style={{marginTop:20}}>
                    <Text style={{fontFamily:'Roboto-Medium',fontSize:17,textAlign:'right'}}>{I18n.t('oldPassword')}</Text>

                    <CodeField
                        ref={ref}
                        {...props}
                        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                        value={old}
                        onChangeText={(text)=>{
                            setOld(text)
                            if(wrong) setWrong(false)
                        }}
                        cellCount={CELL_COUNT}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({index, symbol, isFocused}) => (
                            <Text
                                key={index}
                                style={[styles.cell, isFocused && styles.focusCell,{borderColor: wrong ?'red':'#00000030'}]}
                                onLayout={getCellOnLayoutHandler(index)}>
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        )}
                    />
                </View>
            )}


            <View style={{marginTop:20}}>
                <Text style={{fontFamily:'Roboto-Medium',fontSize:17,textAlign:'right'}}>{I18n.t('newPassword')}</Text>

                <CodeField
                    ref={ref}
                    {...props}
                    // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                    value={value}
                    onChangeText={setValue}
                    cellCount={CELL_COUNT}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={({index, symbol, isFocused}) => (
                        <Text
                            key={index}
                            style={[styles.cell, isFocused && styles.focusCell]}
                            onLayout={getCellOnLayoutHandler(index)}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    )}
                />
            </View>
            <View style={{width:'100%',alignItems:'center',marginTop:20}}>
                <TouchableOpacity onPress={()=>{
                    if(userStore.password){
                        if(old==userStore.password){
                            func(false)
                            setTimeout(()=>{

                                sucFunc(true)
                            },500)
                            userStore.setPassword(value)
                        }else{
                            setWrong(true)
                        }
                    }else{
                        userStore.changePwActive(true)
                        func(false)
                        setTimeout(()=>{

                            sucFunc(true)
                        },500)
                        userStore.setPassword(value)
                    }

                }}>
                    <View style={styles.allowButtonContainer}>
                        <Text style={styles.allowButtonText}>{I18n.t('save')}</Text>
                    </View>
                </TouchableOpacity>
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
export default observer(PasswordPopup)
