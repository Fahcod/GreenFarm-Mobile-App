import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import MainHeader from '@/components/MainHeader';

const profile = () => {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <MainHeader />

    </SafeAreaView>
  )
}

export default profile;