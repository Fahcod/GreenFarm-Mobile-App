import { View, Text, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { icons } from '@/constants/icons';
import { useDispatch } from 'react-redux';

const create_store = () => {

  const dispatch = useDispatch();
  const [storeData,setStoreData] = useState({
     name:"",
     description:""
  });

  // const sendData = async () =>{
  //   let data = {
  //     name:storeData.name,
  //     description:storeData.description,
  //     location:storeLocation,
  //     dealing_in:dealingIn,
  //     store_contacts:storeContacts
  //   };

  //   try {
  //     let response = await axiosInstance.post('/api/v1/store/create',data);
  //     if(response.status === 201){
  //     alert(response.data.message);
      
  //   }
  //   } catch (error:any) {
  //     if(error.response){
  //     alert(error.response.data.message);
  //   }else if (error.request){
  //     alert("Check your connection")
  //   }
  //   }
  // }

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
   <View className='flex-col items-center'>
   <Image style={{width:120,height:120}} source={icons.store_icon}/>
   <Text className='font-poppins text-[#454545]'>Add the store name and description</Text>
   </View>
   {/* the fields for adding the store name and description */}
   <View className='w-full flex flex-col gap-6'>
   <TextInput
   placeholder='Your store name'
   value={storeData.name}
   className='w-full font-poppins mt-3 py-2 border-solid border border-gray-200 px-3 rounded-md'
   />

   <TextInput
   placeholder='Tell us about your store?'
   className='w-full h-[180px] font-poppins p-3 border-solid border border-gray-200 rounded-md'
   style={{textAlignVertical:'top'}}
   value={storeData.description}
   multiline={true}
   />
   {/* last container */}
   <View className='w-full flex flex-row items-center justify-end'>
   <TouchableOpacity
   onPress={()=>{router.push('/(screens)/store/create/store_categories')}}
   className='flex px-3 py-1 rounded-md bg-primary-300 flex-row items-center gap-3'>
   <Text className='font-poppins text-white'>Next</Text>
   <FontAwesome6 size={18} color={'#fff'} name={"arrow-right"}/>
   </TouchableOpacity>
   </View>
   </View>

   </View>
   </ScrollView>
   </SafeAreaView>
    )
    }

    export default create_store;