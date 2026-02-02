import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react'
import { router } from 'expo-router';
import { Product } from '@/types/types';

const MarketplaceItem = (props:Product) => {

  const handlePress = (id:any) =>{
    router.push(`/(screens)/product/${id}`)
  }

  return (
    <View className='w-[163px] overflow-hidden rounded-md border-solid border border-gray-100 bg-white'>
    <Image style={{width:'100%',height:130}} source={{uri:props.images[0]}}/>
    {/* the details of the product */}
    <View className='w-full p-2'>
    <Text className='font-poppins-bold text-[#303030]' numberOfLines={2}>{props.title}</Text>
    <Text numberOfLines={2} className='text-sm font-poppins text-[#454545]'>{props.description}</Text>
    <Text className='font-poppins-extrabold text-lg mt-1'>UGX {props.price}</Text>
    {/* the see details button */}
    <TouchableOpacity onPress={()=>handlePress(props._id)} className='w-full mt-2 py-2 rounded-md bg-green-600'>
    <Text className='text-sm text-white text-center'>See details</Text>
    </TouchableOpacity>
    </View>
    </View>
  )
}

export default MarketplaceItem;