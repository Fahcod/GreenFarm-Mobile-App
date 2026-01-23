import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';


const role_selecion = () => {
  return (
    <SafeAreaView className='flex-1 bg-white'>
    {/* this is the page where the users will select their roles */}
    <View className='flex-1 pt-24 flex flex-col items-center'>
    <View className='w-full px-5'>
    <Text className='font-bold text-center text-lg'>Hi welcome, who are you?</Text>
    <Text className='text-[#454545] text-sm text-center'>To get the best of our services, you will select who you are, to let us know how to serve you</Text>
    </View>
    
    {/* the roles container */}
    <View className='flex flex-col gap-7 mt-10'>

    <TouchableOpacity onPress={()=>router.push('/(auth)/signup')} className='flex border-solid border border-gray-200 py-4 rounded-md px-11  flex-row items-center gap-4'>
    <FontAwesome6 size={20} color={'#16a34a'} name={'tractor'}/>
    <Text className='font-semibold'>I am a farmer</Text>
    </TouchableOpacity>

    <TouchableOpacity className='flex border-solid border border-gray-200 py-4 rounded-md px-11  flex-row items-center gap-4'>
    <FontAwesome6 size={20} color={'#16a34a'} name={'shop'}/>
    <Text className='font-semibold'>I am a business owner</Text>
    </TouchableOpacity>

    <TouchableOpacity className='flex border-solid border border-gray-200 py-4 rounded-md px-11  flex-row items-center gap-4'>
    <FontAwesome6 size={20} color={'#16a34a'} name={'leaf'}/>
    <Text className='font-semibold'>I am an Agric expert</Text>
    </TouchableOpacity>

    {/* the next button */}
    <TouchableOpacity className='px-11 rounded-md mt-4 bg-primary-300 py-4'>
    <Text className='text-lg text-white text-center'>Continue to next</Text>
    </TouchableOpacity>

    </View>
    

    </View>
    </SafeAreaView>
  )
}

export default role_selecion;