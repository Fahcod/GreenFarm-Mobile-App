import { View, Text } from 'react-native';
import React from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import HorizontalRule from '../HorizontalRule';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const SellerStatsCards = () => {

  const dashboard_totals = useSelector((state:RootState)=>state.seller);

  return (
    <>
    <View className='w-ful flex flex-row gap-2'>
    
    <View className='w-[32%] flex flex-col items-center h-16 bg-white shadow rounded-md'>
    <View className='bg-primary-300 flex items-center justify-center w-7 h-7 rounded-full mt-2'>
    <FontAwesome6 name={"shop"} color={'#fff'} size={14}/>
    </View>
    <Text className='font-poppins-bold text-xs mt-1'>{dashboard_totals.stores_total} Stores</Text>
    </View>

    <View className='w-[32%] h-16 flex flex-col items-center bg-white shadow rounded-md'>
    <View className='bg-blue-500 flex items-center justify-center w-7 h-7 rounded-full mt-2'>
    <FontAwesome6 name={"cart-shopping"} color={'#fff'} size={14}/>
    </View>
    <Text className='font-poppins-bold text-xs mt-1'>
    {dashboard_totals.store_products_total} Products</Text>
    </View>

    <View className='w-[32%] flex flex-col items-center h-16 bg-white shadow rounded-md'>
    <View className='bg-red-500 flex items-center justify-center w-7 h-7 rounded-full mt-2'>
    <FontAwesome6 name={"bell"} color={'#fff'} size={14} solid/>
    </View>
    <Text className='font-poppins-bold text-xs mt-1'>0 New alerts</Text>
    </View>
    
    </View>
    <HorizontalRule mt={8} bg={'#f0f1f3'}/>
    </>
  )
}

export default SellerStatsCards;