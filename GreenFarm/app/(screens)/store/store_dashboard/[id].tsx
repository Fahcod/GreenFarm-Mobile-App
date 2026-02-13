import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome6 } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Store } from '@/types/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import HorizontalRule from '@/components/HorizontalRule';
import { AppContext } from '@/context/AppContext';
import SellerProductCard from '@/components/Cards/SellerProductCard';
import StoreReviews from '@/components/Containers/StoreReviews';
import EmptyStores from '@/components/EmptyComponents/EmptyStores';

const store_dashboard = () => {

  const {id} = useLocalSearchParams();

  // get the store data from redux
   const {fetchStoreProducts,fetchStoreTotals} = useContext(AppContext);

   useEffect(()=>{
       fetchStoreProducts(id,0,5);
       fetchStoreTotals(id)
     },[]);

  const business_stores:Store[] = useSelector((state:RootState)=>state.stores.business_stores);
  const selectedStore = business_stores.find((e)=>e._id === id);
  const store_products = useSelector((state:RootState)=>state.products.store_products);
  const store_totals = useSelector((state:RootState)=>state.seller);

  return (
    <SafeAreaView className='bg-input flex-1'>
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
    data={store_products}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{paddingHorizontal:10,paddingVertical:20}}
    renderItem={({item})=><SellerProductCard {...item}/>}
    ListEmptyComponent={<EmptyStores/>}
    ListHeaderComponent={<>

    {/* the store dashboard */}
    <View className='w-full bg-white p-3 border-solid border border-gray-100 rounded-md'>
    {/* the store information */}
    <View className='w-full flex flex-row gap-3'>
    <Image className='bg-[#efefef]' source={{uri:selectedStore?.store_profile}} style={{width:65,height:65,borderRadius:6}}/>
    <View className='flex-1'>
    <Text numberOfLines={1} className='font-poppins-bold text-sm'>{selectedStore?.name}</Text>
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
    {/* the store location */}
    <View className='flex flex-row gap-1 items-center'>
    <FontAwesome6 color={'#454545'} size={13} name={'location-dot'}/>
    <Text className='font-poppins text-[#454545] text-xs'>
    {selectedStore?.location.country},{selectedStore?.location.city}</Text>
    </View>

    </View>
    </View>
    </View>
    {/* the store stats cards */}
    <View className='w-full flex flex-wrap flex-row gap-3 mt-4'>

    {/* the total products */}
    <View className='bg-white px-3 pt-2 w-[48%] rounded-md'>
    <View className='w-full flex flex-row justify-between'>
    <Text className='font-poppins-semibold'>Products</Text>
    <View className='w-8 flex items-center justify-center h-8 rounded-full bg-primary-300'>
    <FontAwesome6 color={'#fff'} size={15} name={'shop'}/>
    </View>
    </View>
    <Text className='font-poppins-bold'>{store_totals.store_products_total}</Text>
    </View>

    {/* the total products */}
    <View className='bg-white px-3 pt-2 w-[48%] rounded-md'>
    <View className='w-full flex flex-row justify-between'>
    <Text className='font-poppins-semibold'>Reviews</Text>
    <View className='w-8 flex items-center justify-center h-8 rounded-full bg-[#eebe22]'>
    <FontAwesome6 color={'#fff'} size={15} name={'star'} solid/>
    </View>
    </View>
    <Text className='font-poppins-bold'>{store_totals.store_reviews_total}</Text>
    </View>

    </View>

    <View className='w-full mt-4 flex flex-row gap-2'>
    
    <TouchableOpacity 
    onPress={()=>router.push(`/(screens)/store/products/add_product/${selectedStore?._id}`)}
    className='w-[48%] px-3 py-2 flex flex-row items-center gap-2 bg-blue-500 rounded-md'>
    <FontAwesome6 color={'#fff'} size={17} name={"cart-shopping"} solid/>
    <Text className='font-poppins text-sm text-white'>Add product</Text>
    </TouchableOpacity>

    <TouchableOpacity 
     onPress={()=>router.push(`/(screens)/store/edit_store/${selectedStore?._id}`)}
    className='w-[48%] px-3 py-2 flex flex-row items-center gap-2 bg-primary-300 rounded-md'>
    <FontAwesome6 color={'#fff'} size={17} name={"shop"} solid/>
    <Text className='font-poppins text-sm text-white'>Edit store</Text>
    </TouchableOpacity>

    </View>
    <HorizontalRule mt={15} bg={'#e5e7eb'}/>

    {/* the products list header */}
    <View className='w-full flex flex-row mt-3 items-center justify-between'>
    <Text className='font-bold text-lg'>Store products</Text>
    <TouchableOpacity className='flex flex-row items-center gap-2'>
    <Text className='text-blue-500 font-poppins'>See more</Text>
    <FontAwesome6 size={16} color={'#3b82f6'} name={'chevron-right'}/>
    </TouchableOpacity>
    </View>
    </>}
    ListFooterComponent={
    <>
    <View className='w-full flex mt-3 flex-row items-center justify-between'>
    <Text className='font-poppins-bold text-md'>What customers say</Text>
    <TouchableOpacity onPress={()=>router.push(`/(screens)/store/reviews/87654677`)} 
    className='flex flex-row items-center gap-2'>
    <Text className='text-green-600 font-poppins'>See all</Text>
    <FontAwesome6 size={15} color={'#16a34a'} name={'chevron-right'}/>
    </TouchableOpacity>
    </View>
    {/* the summarized reviews */}
    <StoreReviews data={[1,2,3]}/>
    </>}
    />
    </SafeAreaView>
  )
}

export default store_dashboard;
