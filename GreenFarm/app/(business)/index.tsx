import { View, Text, Image, TouchableOpacity, SectionList, Pressable } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants/images';
import { Feather, FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';

const index = () => {

  const SECTIONS = [
    {type:'stats',data:[1]}
  ];

  const renderItem = ({section}:{section:{type:string,data:number[]}})=>{
      switch(section.type){

          default:
            return <></>
      }
  }

  return (
    <SafeAreaView edges={["top","left","right"]} className='bg-white flex-1'>
    {/* the header */}
    <View className='w-full h-[60px] p-3 border-solid border-b border-gray-50 flex flex-row z-[1000] bg-white items-center justify-between'>
    {/* owner details */}
    <Pressable onPress={()=>router.push('/(screens)/business_profile')} className='flex flex-row gap-3'>
    <Image className='rounded-full' source={images.profile_pic} style={{width:34,height:34}}/>
    <View>
    <Text className='font-bold'>Hi, Fahad</Text>
    <Text className='text-[#454545] text-xs'>You are welcome</Text>
    </View>
    </Pressable>

    {/* the right button */}
    <TouchableOpacity onPress={()=>router.push('/(auth)/role_selecion')} className='w-[34px] flex items-center justify-center h-[34px] bg-[#efefef] rounded-full'>
    <Feather name={'menu'} size={20}/>
    </TouchableOpacity>
    </View>
    {/* END OF THE HEADER */}

    <SectionList
     sections={SECTIONS}
     renderItem={renderItem}
     contentContainerStyle={{paddingHorizontal:10,paddingTop:10,paddingBottom:20}}
    />
    
    </SafeAreaView>
  )
}

export default index;