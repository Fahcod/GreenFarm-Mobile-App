import { View } from 'react-native';
import React from 'react';

const dummy_data = [1,2,3,4]

const EmptyVideos = () => {
  return (
   <View className='w-full px-3 py-6 flex flex-col gap-5'>
   {dummy_data.map((item,index)=>{
    return (
      <View className='w-full' key={index}>
      <View className='w-full h-[145px] bg-input rounded-md'></View>
      <View className='flex flex-col gap-2 mt-2'>
      <View className='w-full h-5 bg-input rounded-md'></View>
      <View className='w-[45%] h-3 bg-input rounded-md'></View>
      </View>
      </View>
    )
   })}
   </View>
  )
}

export default EmptyVideos;