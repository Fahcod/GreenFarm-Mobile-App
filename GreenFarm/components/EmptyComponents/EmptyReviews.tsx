import { View, Text } from 'react-native'
import React from 'react'

const dummy_data = [1,2,3,4,5]

const EmptyReviews = () => {
  return (
    <View className='w-full flex flex-col mt-5 gap-8 px-3'>
    {dummy_data.map((item,index)=>{
        return(
            <View key={index} className='w-full flex flex-row gap-3'>
            <View className='w-10 h-10 bg-[#efefef] rounded-full'></View>
            {/* the content container */}
            <View className='flex-1 flex flex-col gap-3'>
            <View className='w-full h-3 bg-[#efefef] rounded-md'></View>
            <View className='w-[85%] h-2 bg-[#efefef] rounded-md'></View>
            <View className='w-[75%] h-2 bg-[#efefef] rounded-md'></View>
            <View className='w-[75%] h-2 bg-[#efefef] rounded-md'></View>
            <View className='w-[75%] h-2 bg-[#efefef] rounded-md'></View>
            </View>
            </View>
        )
    })}
    </View>
  )
}

export default EmptyReviews;