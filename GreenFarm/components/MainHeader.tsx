import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router';


const MainHeader = () => {
  return (
    <View className='w-full border-solid border-b border-gray-50  flex z-[1000] flex-row justify-between items-center p-3 h-[55px] bg-white'>
    <Text className='font-black text-[20px]'>Green<Text className='text-green-600'>farm</Text></Text>
    
    {/* the right container */}
    <View className='flex flex-row items-center gap-6'>

    <TouchableOpacity onPress={()=>router.push('/(auth)/role_selecion')}>
    <Feather size={22} name="search"/>
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>router.push('/(screens)/notifications')}>
    <Feather size={22} name="bell"/>
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>router.push('/(business)/' as any)}>
    <Feather size={22.5} name="list"/>
    </TouchableOpacity>

    </View>
    </View>
  )
}

export default MainHeader;