import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { CATEGORIES_LIST } from '@/constants/categories';
import { axiosInstance } from '@/API/api';
import { icons } from '@/constants/icons';

const create_store = () => {

  const [storeContacts,setStoreContacts] = useState<string[]>([]);
  const [dealingIn,setDealingIn] = useState<string[]>([]);
  const [modelOneVisible,setModelOneVisible] = useState(false);
  const [modelTwoVisible,setModelTwoVisible] = useState(false);
  const [contact,setContact] = useState("")

  const [storeLocation,setStoreLocation] = useState({
    country:"Uganda",
    city:"Kampala",
    region:"Makindye"
  });
  const [storeData,setStoreData] = useState({
     name:"",
     description:""
  });

  // send the store data
  const sendData = async () =>{
    let data = {
      name:storeData.name,
      description:storeData.description,
      location:storeLocation,
      dealing_in:dealingIn,
      store_contacts:storeContacts
    };

    try {
      let response = await axiosInstance.post('/api/v1/store/create',data);
      if(response.status === 201){
      alert(response.data.message);
      
    }
    } catch (error:any) {
      if(error.response){
      alert(error.response.data.message);
    }else if (error.request){
      alert("Check your connection")
    }
    }
  }

  return (
    <SafeAreaView className='bg-white flex-1'>
    {/* the custom header */}
    <View className='w-full flex flex-row items-center justify-start p-3 z-[1000] h-[50px] bg-white'>
    <TouchableOpacity onPress={()=>router.back()}>
    <FontAwesome6 size={22} name={'arrow-left'}/>
    </TouchableOpacity>
    </View>
    {/* end of the header, the create store form */}
    <ScrollView 
    contentContainerStyle={{
      paddingHorizontal:10,
      paddingVertical:25,
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      flex:1
    }}
    showsVerticalScrollIndicator={false}>
    {/* the page contents come next */}

   <View className='w-full flex flex-col items-center'>
   <View>
   <Image style={{width:140,height:140}} source={icons.store_icon}/>
   </View>

   {/* the fields for adding the store name and description */}

   
   {/* TODO: Add the fields for store name and description here */}

   </View>
    
    </ScrollView>
    </SafeAreaView>
    )
    }

    export default create_store