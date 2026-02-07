import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, FontAwesome6 } from '@expo/vector-icons';
import { images } from '@/constants/images';
import { router } from 'expo-router'
import EmptyStores from '@/components/EmptyComponents/EmptyStores';
import { AppContext } from '@/context/AppContext';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import type { Store } from '@/types/types';

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
    renderItem={({item})=>(
    <View className='w-full flex border-solid border-gray-100 border bg-white rounded-md flex-row gap-3 p-2 mt-4'>
    <Image className='rounded-md' style={{width:80,height:80}} source={images.article_7}/>
    {/* the store details */}
    <View className='flex-1'>
    <Text numberOfLines={1} className='font-poppins-bold text-md'>{item.name}</Text>

    <Text className='text-xs leading-none font-poppins text-[#454545]' numberOfLines={1}>
    {item.dealing_in.map((item)=>{
      return item + ", "
    })}
    </Text>
    {/* the store rating */}
    <View className='flex flex-row items-center gap-2'>
    <View className='flex flex-row gap-1'>
    <FontAwesome6 color={'#f0bc13'} size={10} name={'star'} solid/>
    <FontAwesome6 color={'#f0bc13'} size={10} name={'star'} solid/>
    <FontAwesome6 color={'#f0bc13'} size={10} name={'star'} solid/>
    <FontAwesome6 color={'#f0bc13'} size={10} name={'star'} solid/>
    <FontAwesome6 color={'#f0bc13'} size={10} name={'star'} solid/>
    </View>
    <Text className='text-xs font-poppins'>({item.reviewsCount} reviews)</Text>
    </View>
    {/* the view store button */}
    <View className='w-full flex flex-row gap-3 pt-2'>

    <TouchableOpacity onPress={()=>router.push(`/(screens)/store/store_dashboard/${item._id}` as any)} className='bg-primary-300 px-2 py-0.5 rounded-md'>
    <Text className='text-xs font-poppins text-white'>View store</Text>
    </TouchableOpacity>

    <TouchableOpacity className='bg-[#efefef] px-2 py-0.5 rounded-md'>
    <Text className='text-xs font-poppins'>Edit store</Text>
    </TouchableOpacity>

    </View>
    </View>
    </View>
    )}
    />
    
    </SafeAreaView>
  )
}

export default stores;