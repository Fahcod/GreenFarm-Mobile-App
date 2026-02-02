import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import React, { useContext, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Feather, FontAwesome6 } from '@expo/vector-icons';
import { images } from '@/constants/images';
import HorizontalRule from '@/components/HorizontalRule';
import ProductCard from '@/components/Cards/ProductCard';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { AppContext } from '@/context/AppContext';


const productDetails = () => {

   const suggested_products = useSelector((state:RootState)=>state.products.suggested_products)
   const {id} = useLocalSearchParams();
   const {fetchProductData} = useContext(AppContext);
   const product_data = useSelector((state:RootState)=>state.products.product_data)

  // fetch the product data
  useEffect(()=>{
  fetchProductData(id)
  },[])

  return (
   <SafeAreaView className='bg-white flex-1'>
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
    {/* END OF THE CUSTOM HEADER, the product image */}
    <FlatList
    data={suggested_products}
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
    {/* the product main image */}
    <View className='w-full'>
    <Image resizeMode='cover' className='rounded-md' style={{width:'100%',height:190}} 
    source={{uri:product_data?.images[0]}}/>
    </View>
    {/* the product images */}
    <View className='w-full flex gap-3 flex-row pt-2'>
    {product_data?.images.map((item,index)=>{
      return(
        <Image key={index} className='rounded-md' 
        source={{uri:item}} style={{width:65,height:65}}/>
      )
    })}
    </View>
    {/* the product details */}
    <View className='w-full pt-3'>
    <Text className='font-poppins-bold text-lg'>{product_data?.title}</Text>
    {/* the product rating */}
    <View className='flex flex-row gap-3 items-center'>
    <View className='flex flex-row gap-1'>
     <FontAwesome6 color={'#f0bc13'} size={12} name={'star'} solid/>
     <FontAwesome6 color={'#f0bc13'} size={12} name={'star'} solid/>
     <FontAwesome6 color={'#f0bc13'} size={12} name={'star'} solid/>
     <FontAwesome6 color={'#f0bc13'} size={12} name={'star'} solid/>
     <FontAwesome6 color={'#f0bc13'} size={12} name={'star'} solid/>
    </View>
    <Text className='text-[#454545] text-xs font-poppins'>(234 reviews)</Text>
    </View>
    <View className='w-full gap-4 pt-2 flex flex-row items-center'>
    <Text className='font-poppins-bold text-2xl'>UGX {product_data?.price}</Text>
    <Text className='text-[#454545] font-poppins'>({product_data?.category})</Text>
    </View>
    <HorizontalRule mt={14}/>
    {/* the product description */}
   <View>
    <Text className='pt-2 font-poppins-medium text-lg text-[#454545]'>Description</Text>
    <Text className='text-[#454545] text-sm font-poppins pt-1'>
    {product_data?.description}
    </Text>
   </View>
    <HorizontalRule mt={14}/>
    <View className='w-full flex mt-4 flex-row gap-2'>
    
    <TouchableOpacity className='w-[48%] px-3 py-3 rounded-md bg-green-600 gap-2 flex-row items-center'>
    <FontAwesome6 size={16} color={'#fff'} name={'cart-shopping'} solid/>
    <Text className='text-white font-poppins text-sm'>Buy this now</Text>
    </TouchableOpacity>

    <TouchableOpacity className='w-[48%] px-3 py-3 rounded-md bg-green-600 gap-2 flex-row items-center'>
    <FontAwesome6 size={16} color={'#fff'} name={'message'} solid/>
    <Text className='text-white font-poppins text-sm'>Message seller</Text>
    </TouchableOpacity>

    </View>
    <HorizontalRule mt={14}/>
    {/* end of the product details, the store information */}
    <View className='w-full mt-4'>
    <View className='w-full flex flex-row  items-center justify-between'>
    <Text className='font-poppins-medium text-lg'>Seller's store</Text>
    <TouchableOpacity onPress={()=>router.push(`/(screens)/store/${product_data?.store._id}`)}>
    <Text className='text-blue-500 poppins text-sm'>Visit store</Text>
    </TouchableOpacity>
    </View>
    {/* store information */}
    <View className='w-full mt-2 flex flex-row gap-3'>
    <Image className='rounded-md' style={{width:90,height:90}} source={images.machiney_item}/>
    <View className='flex-1'>
    <Text className='font-poppins-bold text-md'>{product_data?.store.name}</Text>
    <Text className='text-xs font-poppins text-[#454545]' numberOfLines={1}>
    {product_data?.store?.dealing_in.map((item)=>{return item + ", "})}
    </Text>
    {/* store location */}
    <View className='flex flex-row gap-2 items-center'>
    <FontAwesome6 color={'#454545'} size={11} name={'location-dot'}/>
    <Text className='text-[#454545] text-sm'>{
    product_data?.store.location.country + ","
    + product_data?.store.location.city
      }</Text>
    </View>
    {/* store contacts */}
    <View className='flex pt-1 flex-row items-center gap-2'>
     <FontAwesome6 color={'#454545'} size={11} name={'phone'}/>
    <Text className='text-xs font-poppins'>
    {product_data?.store.store_contacts.map((item)=>{
      return item + ", "
    })}
    </Text>
    </View>
    </View>
    </View>

    </View>
    <HorizontalRule mt={14}/>
    {/* the title for the next related products container */}
    <View className='my-4'>
    <Text className='font-bold text-xl'>Related products</Text>
    </View>
    </View>
    </>}
    />

    </SafeAreaView>
  )
}

export default productDetails;