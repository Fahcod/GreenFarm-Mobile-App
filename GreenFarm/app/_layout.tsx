import { Stack } from "expo-router";
import "../global.css";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { StatusBar } from "react-native";

export default function RootLayout() {

  return (
  <Provider store={store}>
  <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'}/>
  <Stack screenOptions={{headerShown:false}}/>
  </Provider>
);
}
