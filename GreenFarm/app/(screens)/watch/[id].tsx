import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { images, videos } from '@/constants/images';
import { all_videos } from '@/constants/data';
import {VideoView,useVideoPlayer} from "expo-video"
import HorizontalRule from '@/components/HorizontalRule';


const WatchPage = () => {

  const player = useVideoPlayer(videos.video_one,(player)=>{
    player.play();
  });

  return (
  <SafeAreaView className='bg-white flex-1'>
  {/* the custome header */}
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
   {/* THIS MARKS THE END OF THE CUSTOME HEADER, AND THE VIDEO PLAYER NEXT */}
   <FlatList
   data={all_videos.slice(0,3)}
   renderItem={({item})=><>
   <View className='w-full mt-5 flex flex-row gap-3'>
   {/* the video thumbnail */}
   <View className='w-[45%] relative'>
   <Image className='rounded-md' source={item.thumbnail} style={{height:90,width:'100%'}}/>
   {/* the overlay container */}
   <View className='w-full flex items-center justify-center flex-col rounded-md absolute top-0 h-full'>
   {/* the play icon */}
   <View className='bg-[#000000a8] px-3 py-1 rounded-md'>
   <FontAwesome6 color={'#fff'} size={15} name={'play'}/>
   </View>
   {/* the video duration container */}
   <View className='bg-[#000000a8] absolute right-2 bottom-2 px-2 rounded-lg'>
   <Text className='text-white text-[9px]'>23:05</Text>
   </View>
   </View>
   </View>
   {/* the video title, and desc cont */}
   <View className='flex-1'>
   <Text numberOfLines={2} className='font-bold text-[14px]'>{item.title}</Text>
   <Text numberOfLines={3} className='text-[12px] text-[#454545]'>{item.description}</Text>
   </View>
   </View>
   </>}
   contentContainerStyle={{paddingHorizontal:10,paddingBottom:35,paddingTop:15}}
   showsVerticalScrollIndicator={false}
   ListHeaderComponent={<>
   <View className='w-full'>
   <VideoView
   player={player}
   style={{width:'100%',backgroundColor:'#cacaca',height:170,borderRadius:6}}
   allowsFullscreen={true}
   nativeControls={true}
   />
   {/* the video details */}
   <View className='w-full pt-1'>
   <Text className='font-bold leading-[18px] text-[15px]'>Okulima Enyaya mungeri esinga okuba eyomulembe ofunamu</Text>
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
   <Text className='text-[#454545] pt-3'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem 
    reprehenderit incidunt placeat quod repellat, suscipit consequuntur
     adipisci doloribus, pariatur illum, magni quaerat perspiciatis 
     sapiente corrupti? Nesciunt quos voluptatibus dolores nulla.</Text>
   </View>
   <HorizontalRule mt={15}/>
   <View className='w-full py-3'>
   <Text className='font-bold text-[15px]'>More educational videos</Text>
   </View>
   </View>
   </>}
   />
  
    </SafeAreaView>
  )
}

export default WatchPage;