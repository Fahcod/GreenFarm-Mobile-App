import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons'
import { router } from 'expo-router'

const StoreItem = (props:any) => {
  return (
   <View className='w-full mt-6 flex flex-row items-center'>
    <View className='flex flex-row gap-3'>
    <Image className='rounded-lg' source={props.image} style={{width:75,height:75}}/>
    {/* the details */}
    <View className='flex-1'>
    <Text numberOfLines={1} className='font-semibold'>{props.name}</Text>
    <Text numberOfLines={1} className='text-[#454545] text-sm'>{props.dealing_in}</Text>
    {/* the location, rating and visit btn */}
    <View className='gap-8 flex flex-row items-center justify-between'>
    <View>
    <View className='flex flex-row items-center gap-1'>
    <FontAwesome6 size={12} name={'location-dot'} color={'#454545'}/>
    <Text className='text-sm text-[#454545]'>{props.location}</Text>
    </View>
    <View className='flex flex-row gap-1'>
    <FontAwesome6 name="star" size={10} color={'#f0bc13'} solid/>
    <FontAwesome6 name="star" size={10} color={'#f0bc13'} solid/>
    <FontAwesome6 name="star" size={10} color={'#f0bc13'} solid/>
    <FontAwesome6 name="star" size={10} color={'#f0bc13'} solid/>
    <FontAwesome6 name="star" size={10} color={'#f0bc13'} solid/>
    </View>
    </View>
    {/* the visit button */}
    <TouchableOpacity onPress={()=>router.push(`/(screens)/store/sdsf4ert`)} className='bg-primary-300 mt-0.5 px-3 py-0.5 rounded-md'>
    <Text className='text-sm text-white'>Visit</Text>
    </TouchableOpacity>
    </View>
    </View>
    </View>
    </View>
  )
}

export default StoreItem;