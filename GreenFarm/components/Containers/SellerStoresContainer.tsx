import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import SellerStoreCard from '../Cards/SellerStoreCard';
import { router } from 'expo-router';
import EmptyStores from '../EmptyComponents/EmptyStores';

const SellerStoresContainer = () => {

  const business_stores = useSelector((state:RootState)=>state.stores.business_stores);

  return (
    <FlatList
    data={business_stores}
    ListEmptyComponent={<EmptyStores/>}
    contentContainerStyle={{marginTop:25}}
    ListHeaderComponent={<>
    <View className='w-full flex flex-row items-center justify-between'>
    <Text className='font-poppins-bold text-lg'>My stores</Text>
    <TouchableOpacity onPress={()=>router.push('/(business)/stores')}>
    <Text className='text-blue-500 font-poppins'>See all</Text>
    </TouchableOpacity>
    </View>
    </>}
    renderItem={({item})=><SellerStoreCard {...item}/>}
    />
  )
}

export default SellerStoresContainer;