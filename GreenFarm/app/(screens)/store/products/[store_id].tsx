import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Feather, FontAwesome6 } from '@expo/vector-icons';
import { all_products } from '@/constants/data';
import ProductCard from '@/components/Cards/ProductCard'

const storeProducts = () => {
  return (
    <SafeAreaView className='bg-white flex-1'>
    {/* the custom header */}
    <View className='w-full p-3 h-[60px] flex flex-row items-center justify-between z-[1000] border-solid border-b border-gray-100'>
    <TouchableOpacity onPress={()=>router.back()}>
    <FontAwesome6 size={20} name="arrow-left"/>
    </TouchableOpacity>
    <Text className='font-bold text-lg'>All store store products</Text>
    <TouchableOpacity>
    <FontAwesome6 size={20} name="ellipsis-vertical"/>
    </TouchableOpacity>
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

export default storeProducts;