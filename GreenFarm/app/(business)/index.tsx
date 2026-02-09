import { View, Text, Image, TouchableOpacity, SectionList, Pressable } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants/images';
import { Feather, FontAwesome6} from '@expo/vector-icons';
import { router } from 'expo-router';
import SellerStatsCards from '@/components/Containers/SellerStatsCards';
import HorizontalRule from '@/components/HorizontalRule';
import AdvertsContainer from '@/components/Containers/AdvertsContainer';
import SellerStoresContainer from '@/components/Containers/SellerStoresContainer';
import { AppContext } from '@/context/AppContext';

const index = () => {

  // fetch the dashboard data
  const {fetchSellerDashboardData} = useContext(AppContext);
  useEffect(()=>{
    fetchSellerDashboardData()
  },[])

  const SECTIONS = [
    {type:'stats',data:[1]},
    {type:'actions',data:[1]},
    {type:'banner',data:[1]},
    {type:'mystores',data:[1]}
  ];

  const renderItem = ({section}:{section:{type:string,data:number[]}})=>{
      switch(section.type){

         case "stats":
          return <SellerStatsCards/>

         case "actions":
          return(
            <>
            <View className='w-full mt-4 flex flex-row gap-2'>

            <TouchableOpacity className='w-[48%] px-3 py-2 flex flex-row items-center gap-2 bg-blue-500 rounded-md'>
            <FontAwesome6 color={'#fff'} size={17} name={"cart-shopping"} solid/>
            <Text className='font-poppins text-sm text-white'>Add product</Text>
            </TouchableOpacity>

            <TouchableOpacity className='w-[48%] px-3 py-2 flex flex-row items-center gap-2 bg-primary-300 rounded-md'>
            <FontAwesome6 color={'#fff'} size={17} name={"shop"} solid/>
            <Text className='font-poppins text-sm text-white'>Create store</Text>
            </TouchableOpacity>

            </View>
            <HorizontalRule mt={10} bg={'#e5e7eb'}/>
            </>);

        case "banner":
           return (<>
           <AdvertsContainer/>
           <HorizontalRule mt={10} bg={'#e5e7eb'}/>
        </>);

        case "mystores":
          return(<>
            <SellerStoresContainer/>
            <HorizontalRule mt={10} bg={'#e5e7eb'}/>
          </>)

          default:
            return <></>
      }
  }

  return (
    <SafeAreaView edges={["top","left","right"]} className='bg-input flex-1'>
    {/* the header */}
    <View className='w-full h-[60px] p-3 border-solid border-b border-gray-50 flex flex-row z-[1000] bg-white items-center justify-between'>
    {/* owner details */}
    <Pressable onPress={()=>router.push('/(screens)/business_profile')} className='flex flex-row gap-3'>
    <Image className='rounded-full' source={images.profile_pic} style={{width:34,height:34}}/>
    <View>
    <Text className='font-bold'>Hi, Fahad</Text>
    <Text className='text-[#454545] text-xs'>You are welcome</Text>
    </View>
    </Pressable>

    {/* the right button */}
    <TouchableOpacity onPress={()=>router.push('/(auth)/role_selecion')} 
    className='w-[34px] flex items-center justify-center h-[34px] bg-[#efefef] rounded-full'>
    <Feather name={'menu'} size={20}/>
    </TouchableOpacity>
    </View>
    {/* END OF THE HEADER */}

    <SectionList
     sections={SECTIONS}
     renderItem={renderItem}
     contentContainerStyle={{paddingHorizontal:10,paddingTop:10,paddingBottom:20}}
     showsVerticalScrollIndicator={false}
    />
    
    </SafeAreaView>
  )
}

export default index;