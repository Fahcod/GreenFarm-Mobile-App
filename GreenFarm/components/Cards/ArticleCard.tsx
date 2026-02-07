import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { Content } from '@/types/types';

const ArticleCard = (props:Content) => {
  return (
    <Pressable onPress={()=>router.push(`/(screens)/article/${props._id}` as any)}
    className='w-full p-3 mt-4 border-solid border border-gray-100 rounded-md bg-white'>
    <View className='relative'>
    <Image className='rounded-md' style={{width:'100%',height:160}}
    source={{uri:props.files[0]}}/>
    </View>
    {/* the title and description container */}
    <View className='w-full'>
    <Text numberOfLines={2} className='font-poppins-bold text-md text-[#303030]'>{props.title}</Text>
    <Text numberOfLines={2} className='text-sm font-poppins text-[#454545]'>{props.description}</Text>
    </View>
    <View className='w-full flex flex-row items-center justify-between'>
    <Text className='text-[#454545] text-xs pt-3'>120 views • 2w ago</Text>
    </View>
    </Pressable>
  )
}

export default ArticleCard;