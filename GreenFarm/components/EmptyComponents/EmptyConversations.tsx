import { View } from 'react-native';
import React from 'react';

const EmptyConversations = () => {

    const dummy_data = [1,2,3,4,5,6];

  return (
    <View className='w-full flex flex-col gap-6 mt-6'>
    {dummy_data.map((item,index)=>{
        return(
            <View className='w-full' key={index}>
            <View className='flex flex-1 flex-row gap-2'>
            <View className='w-[48px] h-[48px] bg-input rounded-full'></View>
            <View className='flex-1'>
            <View className='w-full mt-2 h-3 bg-input rounded-md'></View>
            <View className='w-[65%] mt-2 h-2 bg-input rounded-md'></View>
            <View className='w-[35%] mt-2 h-1 bg-input rounded-md'></View>
            </View>
            </View>
            </View>
        )
    })}
    </View>
  )
}

export default EmptyConversations;