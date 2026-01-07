import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Feather, FontAwesome6 } from '@expo/vector-icons';
import { images } from '@/constants/images';
import HorizontalRule from '@/components/HorizontalRule';
import { all_products } from '@/constants/data';
import ProductCard from '@/components/Cards/ProductCard';
import StoreReviews from '@/components/Containers/StoreReviews';


const storeDetails = () => {
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
      data={all_products}
      renderItem={({item})=><ProductCard {...item}/>}
      numColumns={2}
      contentContainerStyle={{paddingBottom:45}}
      columnWrapperStyle={{gap:10,marginBottom:30,paddingHorizontal:10}}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={<>
      {/* the store profile */}
      <View className='w-full'>
      <Image style={{width:'100%',height:180}} source={images.tractor_5}/>
      {/* below is the container for the store details */}
      <View className='bg-white px-5 py-2 mt-[-30px] w-full rounded-tl-3xl rounded-tr-3xl'>
      <View>
      <Text className='font-bold text-lg'>KF Agri tool Suppliers</Text>
      <Text className='text-[#454545] leading-1 text-md'>Dealers in: Water pumps, tractors, Graden tools</Text>
      {/* the store location */}
      <View className='flex flex-row items-center gap-2'>
      <FontAwesome6 color={'#454545'} size={16} name={'location-dot'}/>
      <Text className='text-[#454545] text-sm'>Uganda, Kampala-Ntinda</Text>
      </View>
       {/* the store location */}
      <View className='flex flex-row items-center mt-2 gap-2'>
      <FontAwesome6 color={'#454545'} size={15} name={'phone'}/>
      <Text className='text-[#454545] text-sm'>+256780485440, +25752343191</Text>
      </View>
      {/* store rating */}
      <View className='flex mt-2 flex-row items-center gap-3'>
      <View className='flex flex-row items-center gap-1'>
      <FontAwesome6 color={'#f0bc13'} size={13} name={'star'} solid/>
      <FontAwesome6 color={'#f0bc13'} size={13} name={'star'} solid/>
      <FontAwesome6 color={'#f0bc13'} size={13} name={'star'} solid/>
      <FontAwesome6 color={'#f0bc13'} size={13} name={'star'} solid/>
      <FontAwesome6 color={'#f0bc13'} size={13} name={'star'} solid/>
      </View>
      <Text className='text-sm text-[#454545]'>(223 reviews)</Text>
      </View>
      <HorizontalRule mt={10}/>
      {/* the store description */}
      <View className='pt-2'>
      <Text numberOfLines={5} className='text-[#454545]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, et blanditiis nemo possimus sed ducimus fugiat ratione ipsa, expedita labore excepturi vel veniam, repellat numquam! Illo excepturi iste architecto quasi.</Text>
      </View>
      </View>
      </View>
      <HorizontalRule mt={8}/>
      {/* the store owner details */}
      <View className='w-full px-4'>
      <Text className='font-semibold py-2'>The store owner</Text>
      <View className='w-full flex flex-row justify-between'>

      <View className='flex gap-3 flex-row items-center'>
      <View>
      <Image className='rounded-full' style={{width:40,height:40}} source={images.profile_pic}/>
      </View>
      <View>
      <Text className='font-bold'>Twesigye Fahad</Text>
      <Text numberOfLines={1} className='text-[#454545] leading-none text-sm'>3 stores in total</Text>
      </View>
      </View>
      <View>
      {/* the button */}
      <TouchableOpacity className='bg-green-600 px-3 py-1 rounded-md'>
      <Text className='text-white text-sm'>View profile</Text>
      </TouchableOpacity>
      </View>
      </View>
      </View>
      <HorizontalRule mt={8}/>
      </View>
      {/* the store products */}
      <View className='w-full px-3 py-4 flex flex-row items-center justify-between'>
      <Text className='font-bold text-lg'>Our products</Text>
      {/* the right see all button */}
      <TouchableOpacity onPress={()=>router.push(`/(screens)/store/products/987654`)} className='flex flex-row items-center gap-2'>
      <Text className='text-green-600'>See all</Text>
      <FontAwesome6 size={15} color={'#16a34a'} name={'chevron-right'}/>
      </TouchableOpacity>
      </View>
      </>}
      ListFooterComponent={<>
      <View className='w-full flex px-4 flex-row items-center justify-between'>
      <Text className='font-bold text-lg'>What customers say</Text>
      <TouchableOpacity onPress={()=>router.push(`/(screens)/store/reviews/87654677`)} className='flex flex-row items-center gap-2'>
      <Text className='text-green-600'>See all</Text>
      <FontAwesome6 size={15} color={'#16a34a'} name={'chevron-right'}/>
      </TouchableOpacity>
      </View>
      {/* the summarized reviews */}
      <StoreReviews data={[1,2,3,4]}/>
      </>}
      />

    </SafeAreaView>
  )
}

export default storeDetails;