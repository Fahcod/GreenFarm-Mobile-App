import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome6 } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { all_products } from '@/constants/data';
import { images } from '@/constants/images';
import { Store } from '@/types/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';


const store_dashboard = () => {

  const {id} = useLocalSearchParams();

  // get the store data from redux
  const business_stores:Store[] = useSelector((state:RootState)=>state.stores.business_stores);
  const selectedStore = business_stores.find((e)=>e._id === id);

  return (
    <SafeAreaView className='bg-white flex-1'>
    {/* the custom header */}
    <View className='w-full h-[60px] p-3 flex flex-row items-center justify-between z-[1000] bg-white border-solid border-b border-gray-100'>
    <TouchableOpacity onPress={()=>router.back()}>
    <FontAwesome6 name={'arrow-left'} size={22}/>
    </TouchableOpacity>

    {/* the store name */}
    <Text className='font-poppins-bold'>Store dashboard</Text>
  
    <TouchableOpacity>
    <FontAwesome6 name={'ellipsis-vertical'} size={20}/>
    </TouchableOpacity>
    </View>
    {/* the end of the header */}

    <FlatList
    data={all_products}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{paddingHorizontal:10,paddingVertical:20}}
    renderItem={({item})=>(
    <View className='w-full bg-white mt-5 p-2 rounded-md shadow-md flex flex-row gap-3'>
    <Image className='rounded-md' style={{width:80,height:80}} source={item.images[0]}/>
    <View className='flex-1'>
    <Text numberOfLines={1} className='font-bold'>{item.title}</Text>
    <Text className='text-xs text-[#454545]' numberOfLines={1}>UGX {item.price}</Text>
    {/* the store rating */}
    <Text className='text-[#454545] text-sm' numberOfLines={1}>{item.description}</Text>
    {/* the view store button */}
    <View className='w-full flex flex-row gap-3 pt-2'>

    <TouchableOpacity onPress={()=>router.push(`/(screens)/store/store_dashboard/87656` as any)} className='bg-primary-300 px-2 py-0.5 rounded-md'>
    <Text className='text-xs text-white'>View product</Text>
    </TouchableOpacity>

    <TouchableOpacity className='bg-[#efefef] px-2 py-0.5 rounded-md'>
    <Text className='text-xs'>Edit product</Text>
    </TouchableOpacity>

    </View>
    </View>
    </View>
    )}
    ListHeaderComponent={<>
    {/* the store dashboard */}
    <View className='w-full bg-white p-3 border-solid border border-gray-100 rounded-md'>
    {/* the store information */}
    <View className='w-full flex flex-row gap-3'>
    <Image source={images.machiney_item} style={{width:65,height:65,borderRadius:6}}/>
    <View className='flex-1'>
    <Text className='font-poppins-bold'>{selectedStore?.name}</Text>
    <Text className='text-xs leading-none font-poppins text-[#454545]' numberOfLines={1}>
        {selectedStore?.dealing_in.map((item)=>{
          return item + ", "
        })}
        </Text>
    {/* the product rating */}
    <View className='flex flex-row gap-3 items-center'>
    <View className='flex flex-row gap-1'>
     <FontAwesome6 color={'#f0bc13'} size={9} name={'star'} solid/>
     <FontAwesome6 color={'#f0bc13'} size={9} name={'star'} solid/>
     <FontAwesome6 color={'#f0bc13'} size={9} name={'star'} solid/>
     <FontAwesome6 color={'#f0bc13'} size={9} name={'star'} solid/>
     <FontAwesome6 color={'#f0bc13'} size={9} name={'star'} solid/>
    </View>
    <Text className='text-[#454545] text-sm'>({selectedStore?.reviewsCount} reviews)</Text>
    </View>

    </View>
    </View>
    
    </View>
    {/* the store stats cards */}
    <View className='w-full flex flex-wrap flex-row gap-3 mt-4'>
    {/* the total products */}
    <View className='bg-green-50 p-3 w-[48%] h-16 rounded-md shadow-md'>
    <Text className='font-semibold'>67</Text>
    <View className='flex flex-row items-center gap-2'>
    <FontAwesome6 size={14} color={'#16a34a'} name={'shop'}/>
    <Text className='font-semibold text-sm text-primary-300'>Total proucts</Text>
    </View>
    </View>

    {/* the store rating */}
    <View className='bg-orange-50 p-3 w-[48%] h-16 rounded-md shadow-md'>
    <Text className='font-semibold'>237k</Text>
    <View className='flex flex-row items-center gap-2'>
    <FontAwesome6 size={14} color={'#f0bc13'} name={'star'} solid/>
    <Text className='font-semibold text-sm text-[#f0bc13]'>Total reviews</Text>
    </View>
    </View>

    </View>

    {/* the products list header */}
    <View className='w-full flex flex-row mt-6 items-center justify-between'>
    <Text className='font-bold text-lg'>Store products</Text>
    <TouchableOpacity onPress={()=>router.push(`/(screens)/store/products/add_product/${selectedStore?._id}`)} 
    className='flex flex-row items-center gap-2'>
    <FontAwesome6 size={18} color={'#3b82f6'} name={'plus'}/>
    <Text className='text-blue-500 font-semibold'>Add a product</Text>
    </TouchableOpacity>
    </View>
    </>}
    />

    </SafeAreaView>
  )
}

export default store_dashboard;