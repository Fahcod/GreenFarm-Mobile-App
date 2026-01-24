import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { Feather, FontAwesome6 } from '@expo/vector-icons'
import ProductCard from '@/components/Cards/ProductCard'
import { CATEGORIES_LIST } from '@/constants/categories'
import HorizontalRule from '@/components/HorizontalRule'
import EmptyProducts from '@/components/EmptyComponents/EmptyProducts'

const allProducts = () => {
  return (
    <SafeAreaView className='flex-1 bg-white'>
    {/* the custom header */}
    <View className='w-full p-3 h-[60px] flex flex-row items-center justify-between z-[1000] border-solid border-b border-gray-100'>
    <TouchableOpacity onPress={()=>router.back()}>
    <FontAwesome6 size={20} name="arrow-left"/>
    </TouchableOpacity>
    <Text className='font-bold text-lg'>All products</Text>
    <TouchableOpacity>
    <FontAwesome6 size={20} name="ellipsis-vertical"/>
    </TouchableOpacity>
    </View>
    {/* end of the header */}
    <FlatList
    data={[]}
    renderItem={({item})=><ProductCard props={item}/>}
    numColumns={2}
    showsVerticalScrollIndicator={false}
    ListEmptyComponent={<EmptyProducts/>}
    columnWrapperStyle={{gap:10,marginBottom:15}}
    contentContainerStyle={{
        paddingHorizontal:10,
        paddingTop:10,
        paddingBottom:35,
    }}
    ListHeaderComponent={<>
    <View className='w-full'>
    {/* the search box */}
    <View className='w-full mt-3 px-3 bg-[#efefef] rounded-md flex gap-4 flex-row items-center'>
    <TouchableOpacity>
    <Feather size={18} color={'#454545'} name={'search'}/>
    </TouchableOpacity>
    <TextInput 
    className='flex-1'
    placeholder='search products'/>
    </View>
    <HorizontalRule mt={10}/>
     {/* the container for the categories */}
      <View className='w-full flex flex-row gap-3 mt-2 flex-wrap'>
        {CATEGORIES_LIST.map((item,index)=>{
          return (
            <TouchableOpacity className='bg-[#efefef] rounded-md px-2 py-2' key={index}>
            <Text className='text-sm'>{item}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
      <HorizontalRule mt={10} mb={10}/>
    </View>
    </>}
      />
    </SafeAreaView>
  )
}

export default allProducts