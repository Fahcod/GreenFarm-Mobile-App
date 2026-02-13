import { View, Text, TouchableOpacity, FlatList, Image, TextInput, Pressable } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, FontAwesome6 } from '@expo/vector-icons'
import { images } from '@/constants/images';
import { router } from 'expo-router';
import EmptyConversations from '@/components/EmptyComponents/EmptyConversations';

const messaging = () => {
  return (
    <SafeAreaView edges={["top","left","right"]} className='bg-white flex-1'>
    {/* the header */}
    <View className='w-full h-[60px] p-3 border-solid border-b border-gray-100 flex flex-row z-[1000] bg-white items-center justify-between'>
    <View className='flex flex-row items-center gap-3'>
    <View className='w-[34px] items-center justify-center h-[34px] bg-[#efefef] rounded-full'>
    <FontAwesome6 size={18} name={'comment-dots'} solid/>
    </View>
    <Text className='font-bold text-xl'>Messages</Text>
    </View>

    {/* the right button */}
    <TouchableOpacity className='w-[34px] flex items-center justify-center h-[34px] bg-[#efefef] rounded-full'>
    <Feather name={'menu'} size={20}/>
    </TouchableOpacity>
    </View>
    {/* the messages list */}
    <FlatList
    data={[]}
    contentContainerStyle={{paddingHorizontal:10,paddingTop:5,paddingBottom:20}}
    showsVerticalScrollIndicator={false}
    ListEmptyComponent={<EmptyConversations/>}
    ListHeaderComponent={<>
    <View className='w-full px-3 items-center flex flex-row mt-4 h-[40px] rounded-full bg-[#f7f7f7]'>
    <TextInput
    placeholder='search chats'
    className='px-3 flex-1'
    />
    <TouchableOpacity>
    <Feather size={17} color={'#454545'} name={'search'}/>
    </TouchableOpacity>
    </View>
    </>}
    renderItem={({item})=>(
      <Pressable onPress={()=>router.push(`/(screens)/chat/98765` as any)} className='w-full flex mt-7 flex-row justify-between'>
      <View className='flex flex-1 flex-row items-center gap-3'>
      <Image className='rounded-full' style={{width:45,height:45}} source={images.profile_pic}/>
      <View>
      <Text className='font-bold text-[16px] text-[#202020]'>Twesigye F</Text>
      <Text className='text-sm text-[#454545]'>How nuch do you charge?</Text>
      </View>
      </View>

      <View className='flex flex-col items-center'>
      <Text className='text-sm text-[#454545]'>10:03 AM</Text>
      </View>
      </Pressable>
    )}
    />

    </SafeAreaView>
  )
}

export default messaging