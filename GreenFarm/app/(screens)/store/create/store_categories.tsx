import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';
import HorizontalRule from '@/components/HorizontalRule';
import { icons } from '@/constants/icons';
import { CATEGORIES_LIST } from '@/constants/categories';
import { useDispatch } from 'react-redux';
import { setDealingIn } from '@/slices/formSlice';

const store_categories = () => {

  const [selected,setSelected] = useState<string[]>([]);
  const dispatch = useDispatch();
  
  function handleSelected(item:string){
    // if the item already exists, remove it
    if(selected.includes(item)){
      const newSelected = selected.filter((value:string)=>{
        return value !== item
      });
      setSelected(newSelected)
    }else{
      // if the item is new then add it there
      setSelected([...selected,item])
    }
  }

  function saveData(){
    if(selected.length === 0) return;
    dispatch(setDealingIn(selected));
    router.push('/(screens)/store/create/add_location')
  }

  return (
    <SafeAreaView className='bg-white flex-1'>
    {/* the custom header */}
    <View className='w-full flex flex-row items-center justify-start p-3 z-[1000] h-[45px] bg-white'>
    <TouchableOpacity onPress={()=>router.back()}>
    <FontAwesome6 size={22} name={'arrow-left'}/>
    </TouchableOpacity>
    </View>
    <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{
      paddingHorizontal:10,
      paddingVertical:25,
      display:'flex',
      alignItems:'center',
    }}>
   {/* the page contents come next */}
   <View className='w-full flex flex-col items-center'>
   <View className='flex-col items-center'>
   <Image style={{width:120,height:120}} source={icons.store_categories}/>
   <Text className='font-poppins-bold text-xl text-[#454545]'>What do you sell?</Text>
   </View>
   <HorizontalRule mt={10}/>

   {/* the categories container */}
   <View className='w-[90%] p-3 bg-white rounded-md'>
   {CATEGORIES_LIST.map((item,index)=>{
      return(
        <TouchableOpacity 
        onPress={()=>{handleSelected(item)}}
        key={index} className='bordersolid border-b border-input flex py-2 flex-row gap-3 items-center'>
        {selected.includes(item)?
        <FontAwesome6 color={'#3b82f6'} name={"check-circle"} size={16} solid/>
        :<FontAwesome6 name={"circle"} size={16}/>}
        <Text className='font-poppins'>{item}</Text>
        </TouchableOpacity>
      )
   })}
   </View>

   {/* the next button */}
   <View className='w-[90%] mt-5'>
   <TouchableOpacity
   onPress={()=>{saveData()}}
   className='px-3 py-2 rounded-md bg-primary-300 gap-3'>
   <Text className='font-poppins text-white text-center'>Next</Text>
   </TouchableOpacity>
   </View>

   </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default store_categories;