import { View, Text, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { icons } from '@/constants/icons';
import { useDispatch } from 'react-redux';
import HorizontalRule from '@/components/HorizontalRule';
import { setNameAndDesc } from '@/slices/formSlice';

const create_store = () => {

  const dispatch = useDispatch();
  const [storeData,setStoreData] = useState({
    name:"",
    description:""
  });

  // the function to save the data and continue to next page
  function saveData(values:{name:string,description:string}){
      if(!storeData.name || !storeData.description){return}
      dispatch(setNameAndDesc(values));
      router.push('/(screens)/store/create/store_categories')
  }
  
  return (
    <SafeAreaView className='bg-white flex-1'>
    {/* the custom header */}
    <View className='w-full flex flex-row items-center justify-start p-3 z-[1000] h-[45px] bg-white'>
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
    }}
    showsVerticalScrollIndicator={false}>
    {/* the page contents come next */}

   <View className='w-full flex flex-col items-center'>
   <View className='flex-col items-center'>
   <Image style={{width:120,height:120}} source={icons.store_icon}/>
   <Text className='font-poppins-bold text-xl text-[#454545]'>Create your store</Text>
   </View>
   <HorizontalRule mt={10}/>
   {/* the fields for adding the store name and description */}
   
     <View className='w-full mt-4 flex flex-col items-center gap-6'>
   <View className='w-[95%]'>
   <Text className='font-poppins-semibold text-[#454545]'>Store name</Text>
   <TextInput
    placeholder='Your store name'
    value={storeData.name}
    keyboardType='default'
    onChangeText={(text)=>setStoreData({...storeData,["name"]:text})}
    className='w-full font-poppins bg-white mt-3 py-2 border-solid border border-gray-200 px-3 rounded-md'
    />
   </View>

   <View className='w-[95%]'>
   <Text className='font-poppins-semibold text-[#454545]'>Store description</Text>
   <TextInput
   placeholder='Tell us about your store?'
   className='w-full h-[230px] bg-white font-poppins p-3 border-solid border border-gray-200 rounded-md'
   style={{textAlignVertical:'top'}}
   value={storeData.description}
   keyboardType='default'
   onChangeText={(text)=>setStoreData({...storeData,["description"]:text})}
   multiline={true}
   />
   </View>
   {/* the next button */}
   <View className='w-[95%]'>
   <TouchableOpacity
   onPress={()=>{saveData(storeData)}}
   className='px-3 py-2 rounded-md bg-primary-300 gap-3'>
   <Text className='font-poppins text-white text-center'>Next</Text>
   </TouchableOpacity>
   </View>
   </View>

   </View>
   </ScrollView>
   </SafeAreaView>
    )
    }

    export default create_store;