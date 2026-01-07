import {FlatList} from 'react-native';
import React from 'react';
import VideoCard from '../Cards/VideoCard';
import { all_videos } from '@/constants/data';


const VideoContainer = () => {
  return (
    <FlatList
    data={all_videos}
    renderItem={({item})=>(<VideoCard {...item}/>)}
    showsVerticalScrollIndicator={false}
    />
  )
}

export default VideoContainer;