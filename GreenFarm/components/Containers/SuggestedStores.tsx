import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { all_stores } from '@/constants/data';
import StoreItem from '../StoreItem';
import { router } from 'expo-router';

const SuggestedStores = () => {
  return (
    <FlatList
    data={all_stores}
    ListHeaderComponent={<>
    <View className='w-full mt-7 flex flex-row justify-between items-center'>
    <Text className='font-bold text-lg'>Suggested stores</Text>
    <TouchableOpacity onPress={()=>router.push('/(screens)/store/stores/all')}>
    <Text className='text-blue-500'>see more</Text>
    </TouchableOpacity>
    </View>
    </>}
    renderItem={({item})=><StoreItem {...item}/>}
    />
  )
}

export default SuggestedStores;