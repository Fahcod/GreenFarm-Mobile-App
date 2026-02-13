import { View, Text, Pressable, Image} from 'react-native';
import React from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Content } from '@/types/types';

const VideoCard = (props:Content) => {
  return (
<Pressable onPress={()=>router.push(`/(screens)/watch/${props._id}` as any)}
className='w-full p-3 mt-4 border-solid border border-gray-100 rounded-md bg-white'>
<View className='relative'>
<Image className='rounded-md' style={{width:'100%',height:160}}
source={{uri:props.files[1]}}/>
{/* the overlay */}
<View className='w-full flex flex-col justify-between items-center absolute top-0 h-[160px] rounded-md'>
{/* the top  container for the mute icon */}
<View></View>
{/* the play icon */}
<View className='bg-[#00000096] px-5 mt-6 py-1 rounded-md'>
<FontAwesome6 size={18} color={'#fff'} name={'play'}/>
</View>
{/* the video duration */}
<View className='w-full p-3 flex flex-row justify-end'>
<Text className='text-white text-sm bg-[#00000096] font-poppins rounded-md px-2'>12:00</Text>
</View>
</View>
</View>
{/* the title and description container */}
<View className='w-full'>
<Text numberOfLines={2} className='font-poppins-bold text-md text-[#303030]'>{props.title}</Text>
<Text numberOfLines={2} className='text-sm font-poppins text-[#454545]'>{props.description}</Text>
</View>
<View className='w-full flex flex-row items-center justify-between'>
<Text className='text-[#454545] text-xs pt-3'>120 views • 2w ago</Text>
</View>
</Pressable>
  )
}

export default VideoCard;