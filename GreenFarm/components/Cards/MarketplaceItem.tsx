import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react'
import { router } from 'expo-router';

const MarketplaceItem = (props:any) => {
  return (
    <View className='w-[163px] overflow-hidden rounded-md border-solid border border-gray-100 bg-white'>
    <Image style={{width:'100%',height:130}} source={props.images[0]}/>
    {/* the details of the product */}
    <View className='w-full p-2'>
    <Text className='font-bold' numberOfLines={2}>{props.title}</Text>
    <Text numberOfLines={2} className='text-sm text-[#454545]'>{props.description}</Text>
    <Text className='font-black text-lg mt-1'>UGX {props.price}</Text>
    {/* the see details button */}
    <TouchableOpacity onPress={()=>router.push(`/(screens)/product/876err` as any)} className='w-full mt-2 py-2 rounded-md bg-green-600'>
    <Text className='text-sm text-white text-center'>See details</Text>
    </TouchableOpacity>
    </View>
    </View>
  )
}

export default MarketplaceItem;