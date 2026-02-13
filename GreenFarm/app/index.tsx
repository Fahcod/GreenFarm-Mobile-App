import { Redirect } from "expo-router";
import asyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, View } from "react-native";


export default function Index() {
  // WE SHALL REDIRECT THE USER BASING ON ROLE
  const [loading,setLoading] = useState(true);
  const [role,setRole] = useState<string | null>();

  // fetch the user role from the storage
  useEffect(()=>{
    const fetchRole = async () =>{
    setLoading(true);
    const userRole = await asyncStorage.getItem("role");
    if(userRole){
    setRole(userRole);
    setLoading(false)
    }else if (!userRole){
    setLoading(false)
      }
  }
  // call the fetch role function
  fetchRole();

  },[]);

  if(!role && loading){
    return(
      <SafeAreaView className="flex-1 bg-white">
      <View className="w-full h-full flex items-center justify-center">
      <ActivityIndicator size={58} color={'#16a34a'}/>
      </View>
      </SafeAreaView>
    )
  }else if (!loading && role === "farmer"){
     return <Redirect href={'/(farmer)/' as any}/>
  }else if (!loading && role === "business"){
    return <Redirect href={'/(business)/' as any}/>
  }else if (!loading && !role){
    return <Redirect href={'/(auth)/role_selecion'}/>
  }
 
}
