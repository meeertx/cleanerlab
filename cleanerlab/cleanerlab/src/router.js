import React, {useState} from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer, DarkTheme, DefaultTheme, useTheme} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { horizontalAnimation, verticalAnimation } from './utils';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {PulseAnimation} from 'react-native-animated-pulse';

import 'react-native-gesture-handler';
import {observer,Provider} from "mobx-react";
import {usePowerState} from 'react-native-device-info'
import userStore from "./store/userStore";
//Screens

const light = {
    colors: {
        primary: 'red',
        background: 'rgb(242, 242, 242)',
        card: 'rgb(255, 255, 255)',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(216, 216, 216)',
        notification: 'rgb(255, 59, 48)',
    },
};

const dark = {
    colors: {
        primary: 'green',
        background: '#0076FF',
        card: 'rgb(255, 255, 255)',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(216, 216, 216)',
        notification: 'rgb(255, 59, 48)',
    },
};



import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import Settings from "./screens/Settings";
import Divider from "./screens/Media/Divider";
import Similar from "./screens/Media/Similar";
import Videos from "./screens/Media/Video";
import ScreenShot from "./screens/Media/Screenshot";
import Duplicated from "./screens/Media/Duplicated";
import Other from "./screens/Media/Other";
import OtherSwipe from "./screens/Media/OtherSwipe";
import Secret from "./screens/Secret";
import Detail from "./screens/Media/Detail";
import Contacts from "./screens/Contacts";
import FAQ from "./screens/Settings/faq";
import Flash from "./screens/Premium/flash";
import VideoPlayer from "./screens/VideoPlayer";
import Player from "./screens/Media/Player";
import Charging from "./screens/Charging";
import ContactList from "./screens/Contacts/contactList";
import FlashCongrats from "./components/flashCongrats";
import BerlinPremium from "./screens/Premium/berlin";
import ParisPremium from "./screens/Premium/paris";
import LondonPremium from "./screens/Premium/london";
import IstanbulPremium from "./screens/Premium/istanbul";

import Info from "./components/info";
import WhiteList from "./screens/Settings/whiteList";
import WhiteListDetail from "./screens/Settings/WhiteListDetail";
import Loading from "./components/loading";
import DuplicatedContactList from "./screens/Contacts/duplicatedList";
import DupDetail from "./screens/Contacts/dupDetail";
import PremiumCongrats from "./components/premiumCongrats";
import ChargingBegin from "./screens/Charging/begin";
import ChargingIntro from "./screens/Charging/chargerIntro";
import ChargingDetail from "./screens/Charging/ChargerDetail";
import CleanFast from "./screens/CleanFast";
import Clue from "./screens/Settings/Clue";
import Page from "./screens/Settings/Page";
import Support from "./screens/Settings/support";
import charging from "./screens/Charging";
import AnkaraPremium from "./screens/Premium/ankara";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();


