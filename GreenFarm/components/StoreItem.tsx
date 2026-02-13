import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Store } from '@/types/types'

const StoreItem = (props:Store) => {
  return (
   <View className='w-full border-solid border-gray-100 p-1 border rounded-md mt-4 flex flex-row items-center'>
    <View className='flex flex-row gap-3'>
    <Image className='rounded-lg bg-[#efefef]' 
    source={{uri:props.store_profile}} style={{width:75,height:75}}/>
    {/* the details */}
    <View className='flex-1'>
    <Text numberOfLines={1} className='font-poppins-bold text-[13px] text-[#303030]'>{props.name}</Text>
    <Text numberOfLines={1} className='text-[#454545] font-poppins text-xs'>
     {props.dealing_in.map((item)=>{
          return item + ", "
        })}
      </Text>
    {/* the location, rating and visit btn */}
    <View className='gap-8 flex flex-row items-center justify-between'>
    <View>
    <View className='flex flex-row items-center gap-1'>
    <FontAwesome6 size={12} name={'location-dot'} color={'#454545'}/>
    <Text className='text-xs font-poppins text-[#454545]'>
    {props.location.country + "," + props.location.city}</Text>
    </View>
    <View className='flex flex-row gap-1 mt-[0.5px]'>
    <FontAwesome6 name="star" size={9} color={'#f0bc13'} solid/>
    <FontAwesome6 name="star" size={9} color={'#f0bc13'} solid/>
    <FontAwesome6 name="star" size={9} color={'#f0bc13'} solid/>
    <FontAwesome6 name="star" size={9} color={'#f0bc13'} solid/>
    <FontAwesome6 name="star" size={9} color={'#f0bc13'} solid/>
    </View>
    </View>
    {/* the visit button */}
    <TouchableOpacity onPress={()=>router.push(`/(screens)/store/${props._id}`)} className='bg-primary-300 mt-0.5 px-3 py-0.5 rounded-md'>
    <Text className='text-sm text-white'>Visit</Text>
    </TouchableOpacity>
    </View>
    </View>
    </View>
    </View>
  )
}

export default StoreItem;