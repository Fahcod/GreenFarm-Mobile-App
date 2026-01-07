import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import {Feather, FontAwesome6,MaterialIcons } from '@expo/vector-icons';
import { all_products } from '@/constants/data';
import ProductCard from '@/components/Cards/ProductCard';
import { router } from 'expo-router';

const productCategory = () => {
  return (
   <SafeAreaView className='flex-1 bg-white'>
   {/* the custom header */}
   <View className='w-full p-3 h-[60px] flex flex-row items-center justify-between z-[1000] border-solid border-b border-gray-100'>
   <TouchableOpacity onPress={()=>router.back()}>
   <FontAwesome6 size={20} name="arrow-left"/>
   </TouchableOpacity>
   <Text className='font-bold text-lg'>Tools</Text>
   <View></View>
   </View>
   {/* end of the header */}
  <FlatList
  data={all_products}
    renderItem={({item})=><ProductCard {...item}/>}
    numColumns={2}
    showsVerticalScrollIndicator={false}
    columnWrapperStyle={{gap:10,marginBottom:15}}
    contentContainerStyle={{
        paddingHorizontal:10,
        paddingTop:10,
        paddingBottom:35,
    }}
    ListHeaderComponent={<>
    <View className='w-full'>
    {/* the search box */}
    <View className='w-full mb-11 mt-3 px-3 bg-[#efefef] rounded-md flex gap-4 flex-row items-center'>
    <TouchableOpacity>
    <Feather size={18} color={'#454545'} name={'search'}/>
    </TouchableOpacity>
    <TextInput 
    className='flex-1'
    placeholder='search products'/>
    <TouchableOpacity>
    <FontAwesome6 size={18} color={'#454545'} name={'filter'}/>
    </TouchableOpacity>
    </View>
    </View>
    </>}
  />

   </SafeAreaView>
  )
}

export default productCategory;