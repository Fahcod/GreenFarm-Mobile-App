import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { AntDesign, Feather, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import HorizontalRule from '@/components/HorizontalRule';
import { images } from '@/constants/images';


const profile = () => {
  return (
    <SafeAreaView edges={["top","left","right"]} className='flex-1 bg-white'>
    {/* the custom header */}
    <View className='w-full z-[1000] flex flex-row items-center justify-between p-3 bg-white h-[60px] border-solid border-b border-gray-100'>
    <Text className='font-bold text-xl'>My profile</Text>

    <TouchableOpacity onPress={()=>router.push('/(screens)/notifications')}>
    <Feather size={22} name="bell"/>
    </TouchableOpacity>
    </View>
    {/* END OF THE HEADER */}
    
    <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{
        paddingHorizontal:10,
        paddingVertical:15,
        flex:1
        }}>
    {/* the profile information (photo,name) */}
    <View className='w-full flex flec-col items-center'>
    <View className='relative w-[120px] h-[120px]'>
    <Image className='rounded-full' style={{width:120,height:120}} source={images.profile_pic}/>
    {/* the edit button */}
    <TouchableOpacity className='w-8 flex items-center justify-center right-0 bottom-4 h-8 absolute bg-primary-300 rounded-full'>
    <FontAwesome6 color={'#fff'} size={17} name={'camera'}/>
    </TouchableOpacity>
    </View>
    <Text className='font-bold text-lg mt-2'>Twesigye Fahad</Text>

    <View className='flex flex-row items-center gap-2'>
    <FontAwesome6 color={'#16a34a'} name={'circle-check'} size={15} solid/>
    <Text className='font-semibold text-[#454545] text-sm'>Farmer's account</Text>
    </View>

    </View>
    <HorizontalRule mt={10}/>

    {/* the profile options */}
    <View className='w-full flex mt-4 flex-col gap-6'>

    {/* option */}
    <TouchableOpacity className='flex w-full p-2 rounded-md bg-[#f7f7f7] flex-row items-center justify-between'>
    <View className='flex-row flex items-center gap-3'>
    <Feather name={'edit'} size={22}/>
    <Text className='font-semibold'>Edit profile</Text>
    </View>
    <FontAwesome6 size={18} name={'chevron-right'}/>
    </TouchableOpacity>

    {/* option */}
    <TouchableOpacity className='flex w-full p-2 rounded-md bg-[#f7f7f7] flex-row items-center justify-between'>
    <View className='flex-row flex items-center gap-3'>
    <AntDesign name={'shop'} size={22}/>
    <Text className='font-semibold'>Manage farm info</Text>
    </View>
    <FontAwesome6 size={18} name={'chevron-right'}/>
    </TouchableOpacity>

    {/* option */}
    <TouchableOpacity className='flex w-full p-2 rounded-md bg-[#f7f7f7] flex-row items-center justify-between'>
    <View className='flex-row flex items-center gap-3'>
    <Feather name={'settings'} size={22}/>
    <Text className='font-semibold'>Settings</Text>
    </View>
    <FontAwesome6 size={18} name={'chevron-right'}/>
    </TouchableOpacity>

    </View>

    {/* the last options */}
    <HorizontalRule mt={10}/>
    <View className='w-full mt-3 flex flex-col gap-4'>

    <TouchableOpacity className='flex w-full p-2 rounded-md bg-[#f7f7f7] flex-row items-center gap-5'>
    <Feather name={'log-out'} color={'#ef4444'} size={22}/>
    <Text className='font-semibold text-red-500'>Logout</Text>
    </TouchableOpacity>

    </View>

    </ScrollView>

    </SafeAreaView>
  )
}

export default profile;