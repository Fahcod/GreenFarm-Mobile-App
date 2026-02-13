import { View, Text, Image } from 'react-native'
import React from 'react'
import { Store } from '@/types/types'
import { FontAwesome6 } from '@expo/vector-icons'
import { router } from 'expo-router'
import { TouchableOpacity } from 'react-native'

const SellerStoreCard = (item:Store) => {
  return (
    <View className='w-full flex border-solid border-gray-100 border bg-white rounded-md flex-row gap-3 p-2 mt-4'>
    <Image className='rounded-md bg-[#efefef]' style={{width:80,height:80}} 
    source={{uri:item.store_profile}}/>
    {/* the store details */}
    <View className='flex-1'>
    <Text numberOfLines={1} className='font-poppins-bold text-md'>{item.name}</Text>

    <Text className='text-xs leading-none font-poppins text-[#454545]' numberOfLines={1}>
    {item.dealing_in.map((item)=>{
      return item + ", "
    })}
    </Text>
    {/* the store rating */}
    <View className='flex flex-row items-center gap-2'>
    <View className='flex flex-row gap-1'>
    <FontAwesome6 color={'#f0bc13'} size={10} name={'star'} solid/>
    <FontAwesome6 color={'#f0bc13'} size={10} name={'star'} solid/>
    <FontAwesome6 color={'#f0bc13'} size={10} name={'star'} solid/>
    <FontAwesome6 color={'#f0bc13'} size={10} name={'star'} solid/>
    <FontAwesome6 color={'#f0bc13'} size={10} name={'star'} solid/>
    </View>
    <Text className='text-xs font-poppins'>({item.reviewsCount} reviews)</Text>
    </View>
    {/* the view store button */}
    <View className='w-full flex flex-row gap-3 pt-2'>

    <TouchableOpacity onPress={()=>router.push(`/(screens)/store/store_dashboard/${item._id}` as any)} className='bg-primary-300 px-2 py-0.5 rounded-md'>
    <Text className='text-xs font-poppins text-white'>View store</Text>
    </TouchableOpacity>

    <TouchableOpacity className='bg-[#efefef] px-2 py-0.5 rounded-md'>
    <Text className='text-xs font-poppins'>Edit store</Text>
    </TouchableOpacity>

    </View>
    </View>
    </View>
  )
}

export default SellerStoreCard;