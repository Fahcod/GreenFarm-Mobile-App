import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const store_categories = () => {
  return (
    <SafeAreaView className='bg-white flex-1'>
    <ScrollView
    contentContainerStyle={{
      paddingHorizontal:10,
      paddingVertical:25,
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      flex:1
    }}>
   {/* the page contents come next */}
   
    </ScrollView>
    </SafeAreaView>
  )
}

export default store_categories;