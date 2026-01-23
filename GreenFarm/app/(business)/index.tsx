import { View, Text, Image, TouchableOpacity, SectionList, Pressable } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants/images';
import { Feather, FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';

const index = () => {

  const SECTIONS = [
    {type:'stats',data:[1]}
  ];

  const renderItem = ({section}:{section:{type:string,data:number[]}})=>{
      switch(section.type){

        case "stats":
          return (
           <View className='w-full flex flex-wrap flex-row gap-3 mt-4'>
           {/* the total products */}
           <View className='bg-green-50 p-3 w-[48%] h-16 rounded-md shadow-md'>
           <Text className='font-semibold'>1</Text>
           <View className='flex flex-row items-center gap-2'>
           <FontAwesome6 size={14} color={'#16a34a'} name={'shop'}/>
           <Text className='font-semibold text-sm text-primary-300'>Total stores</Text>
           </View>
           </View>
       
           {/* the total categories */}
           <View className='bg-blue-50 p-3 w-[48%] h-16 rounded-md shadow-md'>
           <Text className='font-semibold'>273</Text>
           <View className='flex flex-row items-center gap-2'>
           <FontAwesome6 size={14} color={'#2563eb'} name={'cart-shopping'}/>
           <Text className='font-semibold text-sm text-blue-600'>Total products</Text>
           </View>
           </View>
       
           {/* the store rating */}
           <View className='bg-orange-50 p-3 w-[48%] h-16 rounded-md shadow-md'>
           <Text className='font-semibold'>1.2M</Text>
           <View className='flex flex-row items-center gap-2'>
           <FontAwesome6 size={14} color={'#f0bc13'} name={'star'} solid/>
           <Text className='font-semibold text-sm text-[#f0bc13]'>Total reviews</Text>
           </View>
           </View>
       
           {/* the store rating */}
           <View className='bg-red-50 p-3 w-[48%] h-16 rounded-md shadow-md'>
           <Text className='font-semibold'>110</Text>
           <View className='flex flex-row items-center gap-2'>
           <FontAwesome6 size={14} color={'#dc2626'} name={'triangle-exclamation'} solid/>
           <Text className='font-semibold text-sm text-red-600'>Alerts</Text>
           </View>
           </View>
       
           </View>
          );

          default:
            return <></>
      }
  }

  return (
    <SafeAreaView edges={["top","left","right"]} className='bg-white flex-1'>
    {/* the header */}
    <View className='w-full h-[60px] p-3 border-solid border-b border-gray-100 flex flex-row z-[1000] bg-white items-center justify-between'>
    {/* owner details */}
    <Pressable onPress={()=>router.push('/(screens)/business_profile')} className='flex flex-row gap-3'>
    <Image className='rounded-full' source={images.profile_pic} style={{width:34,height:34}}/>
    <View>
    <Text className='font-bold'>Hi, Fahad</Text>
    <Text className='text-[#454545] text-xs'>You are welcome</Text>
    </View>
    </Pressable>

    {/* the right button */}
    <TouchableOpacity className='w-[34px] flex items-center justify-center h-[34px] bg-[#efefef] rounded-full'>
    <Feather name={'menu'} size={20}/>
    </TouchableOpacity>
    </View>
    {/* END OF THE HEADER */}

    <SectionList
     sections={SECTIONS}
     renderItem={renderItem}
     contentContainerStyle={{paddingHorizontal:10,paddingTop:10,paddingBottom:20}}
    />
    
    </SafeAreaView>
  )
}

export default index;