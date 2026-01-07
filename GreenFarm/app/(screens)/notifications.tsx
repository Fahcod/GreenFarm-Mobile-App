import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { all_notifications } from '@/constants/data';

const notifications = () => {
  return (
    <SafeAreaView className='bg-white flex-1'>
    {/* the custom header */}
    <View className='w-full h-[60px] z-[1000] justify-between bg-white shadow p-3 flex flex-row items-center'>
    <TouchableOpacity onPress={()=>router.back()}>
    <FontAwesome6 size={22} name={'arrow-left'}/>
    </TouchableOpacity>
    <Text className='font-bold text-lg'>Notifications</Text>

    <TouchableOpacity>
    <FontAwesome6 size={19} name={'ellipsis-vertical'}/>
    </TouchableOpacity>
    </View>
    {/* the container for notifications */}
    <FlatList
    data={all_notifications}
    contentContainerStyle={{paddingHorizontal:12,paddingBottom:30}}
    renderItem={({item})=>(
    <View></View>
    )}
    />

    </SafeAreaView>
  )
}

export default notifications;