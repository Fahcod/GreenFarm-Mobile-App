import {FlatList,Text,View,TouchableOpacity} from 'react-native';
import React from 'react';
import VideoCard from '../Cards/VideoCard';
import { all_videos } from '@/constants/data';
import HorizontalRule from '../HorizontalRule';
import { FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';
import EmptyVideos from '../EmptyComponents/EmptyVideos';


const VideoContainer = () => {
  return (
    <FlatList
    data={[]}
    ListEmptyComponent={<EmptyVideos/>}
    ListHeaderComponent={<>
    <View className="w-full mt-4 flex flex-row items-center justify-between">
    <Text className='font-bold text-xl'>Latest videos</Text>

    {/* the right see all button */}
    <TouchableOpacity onPress={()=>router.push('/(screens)/product/listing/all')} className='flex flex-row items-center gap-2'>
    <Text className='text-green-600'>See all</Text>
    <FontAwesome6 size={15} color={'#16a34a'} name={'chevron-right'}/>
    </TouchableOpacity>
    </View>
    </>}
    renderItem={({item})=>(<VideoCard props={item}/>)}
    showsVerticalScrollIndicator={false}
    ListFooterComponent={<HorizontalRule mt={15}/>}
    />
  )
}

export default VideoContainer;