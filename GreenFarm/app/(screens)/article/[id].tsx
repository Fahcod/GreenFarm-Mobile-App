import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Feather, FontAwesome6 } from '@expo/vector-icons';
import { images } from '@/constants/images';
import HorizontalRule from '@/components/HorizontalRule';
import { all_articles } from '@/constants/data';

const articleDetails = () => {
  return (
    <SafeAreaView  className='bg-white flex-1'>
    {/* the custom header */}
    <View className='w-full flex p-3 flex-row items-center justify-between h-[60px] z-[1000] border-solid border-b border-gray-100'>
    <TouchableOpacity onPress={()=>router.back()}>
    <FontAwesome6 size={22} name={"arrow-left"}/>
    </TouchableOpacity>

    <View className='flex flex-row items-center gap-6'>
    <TouchableOpacity>
    <Feather size={22} name={"search"}/>
    </TouchableOpacity>
    <TouchableOpacity>
    <Feather size={22} name={"bell"}/>
    </TouchableOpacity>
    <TouchableOpacity>
    <FontAwesome6 size={22} name={"ellipsis-vertical"}/>
    </TouchableOpacity>
    </View>
    </View>
    {/* THIS MARKS THE END OF THE CUSTOME HEADER, AND THE ARTICLE NEXT */}
    <FlatList
    data={all_articles}
    renderItem={({item})=>(
    <View className='w-full mt-5 flex flex-row gap-3'>
    {/* the video thumbnail */}
    <View className='w-[45%] relative'>
    <Image className='rounded-md' source={item.images[0]} style={{height:90,width:'100%'}}/>
    </View>
    {/* the video title, and desc cont */}
    <View className='flex-1'>
    <Text numberOfLines={2} className='font-bold text-[14px]'>{item.title}</Text>
    <Text numberOfLines={3} className='text-[12px] text-[#454545]'>{item.description}</Text>
    </View>
    </View>
    )}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{paddingBottom:30,paddingHorizontal:10,paddingTop:10}}
    ListHeaderComponent={<>
    <View className='w-full'>
    <Image className='rounded-md' style={{width:'100%',height:180}} source={images.article_3}/>
    </View>
    {/* the article details */}
    <View className='w-full pt-1'>
    <Text className='font-bold leading-[18px] text-[15px]'>How to plant and care for your banana plantations following best practices</Text>
    {/* the video duration and creator info */}
   <View className='w-full flex gap-3 pt-4 flex-row items-center'>
   <Image className='rounded-full' source={images.profile_pic} style={{width:27,height:27}}/>
   <View className='flex items-center gap-2 flex-row'>
   <Text className='text-xs'>By Twesigye Fahad</Text>
   <Text>•</Text>
   <Text className='text-xs'>January 23, 2024</Text>
   </View>
   </View>
   <HorizontalRule mt={10}/>
   <Text className='text-[#454545] pt-3'>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem 
    reprehenderit incidunt placeat quod repellat, suscipit consequuntur
    adipisci doloribus, pariatur illum, magni quaerat perspiciatis 
    sapiente corrupti? Nesciunt quos voluptatibus dolores nulla.

    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem 
    reprehenderit incidunt placeat quod repellat, suscipit consequuntur
    adipisci doloribus, pariatur illum, magni quaerat perspiciatis 
    sapiente corrupti? Nesciunt quos voluptatibus dolores nulla.
    </Text>
    <HorizontalRule mt={10}/>
    {/* the title for the next article container */}
    <View className='w-full pt-4'>
    <Text className='font-bold text-[15px]'>More educational articles</Text>
    </View>
   </View>
    </>}
    />

    </SafeAreaView>
  )
}

export default articleDetails;