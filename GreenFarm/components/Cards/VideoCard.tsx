import { View, Text, Pressable, Image} from 'react-native';
import React from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';

const VideoCard = (props:any) => {
  return (
<Pressable onPress={()=>router.push('/(screens)/watch/8765678' as any)} className='w-full relative mt-6'>
{/* the overlay, play icon container */}
<View className='w-full flex items-center justify-center absolute top-0 z-[100] bg-[#0000000e] h-[170px]'>
{/* the play icon */}
<View className='bg-[#000000a8] px-3 py-1 rounded-md'>
<FontAwesome6 color={'#fff'} size={20} name={'play'}/>
</View>
{/* the video duration container */}
<View className='bg-[#000000a8] absolute right-2 bottom-2 px-2 rounded-lg'>
<Text className='text-white text-sm'>23:05</Text>
</View>
</View>
<Image className='rounded-md' style={{width:'100%', height:170}} source={props.thumbnail}/>
{/* the video details */}
<View className='w-full'>
<Text numberOfLines={2} className='font-bold'>{props.title}</Text>
<Text className='text-sm text-[#454545]'>23hr ago • 4m views</Text>
</View>
</Pressable>
  )
}

export default VideoCard;