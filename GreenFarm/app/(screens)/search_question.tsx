import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Feather, FontAwesome6 } from '@expo/vector-icons';
import { TextInput } from 'react-native';

const searchQuestion = () => {
  return (
    <SafeAreaView className='flex-1 bg-white'>
    {/* the custome header */}
    <View className='w-full p-3 z-[1000] flex flex-row items-center justify-between h-[60px] bg-white border-solid border-b border-gray-100'>
    <TouchableOpacity onPress={()=>router.back()}>
    <FontAwesome6 size={20} name="arrow-left"/>
    </TouchableOpacity>

    <Text className='font-bold text-lg'>Search questions</Text>

    <TouchableOpacity>
    <FontAwesome6 size={20} name="ellipsis-vertical"/>
    </TouchableOpacity>
    </View>
    {/* the end of the custom header */}

    {/* the search box */}
    <View className='px-2 mt-6'>
    <View className='w-full mb-11 mt-3 px-3 bg-[#efefef] rounded-md flex gap-4 flex-row items-center'>
    <TouchableOpacity>
    <Feather size={18} color={'#454545'} name={'search'}/>
    </TouchableOpacity>
    <TextInput 
    className='flex-1'
    placeholder='search questions'/>
    <TouchableOpacity>
    <FontAwesome6 size={18} color={'#454545'} name={'filter'}/>
    </TouchableOpacity>
    </View>
    </View>

    </SafeAreaView>
  )
}

export default searchQuestion;