const premium = ({navigation,route})=>{
    // alert(route.params.page)
    return(
        <Stack.Navigator>

            {userStore.premiumScreen == 'paris' ? (
                <Stack.Screen name="ParisPremium" component={ParisPremium} options={verticalAnimation}  />

            ):userStore.premiumScreen == 'london' ? (
                <Stack.Screen name="LondonPremium" component={LondonPremium} options={verticalAnimation}  />

                ):userStore.premiumScreen == 'tokyo' ? (
                <Stack.Screen name="Premium" component={Flash} options={verticalAnimation}  />

                ):userStore.premiumScreen=='istanbul' ? (
                <Stack.Screen name="IstanbulPremium" component={IstanbulPremium} options={verticalAnimation}  />

            ):userStore.premiumScreen=='ankara' ? (
                <Stack.Screen name="AnkaraPremium" component={AnkaraPremium} options={verticalAnimation}  />

            ):(
                <Stack.Screen name="BerlinPremium" component={BerlinPremium} options={verticalAnimation}  />

            )}


        </Stack.Navigator>
    )
}
const home = ()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{headerShown:false}}  />

            <Stack.Screen name="Premium" component={premium} options={verticalAnimation}  />


            <Stack.Screen name="Settings" component={Settings} options={{headerShown:false}}  />
            <Stack.Screen name="Clue" component={Clue} options={{headerShown:false}}  />

            <Stack.Screen name="WhiteList" component={WhiteList} options={{headerShown:false}}  />
            <Stack.Screen name="WhiteListDetail" component={WhiteListDetail} options={{headerShown:false}}  />

            <Stack.Screen name="Info" component={Info} options={{headerShown:false}}  />
            <Stack.Screen name="Divider" component={Divider} options={verticalAnimation}  />
            <Stack.Screen name="Similar" component={Similar} options={{headerShown:false}}  />
            <Stack.Screen name="Video" component={Videos} options={{headerShown:false}}  />
            <Stack.Screen name="Player" component={Player} options={{headerShown:false}}  />

            <Stack.Screen name="VideoPlayer" component={VideoPlayer} options={{headerShown:false}}  />

            <Stack.Screen name="ScreenShot" component={ScreenShot} options={{headerShown:false}}  />
            <Stack.Screen name="Duplicated" component={Duplicated} options={{headerShown:false}}  />
            <Stack.Screen name="Other" component={Other} options={{headerShown:false}}  />
            <Stack.Screen name="OtherSwipe" component={OtherSwipe} options={{headerShown:false}}  />
            <Stack.Screen name="Secret" component={Secret} options={{headerShown:false}}  />
            <Stack.Screen name="CleanFast" component={CleanFast} options={{headerShown:false}}  />


            <Stack.Screen name="Detail" component={Detail} options={{headerShown:false}}  />
            <Stack.Screen name="FAQ" component={FAQ} options={{headerShown:false}}  />
            <Stack.Screen name="Support" component={Support} options={{headerShown:false}}  />

            <Stack.Screen name="Contacts" component={Contacts} options={{headerShown:false}}  />
            <Stack.Screen name="ContactList" component={ContactList} options={{headerShown:false}}  />
            <Stack.Screen name="DuplicatedContactList" component={DuplicatedContactList} options={{headerShown:false}}  />
            <Stack.Screen name="DupDetail" component={DupDetail} options={{headerShown:false}}  />
            <Stack.Screen name="ChargingBegin" component={ChargingBegin} options={{headerShown:false}}  />
            <Stack.Screen name="ChargingIntro" component={ChargingIntro} options={verticalAnimation}  />
            <Stack.Screen name="ChargingDetail" component={ChargingDetail} options={verticalAnimation}  />


            <Stack.Screen name="PremiumCongrats" component={PremiumCongrats} options={verticalAnimation}  />

            <Stack.Screen name="FlashCongrats" component={FlashCongrats} options={verticalAnimation}  />


        </Stack.Navigator>
    )
}



const loading = ()=>{
    return(
        <Stack.Navigator>

            <Stack.Screen name="Loading" component={Loading} options={{headerShown:false}}  />

        </Stack.Navigator>
    )
}

const isLoad=()=>{
    return(
        <Provider>
        <Stack.Navigator>
            {userStore.loading == true ?             <Stack.Screen name="Loading" component={Loading} options={{headerShown:false}}  />
                :            <Stack.Screen name="Home" component={home} options={{headerShown:false}}  />
            }
        </Stack.Navigator>
        </Provider>
    )
}

const main = ()=>{
    const {colors} = useTheme()
    userStore.setColors(colors)
    return (

                <NavigationContainer theme={userStore.isDarkTheme ? dark : light}>

                    <Stack.Navigator screenListeners={{
                        state: (e) => {
                            // Do something with the state
                            userStore.setImageLoaded()
                            setTimeout(()=>{
                                userStore.setImageLoaded()

                            },2500)
                        },
                    }}
                    >

                        {usePowerState().batteryState == 'charging' && userStore.premium &&  userStore.chargeAnimation != null ?             <Stack.Screen name="Charging" component={Charging} options={verticalAnimation}  />
                            :            <Stack.Screen name="Home" component={home} options={verticalAnimation}  />
                        }

                    </Stack.Navigator>
                </NavigationContainer>



    )
}







export default observer(main)




