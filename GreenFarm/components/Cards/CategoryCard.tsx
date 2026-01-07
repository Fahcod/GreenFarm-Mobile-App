import { View, Text, Pressable, Image } from 'react-native';
import React from 'react'
import { router } from 'expo-router';

const CategoryCard = (props:any) => {
  return (
   <Pressable onPress={()=>router.push('/category/98765' as any)} className='w-[30%] relative bg-green-500 overflow-hidden rounded-lg h-[90px]'>
   <Image source={props.image} style={{width:'100%',height:'100%'}}/>
   {/* the overlay componet */}
   <View className='absolute flex py-3 flex-col items-center justify-end bg-[#0000004d]  w-full h-full top-0 right-0'>
   <View className='bg-[#00000077] py-1 px-3 rounded-full'>
   <Text className='font-semibold text-xs text-white'>{props.title}</Text>
   </View>
   </View>
   </Pressable>
  )
}

export default CategoryCard;