import { View, Text, TouchableOpacity, Image, TextInput, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome6 } from '@expo/vector-icons'
import { images } from '@/constants/images'
import { router } from 'expo-router'
import { all_messages } from '@/constants/data'
import MyMessage from '@/components/MyMessage'
import OtherMessage from '@/components/OtherMessage'

const chatPage = () => {
  return (
    <SafeAreaView className='bg-white flex-1'>
    {/* the custom header */}
    <View className='w-full p-3 flex flex-row items-center justify-between bg-white z-[1000] h-[60px] border-solid border-b border-gray-100'>
    <View className='flex flex-row gap-3 items-center flex-1'>
    <TouchableOpacity onPress={()=>router.back()}>
    <FontAwesome6 size={18} name={'chevron-left'}/>
    </TouchableOpacity>

    <View className='flex flex-row items-center gap-2'>
    <Image className='rounded-full' style={{width:38,height:38}} source={images.profile_pic}/>
    <View>
    <Text className='font-bold'>Twesigye Fahad</Text>
    <Text className='text-sm leading-none'>online</Text>
    </View>
    </View>
    </View>

    <TouchableOpacity>
    <FontAwesome6 size={18} name={'ellipsis-vertical'}/>
    </TouchableOpacity>
    </View>
    {/* the end of the header, the message container*/}
    <FlatList
    data={all_messages}
    renderItem={({item})=>(item.from === "you"?<MyMessage {...item}/>:
    <OtherMessage {...item}/>)}
    contentContainerStyle={{flex:1,paddingHorizontal:10,backgroundColor:'#eeede4'}}
    showsVerticalScrollIndicator={false}
    />
    {/* THE BOTTOM MESSAGE CONTAINER */}
    <View className='absolute right-0 px-3 bottom-0 h-[60px]'>
    <View className='w-full rounded-full shadow-md gap-3 flex flex-row items-center justify-between px-2 bg-white'>
    <TextInput
    placeholder='type your message'
    className='flex-1 px-2'
    />
    <TouchableOpacity className='bg-primary-300 flex flex-row items-center justify-center rounded-full w-[36px] h-[36px]'>
    <FontAwesome6 name={'paper-plane'} color={'#fff'} size={19} solid/>
    </TouchableOpacity>
    </View>
    </View>
    </SafeAreaView>
  )
}

export default chatPage;