import { View, Text, TouchableOpacity, ScrollView, TextInput, Pressable } from 'react-native';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';

const addReview = () => {
  return (
    <SafeAreaView className='bg-white flex-1'>
    {/* the custom header */}
    <View className='w-full p-3 flex flex-row items-center justify-between bg-white h-[60px] border-solid border-b border-gray-100'>
    <TouchableOpacity onPress={()=>router.back()}>
    <FontAwesome6 size={22} name={'arrow-left'}/>
    </TouchableOpacity>
    <Text className='font-poppins-bold text-lg'>Rate store</Text>
    <View></View>
    </View>
    {/* end of the custom header */}
    <ScrollView contentContainerStyle={{paddingHorizontal:12,paddingVertical:16}}>
    {/* the add review form */}
    <View className='w-full'>
    {/* input for the review */}
    <TextInput 
    placeholder='What do you say about the store?'
    multiline={true}
    style={{textAlignVertical:'top'}}
    className='w-full p-3 border-solid border border-gray-100 rounded-md h-[200px]'
    />

    {/* the container for rating */}
    <View className='mt-3'>
    <View className='flex flex-row items-center gap-3'>
    <Text className='font-poppins-bold'>Rate this store</Text>
    <Text className='font-poppins text-[#45545] text-xs'>(Tap stars to rate)</Text>
    </View>
    <View className='w-full mt-2 py-5 rounded-md gap-3 border-solid bg-white border border-gray-100 flex flex-row items-center justify-center'>
    
    <Pressable>
    <FontAwesome6 name={"star"} size={20} color={'#808080'} solid/>
    </Pressable>

    <Pressable>
    <FontAwesome6 name={"star"} size={20} color={'#808080'} solid/>
    </Pressable>

    <Pressable>
    <FontAwesome6 name={"star"} size={20} color={'#808080'} solid/>
    </Pressable>

    <Pressable>
    <FontAwesome6 name={"star"} size={20} color={'#808080'} solid/>
    </Pressable>

    <Pressable>
    <FontAwesome6 name={"star"} size={20} color={'#808080'} solid/>
    </Pressable>
    
    </View>
    </View>

    {/* the button to submit */}
    <View className='mt-7'>
    <TouchableOpacity className='bg-primary-300 w-full py-2 rounded-md'>
    <Text className='font-poppins text-white text-center'>Submit your review</Text>
    </TouchableOpacity>
    </View>

    </View>

    </ScrollView>

    </SafeAreaView>
  )
}

export default addReview;