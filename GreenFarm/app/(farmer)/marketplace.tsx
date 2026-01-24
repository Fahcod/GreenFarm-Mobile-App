import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainHeader from '@/components/MainHeader';
import Categories from '@/components/Containers/Categories';
import SuggestedStores from '@/components/Containers/SuggestedStores';
import { all_products } from '@/constants/data';
import ProductCard from '@/components/Cards/ProductCard';
import EmptyProducts from '@/components/EmptyComponents/EmptyProducts';


const marketplace = () => {
  return (
    <SafeAreaView edges={["top","right","left"]} className='flex-1 bg-white'>
    <MainHeader/>
    <FlatList
    data={[]}
    renderItem={({item})=><ProductCard props={item}/>}
    showsVerticalScrollIndicator={false}
    ListEmptyComponent={<EmptyProducts/>}
    numColumns={2}
    contentContainerStyle={{paddingHorizontal:12,paddingBottom:35}}
    columnWrapperStyle={{gap:10,marginBottom:15}}
    ListHeaderComponent={<>
    <Categories/>
    <SuggestedStores/>
    {/* the header for the products */}
    <View className='w-full flex flex-row my-6 items-center justify-between'>
    <Text className='font-bold text-lg'>Suggested products</Text>
    <TouchableOpacity>
    <Text className='text-blue-500'>see more</Text>
    </TouchableOpacity>
    </View>
    </>}

    />
    </SafeAreaView>
  )
}

export default marketplace;