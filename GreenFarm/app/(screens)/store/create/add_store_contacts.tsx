import { View, Text, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather, FontAwesome6 } from '@expo/vector-icons'
import { router } from 'expo-router'
import HorizontalRule from '@/components/HorizontalRule'
import { icons } from '@/constants/icons';
import { useDispatch } from 'react-redux';
import { setStoreContactsArray } from '@/slices/formSlice';

const add_store_contacts = () => {

    const [storeContacts,setStoreContacts] = useState<string[]>([]);
    const [contact,setContact] = useState("");
    const dispatch = useDispatch();

    // the function to save the data in the global state
    function saveData(){
        if(storeContacts.length === 0) return;
        dispatch(setStoreContactsArray(storeContacts));
        router.push('/(screens)/store/create/add_subscription_plan')
    }

  return (
    <SafeAreaView className='bg-white flex-1'>
    {/* the custom header */}
    <View className='w-full flex flex-row items-center justify-start p-3 z-[1000] h-[45px] bg-white'>
    <TouchableOpacity onPress={()=>router.back()}>
    <FontAwesome6 size={22} name={'arrow-left'}/>
    </TouchableOpacity>
    </View>
    {/* end of the custom header */}
    <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal:10,
          paddingVertical:25,
          display:'flex',
          alignItems:'center'}}>
    {/* the page contents come next */}
    <View className='w-full flex flex-col items-center'>
    <View className='flex-col items-center'>
    <Image style={{width:100,height:100}} source={icons.store_contacts}/>
    <Text className='font-poppins-bold text-xl text-[#454545] mt-5'>Add store contacts</Text>
    </View>
    <HorizontalRule mt={10}/>
    {/* the form to add the contacts */}
    <View className='w-full flex flex-col'>
    {/* the add contact fields */}
    <View className='w-full flex flex-row gap-2 mt-5'>
    <TextInput
    placeholder='Add contact'
    value={contact}
    onChangeText={(text)=>setContact(text)}
    className='flex-1 bg-white px-3 rounded-md border-solid border border-gray-200'
    />
    <TouchableOpacity 
    onPress={()=>{
      setStoreContacts([...storeContacts,contact]);
      setContact("")
    }}
    className='px-4 flex flex-row items-center rounded-md bg-primary-300'>
    <Text className='font-poppins text-white'>Add</Text>
    </TouchableOpacity>
    </View>
    {/* the container for the added contacts */}
    <View className='w-full mt-6 flex flex-col gap-3'>
    {storeContacts.map((item,index)=>{
        return(
        <View key={index} className='flex bg-input p-2 rounded-md flex-row items-center justify-between'>
        <View className='flex flex-row items-center gap-3'>
        <FontAwesome6 name={"phone"} size={16}/>
        <Text className='font-poppins'>{item}</Text>
        </View>
        <TouchableOpacity>
        <Feather name={'trash'} color={'#ef4444'} size={18}/>
        </TouchableOpacity>
        </View>
        )
    })}
    </View>

   {/* the next button */}
   <View className='w-full mt-24'>
   <TouchableOpacity
   onPress={()=>{saveData()}}
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

export default add_store_contacts;