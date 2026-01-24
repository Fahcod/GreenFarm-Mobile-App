import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import MarketplaceItem from '../Cards/MarketplaceItem';
import { router } from 'expo-router';
import HorizontalRule from '../HorizontalRule';
import EmptySuggestedProducts from '../EmptyComponents/EmptySuggestedProducts'

const SuggestedProducts = () => {
  return (
    <>
   <View className='w-full my-5 flex flex-row items-center justify-between'>
   <Text className='font-bold text-xl'>Marketplace</Text>
   {/* the right see all button */}
   <TouchableOpacity onPress={()=>router.push('/(screens)/product/listing/all')} className='flex flex-row items-center gap-2'>
   <Text className='text-green-600'>See all</Text>
   <FontAwesome6 size={15} color={'#16a34a'} name={'chevron-right'}/>
   </TouchableOpacity>
   </View>
   {/* the flatlist to render the products */}
   <FlatList
   data={[]}
   horizontal={true}
   bounces={false}
   ListEmptyComponent={<EmptySuggestedProducts/>}
   renderItem={({item})=><MarketplaceItem props={item}/>}
   contentContainerStyle={{gap:10,width:'100%'}}
   showsHorizontalScrollIndicator={false}
   ListFooterComponent={<><HorizontalRule mt={2}/></>}
   />
    </>
  )
}

export default SuggestedProducts;