import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, FontAwesome6 } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { images } from '@/constants/images';
import {VideoView,useVideoPlayer} from "expo-video"
import HorizontalRule from '@/components/HorizontalRule';
import { useFetch } from '@/hooks/useFetch';
import { Content } from '@/types/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';


const WatchPage = () => {

   const {id} = useLocalSearchParams();
   const [videoData,setVideoData] = useState<Content>();
   const latest_videos:Content[] = useSelector((state:RootState)=>state.content.latest_videos);

    // fetch the article data
    const fetchData = async ()=>{
    let {data,success} = await useFetch(`/api/v1/content/video/${id}`);
    if(success){
      setVideoData(data as any);
    } else alert("Failed to fetch video")}
  
    useEffect(()=>{
    fetchData()
    },[]);

  const player = useVideoPlayer({uri:videoData?.files[0] as any},
  (player)=>{
    player.play();
  });

  return (
  <SafeAreaView className='bg-white flex-1'>
  {/* the custome header */}
  <View className='w-full flex p-3 flex-row items-center 
  justify-between h-[60px] z-[1000] border-solid border-b border-gray-100'>
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
   data={latest_videos.slice(0,3)}
   renderItem={({item})=><>
   <View className='w-full border-solid border p-1 border-gray-100 rounded-md mt-5 flex flex-row gap-3'>
   {/* the video thumbnail */}
   <View className='w-[45%] relative'>
   <Image className='rounded-md' source={{uri:item.files[1]}} 
   style={{height:90,width:'100%'}}/>
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
   <Text numberOfLines={2} className='font-poppins-bold text-[14px]'>{item.title}</Text>
   <Text numberOfLines={2} className='text-[12px] font-poppins text-[#454545]'>{item.description}</Text>
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
   <Text className='font-poppins-bold leading-[18px] text-[15px]'>{videoData?.title}</Text>
   {/* the video duration and creator info */}
   <View className='w-full flex gap-3 pt-4 flex-row items-center'>
   <Image className='rounded-full' source={images.profile_pic} style={{width:27,height:27}}/>
   <View className='flex items-center gap-2 flex-row'>
   <Text className='text-xs'>By {videoData?.created_by.name}</Text>
   <Text>•</Text>
   <Text className='text-xs'>January 23, 2024</Text>
   </View>
   </View>
   <HorizontalRule mt={10}/>
   <Text className='text-[#454545] font-poppins pt-3'>{videoData?.description}</Text>
   </View>
   <HorizontalRule mt={15}/>
   <View className='w-full pt-3'>
   <Text className='font-poppins-bold text-[15px]'>More educational videos</Text>
   </View>
   </View>
   </>}
   />
  
    </SafeAreaView>
  )
}

export default WatchPage;