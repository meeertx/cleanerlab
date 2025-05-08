import {Navigation} from "react-native-navigation";


Navigation.events().registerAppLaunchedListener(() => {
    // Each time the event is received you should call Navigation.setRoot
});
