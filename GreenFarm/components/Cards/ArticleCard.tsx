import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { router } from 'expo-router';
import { Content } from '@/types/types';

const ArticleCard = (props:Content) => {
  return (
    <Pressable onPress={()=>router.push(`/(screens)/article/${props._id}` as any)} className='w-[170px] overflow-hidden border-solid border border-gray-200 rounded-md'>
    <Image source={{uri:props.files[0]}} style={{width:'100%',height:120}}/>
    <View className='p-2 flex-1 pb-3'>
    {/* the article title and the description*/}
    <Text numberOfLines={2} className='font-poppins-bold'>{props.title}</Text>
    <Text numberOfLines={3} className='text-sm font-poppins text-[#454545]'>{props.description}</Text>
    </View>
    </Pressable>
  )
}

export default ArticleCard;