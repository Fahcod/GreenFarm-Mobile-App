import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import StoreItem from '../StoreItem';
import { router } from 'expo-router';
import EmptyStores from '../EmptyComponents/EmptyStores';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const SuggestedStores = () => {

  const suggested_stores = useSelector((state:RootState)=>state.stores.suggested_stores);

  return (
    <FlatList
    data={suggested_stores}
    ListEmptyComponent={<EmptyStores/>}
    ListHeaderComponent={<>
    <View className='w-full mt-7 flex flex-row justify-between items-center'>
    <Text className='font-poppins-bold text-lg'>Suggested stores</Text>
    <TouchableOpacity onPress={()=>router.push('/(screens)/store/stores/all')}>
    <Text className='text-blue-500 font-poppins'>see more</Text>
    </TouchableOpacity>
    </View>
    </>}
    renderItem={({item})=><StoreItem {...item}/>}
    keyExtractor={(item)=>item._id}
    />
  )
}

export default SuggestedStores;