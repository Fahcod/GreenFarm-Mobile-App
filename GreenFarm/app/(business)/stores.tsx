import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router'
import EmptyStores from '@/components/EmptyComponents/EmptyStores';
import { AppContext } from '@/context/AppContext';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import type { Store } from '@/types/types';
import SellerStoreCard from '@/components/Cards/SellerStoreCard';

const stores = () => {

  // fetch the stores
  const {fetchBusinessSores} = useContext(AppContext);

  useEffect(()=>{
  fetchBusinessSores()
  },[])

  // get the store data from redux
  const business_stores:Store[] = useSelector((state:RootState)=>state.stores.business_stores);

  return (
    <SafeAreaView edges={["top","left","right"]} className='bg-white flex-1'>
    {/* the header */}
    <View className='w-full h-[60px] p-3 border-solid border-b border-gray-100 flex flex-row z-[1000] bg-white items-center justify-between'>
    <View className='flex flex-row items-center gap-3'>
    <View className='w-[34px] items-center justify-center h-[34px] bg-[#efefef] rounded-full'>
    <FontAwesome6 size={18} name={'shop'}/>
    </View>
    <Text className='font-poppins-bold text-xl'>Stores</Text>
    </View>

    {/* the right button */}
    <TouchableOpacity className='w-[34px] flex items-center justify-center h-[34px] bg-[#efefef] rounded-full'>
    <Feather name={'menu'} size={20}/>
    </TouchableOpacity>
    </View>
    {/* this is the end of the header, the next is the list of stores */}

    <FlatList
    data={business_stores}
    ListEmptyComponent={<EmptyStores/>}
    contentContainerStyle={{paddingHorizontal:10,paddingVertical:20}}
    ListHeaderComponent={<>
    <View className='w-full flex justify-between flex-row items-center'>
    <Text className='font-poppins-bold text-lg'>My stores</Text>

    <TouchableOpacity onPress={()=>router.push('/(screens)/store/create/create_store')} 
    className='flex flex-row items-center gap-2'>
    <FontAwesome6 color={'#16a34a'} name={'plus'} size={17}/>
    <Text className='font-poppins pt-0.5 text-green-600'>Create new store</Text>
    </TouchableOpacity>
    </View>
    </>}
    renderItem={({item})=><SellerStoreCard {...item}/>}
    />
    
    </SafeAreaView>
  )
}

export default stores;