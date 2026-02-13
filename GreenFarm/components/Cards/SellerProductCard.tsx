import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons';
import { Product } from '@/types/types';
import { router } from 'expo-router';


const SellerProductCard = (item:Product) => {
  return (
    <View className='w-full bg-white border-solid border border-gray-100 mt-4 p-2 rounded-md flex flex-row gap-3'>
    <Image className='rounded-md' style={{width:85,height:85}} source={{uri:item.images[0]}}/>
    <View className='flex-1'>
    <Text numberOfLines={1} className='font-bold'>{item.title}</Text>
    <Text className='text-xs font-poppins-semibold text-[#454545]' 
    numberOfLines={1}>UGX {item.price}</Text>
    {/* the store rating */}
    <View className='flex flex-row items-center gap-2'>
    <View className='flex flex-row gap-1'>
    <FontAwesome6 color={'#f0bc13'} size={10} name={'star'} solid/>
    <FontAwesome6 color={'#f0bc13'} size={10} name={'star'} solid/>
    <FontAwesome6 color={'#f0bc13'} size={10} name={'star'} solid/>
    <FontAwesome6 color={'#f0bc13'} size={10} name={'star'} solid/>
    <FontAwesome6 color={'#f0bc13'} size={10} name={'star'} solid/>
    </View>
    <Text className='text-xs font-poppins'>(0 reviews)</Text>
        </View>
    {/* the view store button */}
    <View className='w-full flex flex-row gap-3 pt-2'>

    <TouchableOpacity onPress={()=>{}} className='bg-primary-300 px-2 py-0.5 rounded-md'>
    <Text className='text-xs text-white font-poppins'>View product</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>router.push(`/(screens)/store/products/edit_product/${item._id}`)} 
    className='bg-[#efefef] px-2 py-0.5 rounded-md'>
    <Text className='text-xs font-poppins'>Edit product</Text>
    </TouchableOpacity>

    </View>
    </View>
    </View>
  )
}

export default SellerProductCard;