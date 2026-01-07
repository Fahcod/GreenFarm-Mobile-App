import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { categories } from '@/constants/data';
import CategoryCard from '../Cards/CategoryCard';

const Categories = () => {
  return (
   <FlatList
   data={categories}
   showsVerticalScrollIndicator={false}
   ListHeaderComponent={<>
   <View className='w-full mt-4'>
   <View className='w-full'>
   <Text className='font-bold text-lg'>What are you looking for?</Text>
   </View>
   </View>
   </>}
   columnWrapperStyle={{gap:15,marginTop:15}}
   keyExtractor={(item)=>item._id}
   numColumns={3}
   renderItem={({item})=><CategoryCard {...item}/>}
   />
  )
}

export default Categories;