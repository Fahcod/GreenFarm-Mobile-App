import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Feather, FontAwesome6 } from '@expo/vector-icons';
import HorizontalRule from '@/components/HorizontalRule';
import { Content } from '@/types/types';
import { useFetch } from '@/hooks/useFetch';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const articleDetails = () => {

  const {id} = useLocalSearchParams();
  const [articleData,setArticleData] = useState<Content>();
  const latest_articles:Content[] = useSelector((state:RootState)=>state.content.latest_articles);

  // fetch the article data
  const fetchData = async ()=>{
  let {data,success} = await useFetch(`/api/v1/content/article/${id}`);
  if(success){
    setArticleData(data as any);
  }
  else alert("Failed to fetch article")
  }

  useEffect(()=>{
  fetchData()
  },[])

  return (
    <SafeAreaView  className='bg-white flex-1'>
    {/* the custom header */}
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
    {/* THIS MARKS THE END OF THE CUSTOME HEADER, AND THE ARTICLE NEXT */}
    <FlatList
    data={latest_articles}
    renderItem={({item})=>(
    <View className='w-full rounded-md p-2 border-solid border border-gray-100 mt-3 flex flex-row gap-3'>
    {/* the article main image */}
    <View className='w-[45%] relative'>
    <Image className='rounded-sm' source={{uri:item.files[0]}} 
    style={{height:90,width:'100%'}}/>
    </View>
    {/* the video title, and desc cont */}
    <View className='flex-1'>
    <Text numberOfLines={2} className='font-poppins-bold text-[#303030] text-[13px]'>{item.title}</Text>
    <Text numberOfLines={2} className='text-[12px] font-poppins text-[#454545]'>{item.description}</Text>
    </View>
    </View>
    )}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{paddingBottom:30,paddingHorizontal:10,paddingTop:10}}
    ListHeaderComponent={<>
    <View className='w-full'>
    <Image className='rounded-sm' style={{width:'100%',height:180}} 
    source={{uri:articleData?.files[0]}}/>
    </View>
    {/* the article details */}
    <View className='w-full pt-1'>
    <Text className='font-poppins-bold leading-[18px] text-[15px]'>{articleData?.title}</Text>
    {/* the video duration and creator info */}
   <View className='w-full flex gap-3 pt-4 flex-row items-center'>
   <Image className='rounded-full bg-input' source={{uri:articleData?.created_by.profile_pic}} 
   style={{width:27,height:27}}/>
   <View className='flex items-center gap-2 flex-row'>
   <Text className='text-xs'>By {articleData?.created_by.name}</Text>
   <Text>•</Text>
   <Text className='text-xs'>January 23, 2024</Text>
   </View>
   </View>
   <HorizontalRule mt={10}/>
   <Text className='text-[#454545] font-poppins pt-3'>
    {articleData?.description}
    </Text>
    <HorizontalRule mt={10}/>
    {/* the title for the next article container */}
    <View className='w-full pt-4'>
    <Text className='font-bold text-[15px]'>More educational articles</Text>
    </View>
   </View>
    </>}
    />

    </SafeAreaView>
  )
}

export default articleDetails;