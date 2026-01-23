import { View, Text, TouchableOpacity, ScrollView, TextInput, Modal, Pressable } from 'react-native';
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { CATEGORIES_LIST } from '@/constants/categories';

const create_store = () => {

  const [storeContacts,setStoreContacts] = useState<string[]>([]);
  const [dealingIn,setDealingIn] = useState<string[]>([]);
  const [modelOneVisible,setModelOneVisible] = useState(false);
  const [modelTwoVisible,setModelTwoVisible] = useState(true);

  const [storeLocation,setStoreLocation] = useState({
    country:"",
    city:"",
    region:""
  })
  const [storeData,setStoreData] = useState({
     name:"",
     description:""
  });

  return (
    <SafeAreaView className='bg-white flex-1'>
    {/* the custom header */}
    <View className='w-full flex flex-row items-center justify-between p-3 z-[1000] h-[60px] bg-white border-solid border-b border-gray-100'>
    <TouchableOpacity onPress={()=>router.back()}>
    <FontAwesome6 size={22} name={'arrow-left'}/>
    </TouchableOpacity>

    <Text className='font-bold text-lg'>Create a store</Text>

    <View></View>
    </View>
    {/* end of the header, the create store form */}
    <ScrollView 
    contentContainerStyle={{paddingHorizontal:10,paddingVertical:25}}
    showsVerticalScrollIndicator={false}>
    {/* the create store form */}
    <View className='w-full bg-white shadow-md flex flex-col rounded-md p-3 gap-6'>

    <View>
    <Text className='text-[#454545]'>Store name:</Text>
    <TextInput
    placeholder='enter store name...'
    className='w-full mt-1 h-[40px] text-sm px-3 bg-[#f7f6f6] rounded-md'/>
    </View>

    <View>
    <Text className='text-[#454545]'>What do you sell?</Text>
    <TouchableOpacity className='w-full flex flex-row items-center mt-1 h-[40px] text-sm px-3 bg-[#f7f6f6] rounded-md'>
    <Text className='text-[#454545] text-sm'>Tap to select</Text>
    </TouchableOpacity>
    </View>

    <View>
    <Text className='text-[#454545]'>Add store location</Text>
    <TouchableOpacity className='w-full flex flex-row items-center mt-1 h-[40px] text-sm px-3 bg-[#f7f6f6] rounded-md'>
    <View className='flex flex-row items-center gap-2'>
    <FontAwesome6 size={16} color={'#454545'} name={'location-dot'}/>
    <Text className='text-[#454545] text-sm'>Tap to add store location</Text>
    </View>
    </TouchableOpacity>
    </View>

    <View>
    <Text className='text-[#454545]'>Store description:</Text>
    <TextInput
    className='w-full mt-2 h-[90px] p-3 text-sm rounded-md bg-[#f7f6f6]'
    placeholder='type store description...'
    numberOfLines={15}
    multiline={true}
    style={{textAlignVertical:'top'}}/>
    </View>

    {/* adding the store contacts */}
    <View className='w-full'>
    <View className='w-full flex flex-row items-center justify-between'>
    <Text className='text-[#454545]'>Add store contacts</Text>
    <TouchableOpacity className='flex flex-row items-center gap-2'>
    <FontAwesome6 color={'#3b82f6'} size={18} name={'plus'}/>
    <Text className='text-blue-500'>Add contact</Text>
    </TouchableOpacity>
    </View>
     {/* the store contacts */}
    <View className='flex flex-col gap-2'>

    </View>
    </View>

    <View>
    <TouchableOpacity className='h-[45px] flex justify-center flex-row items-center rounded-md w-full bg-primary-300'>
    <Text className='text-white text-sm'>Create store</Text>
    </TouchableOpacity>
    </View>

    </View>

    </ScrollView>

    {/* the modal for selecting store categories */}
    <Modal
    visible={modelOneVisible}
    transparent={true}
    onRequestClose={()=>setModelOneVisible(false)}
    >
    <View className='w-full relative h-full bg-[#0000002c]'>
    
    {/* the category container */}
    <Pressable onPressOut={()=>setModelOneVisible(false)} className='w-full p-4 rounded-tr-3xl rounded-tl-3xl absolute bottom-0 bg-white h-[260px]'>
    <Text className='font-semibold'>Select product categories</Text>
    {/* the container for the categories */}
    <View className='w-full flex flex-row gap-3 mt-5 flex-wrap'>
    {CATEGORIES_LIST.map((item,index)=>{
      return (
        <TouchableOpacity className='bg-[#efefef] rounded-md px-2 py-2' key={index}>
        <Text>{item}</Text>
        </TouchableOpacity>
      )
    })}
    </View>
    </Pressable>
    </View>
    </Modal>

    {/* the modal for adding  store contacts*/}
    <Modal
    visible={modelTwoVisible}
    onRequestClose={()=>setModelTwoVisible(false)}
    transparent={true}>
    <View className='w-full flex px-4 flex-col items-center justify-center h-full bg-[#0000002c]'>
    
    {/* the add contact form */}
    <Pressable onPressOut={()=>setModelTwoVisible(false)} className='w-full bg-white p-4 h-[110px] rounded-md'>
    <Text className='font-semibold'>Add contact</Text>
    {/* the form */}
    <View className='w-full mt-3 items-center flex flex-row gap-2'>
    <TextInput
    placeholder='Phone number'
    className='h-[45px] rounded-md flex-1 bg-[#f7f7f7] px-3'
    />
    <TouchableOpacity className='bg-primary-300 px-3 flex flex-col items-center justify-center rounded-md h-[45px]'>
    <Text className='text-white'>Add</Text>
    </TouchableOpacity>
    </View>
    </Pressable>

    </View>
    </Modal>
    </SafeAreaView>
  )
}

export default create_store;