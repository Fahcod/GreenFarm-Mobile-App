import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import ArticleCard from '../Cards/ArticleCard';
import { FontAwesome6 } from '@expo/vector-icons'
import EmptyLatestArticles from '../EmptyComponents/EmptyLatestArticles';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Content } from '@/types/types';

const LatestArticles = () => {

  const latest_articles:Content[] = useSelector((state:RootState)=>state.content.latest_articles);

  return (
   <>
   <View className='w-full mt-5 flex flex-row items-center justify-between'>
   <Text className='font-poppins-bold text-lg'>Latest articles</Text>
   {/* the right see all button */}
   <TouchableOpacity className='flex flex-row items-center gap-2'>
   <Text className='text-green-600 font-poppins'>See all</Text>
   <FontAwesome6 size={15} color={'#16a34a'} name={'chevron-right'}/>
   </TouchableOpacity>
   </View>
   <FlatList
   data={latest_articles}
   renderItem={({item})=><ArticleCard {...item}/>}
   ListEmptyComponent={<EmptyLatestArticles/>}
   showsHorizontalScrollIndicator={false}
   bounces={false}
   keyExtractor={(item)=>item._id}
   />
   </>
  )
}

export default LatestArticles;