import { Redirect } from "expo-router";
import asyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";


export default function Index() {

  // const [role,setRole] = useState<string | null>("farmer");

  // // fetch the user role from storage
  // const fetchUserRole = async () =>{
  //    const user_role = await asyncStorage.getItem("role");
  //    if (user_role) setRole(user_role)
  // }
  
  // useEffect(()=>{
  //   fetchUserRole();
  // },[])

  const role = "farmer";

  if ( role === "farmer") {
    return <Redirect href={"/(farmer)/" as any} />;
  } else if (role === "business") {
    return <Redirect href={"/(business)/" as any} />;
  }else{
    return <Redirect href={"/(auth)/role_selecion"}/>
  }
}
