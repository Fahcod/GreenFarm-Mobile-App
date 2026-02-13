import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons'
import { axiosInstance } from '@/API/api';
import * as ImagePicker from "expo-image-picker";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const editStore = () => {
    // store the files
    const [imageFile,setImageFile] = useState<any>();
    const {store_id} = useLocalSearchParams();

    // GET THE STORE FROM THE SELLER'S STORES
    const seller_stores = useSelector((state:RootState)=>state.stores.business_stores);
    const activeStore = seller_stores.find(e=>e._id  === store_id);

    // the function to upload the file to the server
    const uploadProfile = async () =>{
        let formData = new FormData();
        formData.append("image",{
          name:"profile.jpg",
          uri:imageFile,
          type:"image/jpg"
        } as any);
        
        try {
        // upload the image
        let response = await axiosInstance.put(`/api/v1/store/update-profile/${store_id}`,
        formData,{
          headers:{'Content-Type':'multipart/form-data'}});
        if(response.status === 200){
          alert(response.data.message)
        }
          
        } catch (error:any) {
          if(error.response){
            alert(error.response.data.message)
          }else if (error.request){
            alert("Check your connection!")
          }
        }
      }
    
    const pickImage = async () =>{
          //  ask for permission
          await ImagePicker.getMediaLibraryPermissionsAsync();
          let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing:true,
            mediaTypes:"images",
            aspect:[5,5],
            quality:1
          });
    
          if(!result.canceled){
            setImageFile(result.assets[0].uri);
          }
      }

  return (
    <SafeAreaView className='bg-white flex-1'>
    {/* the custom header */}
    <View className='w-full flex flex-row items-center justify-between p-3 bg-white h-[60px] border-solid border-b border-gray-100'>
    <TouchableOpacity onPress={()=>router.back()}>
    <FontAwesome6 name={'arrow-left'} size={22}/>
    </TouchableOpacity>

    {/* the store name */}
    <Text className='font-poppins-bold text-lg'>edit store</Text>
    
    <TouchableOpacity>
    <FontAwesome6 name={'ellipsis-vertical'} size={20}/>
    </TouchableOpacity>
    </View>
    {/* end of the custom header */}

    <ScrollView contentContainerStyle={{width:'100%'}}>
    
    {/* the container for editing the store profile or logo */}
    <View className='w-full mt-7 flex flex-col items-center'>
    <View className='relative w-[120px] h-[120px]'>
    {imageFile?
    <Image className='rounded-full bg-input' style={{width:120,height:120}} source={{uri:imageFile}}/>
    :<Image className='rounded-full bg-input' style={{width:120,height:120}} source={{uri:activeStore?.store_profile}}/>
    }
    {/* the edit button */}
    {imageFile?<TouchableOpacity onPress={()=>uploadProfile()} 
    className='w-8 flex items-center justify-center right-0 bottom-4 h-8 absolute bg-primary-300 rounded-full'>
    <FontAwesome6 color={'#fff'} size={17} name={'upload'}/>
    </TouchableOpacity>:
    <TouchableOpacity onPress={()=>pickImage()} 
    className='w-8 flex items-center justify-center right-0 bottom-4 h-8 absolute bg-primary-300 rounded-full'>
    <FontAwesome6 color={'#fff'} size={17} name={'camera'}/>
    </TouchableOpacity>
    }
    </View>
    </View>

    </ScrollView>
    </SafeAreaView>
  )
}

export default editStore;