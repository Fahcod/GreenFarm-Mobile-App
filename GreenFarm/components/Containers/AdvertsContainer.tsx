import { View, Text } from 'react-native';
import React from 'react'
import AdvertCard from '../Cards/AdvertCard';

const AdvertsContainer = () => {
  return (
    <View className='w-full rounded-md mt-4 h-[170px] bg-gray-100'>
    <AdvertCard/>
    </View>
  )
}

export default AdvertsContainer;