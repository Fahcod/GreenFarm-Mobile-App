import { View, Text, FlatList, Image } from 'react-native';
import React from 'react';
import { images } from '@/constants/images';
import { FontAwesome6 } from '@expo/vector-icons'


const StoreReviews = ({data}:{data:any[]}) => {
  return (
    <FlatList
    data={data}
    keyExtractor={(item)=>String(item)}
    contentContainerStyle={{paddingHorizontal:10}}
    renderItem={({item})=>(
    <View className='w-full flex mt-5 gap-3 flex-row px-3'>
    <View>
    <Image className='rounded-full' style={{width:34,height:34}} source={images.profile_pic}/>
    </View>
    <View className='flex-1'>
    <Text className='font-bold'>Twesigye Fahad</Text>
    <Text className='text-[#454545] text-[13px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat quasi enim a, ullam sed iste, autod iusto.</Text>
    {/* the user rating to the store */}
    <View className='flex flex-row items-center gap-1'>
    <FontAwesome6 color={'#f0bc13'} size={10} name={'star'} solid/>
    <FontAwesome6 color={'#f0bc13'} size={10} name={'star'} solid/>
    <FontAwesome6 color={'#f0bc13'} size={10} name={'star'} solid/>
    <FontAwesome6 color={'#f0bc13'} size={10} name={'star'} solid/>
    <FontAwesome6 color={'#f0bc13'} size={10} name={'star'} solid/>
    </View>
    </View>
    </View>
    )}
    />
  )
}

export default StoreReviews;