import { View } from 'react-native';
import React from 'react';

const dummy_data = [1,2]

const EmptySuggestedProducts = () => {
  return (
   <View className='w-full px-3 flex flex-row flex-wrap gap-3'>
   {dummy_data.map((item,index)=>{
    return (
     <View className='w-[48%]' key={index}>
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

export default EmptySuggestedProducts;