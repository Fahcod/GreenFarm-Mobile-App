import { View, Text } from 'react-native'
import React from 'react'

const dummy_data = [1,2,3,4,5];

const EmptyStores = () => {
  return (
    <View className='w-full flex mt-3 flex-col gap-3'>
    {dummy_data.map((item,index)=>{
        return(
        <View key={index} className='w-full flex flex-row gap-2'>
        <View className='w-[75px] h-[75px] bg-input rounded-md'></View>
        <View className='flex-1'>
        <View className='w-full h-3 bg-input rounded-md'></View>
        <View className='w-[75%] mt-3 h-3 bg-input rounded-md'></View>
        <View className='w-[45%] mt-3 h-3 bg-input rounded-md'></View>
        </View>
        </View>
        )
    })}
    </View>
  )
}

export default EmptyStores;