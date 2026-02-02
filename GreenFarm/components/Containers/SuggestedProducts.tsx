import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import MarketplaceItem from '../Cards/MarketplaceItem';
import { router } from 'expo-router';
import HorizontalRule from '../HorizontalRule';
import EmptySuggestedProducts from '../EmptyComponents/EmptySuggestedProducts'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const SuggestedProducts = () => {

  const suggested_products = useSelector((state:RootState)=>state.products.suggested_products)

  return (
    <>
   <View className='w-full my-5 flex flex-row items-center justify-between'>
   <Text className='font-poppins-bold text-lg'>Marketplace</Text>
   {/* the right see all button */}
   <TouchableOpacity onPress={()=>router.push('/(screens)/product/listing/all')} className='flex flex-row items-center gap-2'>
   <Text className='text-green-600 font-poppins'>See all</Text>
   <FontAwesome6 size={15} color={'#16a34a'} name={'chevron-right'}/>
   </TouchableOpacity>
   </View>
   {/* the flatlist to render the products */}
   <FlatList
   data={suggested_products}
   horizontal={true}
   bounces={false}
   ListEmptyComponent={<EmptySuggestedProducts/>}
   renderItem={({item})=><MarketplaceItem {...item}/>}
   contentContainerStyle={{gap:10,width:'100%'}}
   showsHorizontalScrollIndicator={false}
   ListFooterComponent={<><HorizontalRule mt={2}/></>}
   keyExtractor={(item)=>item._id}
   nestedScrollEnabled={true}
   />
    </>
  )
}

export default SuggestedProducts;