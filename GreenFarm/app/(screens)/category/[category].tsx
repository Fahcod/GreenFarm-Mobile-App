import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import {Feather, FontAwesome6} from '@expo/vector-icons';
import ProductCard from '@/components/Cards/ProductCard';
import { router, useLocalSearchParams } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { AppContext } from '@/context/AppContext';
import EmptyProducts from '@/components/EmptyComponents/EmptyProducts';

const productCategory = () => {

  const category_products = useSelector((state:RootState)=>state.products.category_products);
  const {category} = useLocalSearchParams();
  const {fetchCategoryProducts} = useContext(AppContext);

  useEffect(()=>{
   fetchCategoryProducts(category,0,10)
  },[])

  return (
   <SafeAreaView className='flex-1 bg-white'>
   {/* the custom header */}
   <View className='w-full p-3 h-[60px] flex flex-row items-center justify-between z-[1000] border-solid border-b border-gray-100'>
   <TouchableOpacity onPress={()=>router.back()}>
   <FontAwesome6 size={20} name="arrow-left"/>
   </TouchableOpacity>
   <Text className='font-bold text-lg'>{category}</Text>
   <View></View>
   </View>
   {/* end of the header */}
  <FlatList
  data={category_products}
    renderItem={({item})=><ProductCard {...item}/>}
    numColumns={2}
    ListEmptyComponent={<EmptyProducts/>}
    showsVerticalScrollIndicator={false}
    columnWrapperStyle={{gap:10,marginBottom:15}}
    contentContainerStyle={{
        paddingHorizontal:10,
        paddingTop:10,
        paddingBottom:35,
    }}
    ListHeaderComponent={<>
    <View className='w-full px-2'>
    {/* the search box */}
    <View className='w-full mb-11 mt-3 px-3 bg-input rounded-md flex gap-4 flex-row items-center'>
    <TouchableOpacity>
    <Feather size={18} color={'#454545'} name={'search'}/>
    </TouchableOpacity>
    <TextInput 
    className='flex-1'
    placeholder='search products'/>
    </View>
    </View>
    </>}
  />

   </SafeAreaView>
  )
}

export default productCategory;