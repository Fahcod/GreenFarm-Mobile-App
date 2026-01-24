import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import ArticleCard from '../Cards/ArticleCard';
import { FontAwesome6 } from '@expo/vector-icons'
import EmptyLatestArticles from '../EmptyComponents/EmptyLatestArticles';

const LatestArticles = () => {
  return (
   <>
   <View className='w-full my-5 flex flex-row items-center justify-between'>
   <Text className='font-bold text-xl'>Latest articles</Text>
   {/* the right see all button */}
   <TouchableOpacity className='flex flex-row items-center gap-2'>
   <Text className='text-green-600'>See all</Text>
   <FontAwesome6 size={15} color={'#16a34a'} name={'chevron-right'}/>
   </TouchableOpacity>
   </View>
   <FlatList
   data={[]}
   renderItem={({item})=><ArticleCard props={item}/>}
   horizontal={true}
   ListEmptyComponent={<EmptyLatestArticles/>}
   contentContainerStyle={{gap:10,width:'100%'}}
   showsHorizontalScrollIndicator={false}
   bounces={false}
   />
   </>
  )
}

export default LatestArticles;