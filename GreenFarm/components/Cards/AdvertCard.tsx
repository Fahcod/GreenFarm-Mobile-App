import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const AdvertCard = () => {
  return (
    <View className='w-full p-3 rounded-md flex flex-row items-center h-[170px] bg-green-600'>
    <View>
    <Text className='font-bold text-lg leading-none text-white'>
    Boost your incoe by learning the best farming practices! </Text>
    <Text className='text-xs font-open-sans text-white pt-2'>
    Browse our up to date video tips on the best farming practices in your local languages, right there for free 
    </Text>
    
    <TouchableOpacity className='w-24 shadow-md py-1 rounded-full mt-2 bg-white'>
    <Text className='text-sm text-center'>Get started</Text>
    </TouchableOpacity>
    </View>
    </View>
  )
}

export default AdvertCard;