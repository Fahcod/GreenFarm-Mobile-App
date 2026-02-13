import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, FontAwesome6 } from '@expo/vector-icons';
import EmptyReviews from '@/components/EmptyComponents/EmptyReviews';

const notifications = () => {
  return (
    <SafeAreaView className='flex-1 bg-white'>
    {/* the custom header */}
    <View className='w-full flex-row items-center justify-between p-3 bg-white border-solid h-[60px] border-b border-gray-100'>
    <View className='flex flex-row items-center gap-2'>
    <View className='w-[34px] items-center justify-center h-[34px] bg-[#efefef] rounded-full'>
    <FontAwesome6 size={18} name={'bell'} solid/>
    </View>
    <Text className='font-bold text-xl'>Notifications</Text>
    </View>
    {/* the right button */}
    <TouchableOpacity className='w-[34px] flex items-center justify-center h-[34px] bg-[#efefef] rounded-full'>
    <Feather name={'menu'} size={20}/>
    </TouchableOpacity>
    </View>
    {/* end of the header, the notifications list */}
    <FlatList
    data={[]}
    contentContainerStyle={{paddingHorizontal:10,paddingVertical:10}}
    showsVerticalScrollIndicator={false}
    ListEmptyComponent={<EmptyReviews/>}
    renderItem={({item})=>(
    <View className='w-full mt-2 p-3 bg-white border-solid border border-gray-100 rounded-md'>
    {/* the header */}
    <View className='w-full flex flex-row items-center gap-4'>
    <Text className='font-poppins-bold'>New message</Text>
    <Text className='text-sm font-poppins text-[#454545]'>12h ago</Text>
    </View>
    {/* the body */}
    <View>
    <Text className='text-[#454545] text-sm font-poppins'
    numberOfLines={3}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime aspernatur illo doloribus veritatis libero tenetur dolor, eaque consequatur dolorum eveniet aliquid ipsum iure commodi fuga itaque distinctio? Ab, magni in.</Text>
    </View>
    </View>
    )}
    />

    </SafeAreaView>
  )
}

export default notifications;