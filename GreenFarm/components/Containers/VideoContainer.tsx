import {FlatList,Text,View,TouchableOpacity} from 'react-native';
import React from 'react';
import VideoCard from '../Cards/VideoCard';
import HorizontalRule from '../HorizontalRule';
import { FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';
import EmptyVideos from '../EmptyComponents/EmptyVideos';
import { Content } from '@/types/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';


const VideoContainer = () => {

  const latest_videos:Content[] = useSelector((state:RootState)=>state.content.latest_videos);

  return (
    <FlatList
    data={latest_videos}
    ListEmptyComponent={<EmptyVideos/>}
    ListHeaderComponent={<>
    <View className="w-full mt-4 flex flex-row items-center justify-between">
    <Text className='font-poppins-bold text-lg'>Latest videos</Text>

    {/* the right see all button */}
    <TouchableOpacity onPress={()=>router.push('/(screens)/product/listing/all')} 
    className='flex flex-row items-center gap-2'>
    <Text className='text-green-600 font-poppins'>See all</Text>
    <FontAwesome6 size={15} color={'#16a34a'} name={'chevron-right'}/>
    </TouchableOpacity>
    </View>
    </>}
    renderItem={({item})=>(<VideoCard {...item}/>)}
    showsVerticalScrollIndicator={false}
    ListFooterComponent={<HorizontalRule mt={15}/>}
    />
  )
}

export default VideoContainer;