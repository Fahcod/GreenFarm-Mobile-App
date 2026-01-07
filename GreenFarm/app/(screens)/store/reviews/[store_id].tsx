import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
import { images } from '@/constants/images'


const allReviews = () => {
  return (
   <SafeAreaView className='bg-white flex-1'>
    {/* the custom header */}
    <View className='w-full p-3 h-[60px] flex flex-row items-center justify-between z-[1000] border-solid border-b border-gray-100'>
    <TouchableOpacity onPress={()=>router.back()}>
    <FontAwesome6 size={20} name="arrow-left"/>
    </TouchableOpacity>
    <Text className='font-bold text-lg'>All store reviews</Text>
    <TouchableOpacity>
    <FontAwesome6 size={20} name="ellipsis-vertical"/>
    </TouchableOpacity>
    </View>
    {/* end of the header, the store reviews */}
     <FlatList
    data={[1,2,3,4,5,6,7,8,9]}
    keyExtractor={(item)=>String(item)}
    contentContainerStyle={{paddingHorizontal:10,paddingBottom:35}}
    renderItem={({item})=>(
    <View className='w-full flex mt-7 gap-3 flex-row'>
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
   </SafeAreaView>
  )
}

export default allReviews;