import { Stack, SplashScreen } from "expo-router";
import "../global.css";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { StatusBar } from "react-native";
import {useFonts} from "expo-font";

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    "Poppins":require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Light":require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Semibold":require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium":require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Bold":require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Extrabold":require("../assets/fonts/Poppins-ExtraBold.ttf")
  });

 // hide the splash screen when the fonts finish loading
 if(fontsLoaded){
  SplashScreen.hideAsync()
 }

  return (
  <Provider store={store}>
  <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'}/>
  <Stack screenOptions={{headerShown:false}}/>
  </Provider>
);
}
