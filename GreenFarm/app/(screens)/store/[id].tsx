import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Feather, FontAwesome6 } from '@expo/vector-icons';
import { images } from '@/constants/images';
import HorizontalRule from '@/components/HorizontalRule';
import ProductCard from '@/components/Cards/ProductCard';
import StoreReviews from '@/components/Containers/StoreReviews';
import { AppContext } from '@/context/AppContext';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import EmptyProducts from '@/components/EmptyComponents/EmptyProducts';


const storeDetails = () => {

  const {id} = useLocalSearchParams();
  const {fetchStoreData,fetchStoreProducts} = useContext(AppContext);

  useEffect(()=>{
    fetchStoreData(id);
    fetchStoreProducts(id,0,5)
  },[]);

  // get the data from the store
  const store_data = useSelector((state:RootState)=>state.stores.store_data);
  const store_products = useSelector((state:RootState)=>state.products.store_products);

  return (
    <SafeAreaView className='flex-1 bg-white'>
    {/* the custome header */}
    <View className='w-full flex p-3 flex-row items-center justify-between h-[60px] z-[1000] border-solid border-b border-gray-100'>
    <TouchableOpacity onPress={()=>router.back()}>
    <FontAwesome6 size={22} name={"arrow-left"}/>
    </TouchableOpacity>
  
     <View className='flex flex-row items-center gap-6'>
  
     <TouchableOpacity>
     <Feather size={22} name={"search"}/>
     </TouchableOpacity>
  
     <TouchableOpacity>
     <Feather size={22} name={"bell"}/>
     </TouchableOpacity>
  
     <TouchableOpacity>
     <FontAwesome6 size={22} name={"ellipsis-vertical"}/>
     </TouchableOpacity>
  
     </View>
     </View>
      {/* END OF THE CUSTOM HEADER, the store info */}

      <FlatList
      data={store_products}
      renderItem={({item})=><ProductCard {...item}/>}
      numColumns={2}
      ListEmptyComponent={<EmptyProducts/>}
      contentContainerStyle={{paddingBottom:25}}
      columnWrapperStyle={{gap:10,marginBottom:20,paddingHorizontal:10}}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={<>
      {/* the store profile */}
      <View className='w-full'>
      <Image style={{width:'100%',height:180}} source={images.tractor_5}/>
      {/* below is the container for the store details */}
      <View className='bg-white px-5 py-2 mt-[-30px] w-full rounded-tl-3xl rounded-tr-3xl'>
      <View>
      <Text className='font-poppins-bold text-lg'>{store_data?.name}</Text>
      <Text numberOfLines={1} className='font-poppins text-[#454545] text-sm'>
      Dealers in: {
        store_data?.dealing_in.map((item)=>{
          return item + ", "
        })
      }
      </Text>
      <HorizontalRule mt={10}/>
      {/* the store location */}
      <View className='flex flex-row items-center mt-3 gap-2'>
      <FontAwesome6 color={'#454545'} size={16} name={'location-dot'}/>
      <Text className='text-[#454545] font-poppins text-sm'>
      {store_data?.location.country + ","
      + store_data?.location.city}
      </Text>
      </View>
       {/* the store location */}
      <View className='flex flex-row items-center mt-2 gap-2'>
      <FontAwesome6 color={'#454545'} size={15} name={'phone'}/>
      <Text className='text-[#454545] font-poppins text-sm'>
       {store_data?.store_contacts.map((item)=>{
      return item + ", "
      })}
      </Text>
      </View>
      {/* store rating */}
      <View className='flex mt-2 flex-row items-center gap-3'>
      <View className='flex flex-row items-center gap-1'>
      <FontAwesome6 color={'#f0bc13'} size={11} name={'star'} solid/>
      <FontAwesome6 color={'#f0bc13'} size={11} name={'star'} solid/>
      <FontAwesome6 color={'#f0bc13'} size={11} name={'star'} solid/>
      <FontAwesome6 color={'#f0bc13'} size={11} name={'star'} solid/>
      <FontAwesome6 color={'#f0bc13'} size={11} name={'star'} solid/>
      </View>
      <Text className='text-xs font-poppins text-[#454545]'>(223 reviews)</Text>
      </View>
      <HorizontalRule mt={10}/>
      {/* the store description */}
      <View className='pt-2'>
      <Text numberOfLines={5} className='text-[#454545] text-sm font-poppins'>
      {store_data?.description}
      </Text>
      </View>
      </View>
      </View>
      <HorizontalRule mt={8}/>
      {/* the store owner details */}
      <View className='w-full px-4'>
      <View className='flex flex-row items-center gap-3'>
      <Text className='font-poppins-semibold py-2'>The store owner</Text>
      <Text className='font-poppins text-[#454545] text-xs'>(Tap to view profile)</Text>
      </View>
      {/* the container for the store owner details */}
      <View className='flex gap-3 flex-row items-center'>
      <View>
      <Image className='rounded-full' style={{width:40,height:40}} source={images.profile_pic}/>
      </View>
      <View>
      <Text className='font-poppins-bold text-md text-[#303030]'>{store_data?.owner.name}</Text>
      <View className='flex flex-row items-center gap-2'>
      <FontAwesome6 size={13} color={'#16a34a'} name={"circle-check"}/>
      <Text className='font-poppins leading-none text-sm text-[#454545]'>Business account</Text>
      </View>
      </View>
      </View>
      </View>
      <HorizontalRule mt={8}/>
      </View>
      {/* the store products */}
      <View className='w-full px-3 py-4 flex flex-row items-center justify-between'>
      <Text className='font-poppins-bold text-md'>Our products</Text>
      {/* the right see all button */}
      <TouchableOpacity onPress={()=>router.push(`/(screens)/store/products/987654`)} 
      className='flex flex-row items-center gap-2'>
      <Text className='text-green-600 font-poppins'>See all</Text>
      <FontAwesome6 size={15} color={'#16a34a'} name={'chevron-right'}/>
      </TouchableOpacity>
      </View>
      </>}
      ListFooterComponent={<>
      <View className='w-full flex px-4 flex-row items-center justify-between'>
      <Text className='font-poppins-bold text-md'>What customers say</Text>
      <TouchableOpacity onPress={()=>router.push(`/(screens)/store/reviews/87654677`)} 
      className='flex flex-row items-center gap-2'>
      <Text className='text-green-600 font-poppins'>See all</Text>
      <FontAwesome6 size={15} color={'#16a34a'} name={'chevron-right'}/>
      </TouchableOpacity>
      </View>
      {/* the summarized reviews */}
      <StoreReviews data={[1,2,3,4]}/>
      {/* the option to rate the store */}
      <HorizontalRule mt={20}/>
      <View className='w-full mt-6 flex flex-row justify-center'>
      <TouchableOpacity 
      onPress={()=>router.push(`/(screens)/store/reviews/add_review/${store_data?._id}`)} 
      className='flex bg-primary-300 px-6 py-2 rounded-md flex-row items-center gap-3'>
      <FontAwesome6 name={'star'} color={'#fff'} size={19}/>
      <Text className='font-poppins text-white'>Add a review</Text>
      </TouchableOpacity>
      </View>
      </>}
      />

    </SafeAreaView>
  )
}

export default storeDetails;