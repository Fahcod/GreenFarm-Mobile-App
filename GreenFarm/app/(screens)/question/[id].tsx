import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather, FontAwesome6 } from '@expo/vector-icons'
import { router } from 'expo-router'
import { answers } from '@/constants/data'
import { images } from '@/constants/images'
import HorizontalRule from '@/components/HorizontalRule'

const questionPage = () => {
  return (
    <SafeAreaView className='bg-white flex-1'>
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
    {/* end of the header */}
    <FlatList 
    data={answers}
    showsVerticalScrollIndicator={false}
    renderItem={({item})=>(<>
    <View className='w-full flex mt-7 gap-3 flex-row'>
    <View>
    <Image className='rounded-full' style={{width:28,height:28}} source={images.profile_pic}/>
    </View>
    <View className='flex-1'>
    <Text className='font-bold'>Twesigye Fahad</Text>
    <Text className='text-[#454545] text-[13px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat quasi enim a, ullam sed iste, autod iusto.</Text>
    {/* the user actions */}
    <View className='flex pt-2 flex-row items-center gap-6'>

    <TouchableOpacity className='flex flex-row items-center gap-1'>
    <FontAwesome6 color={'#454545'} size={15} name={'thumbs-up'}/>
    <Text className='text-xs text-[#454545]'>3345k</Text>
    </TouchableOpacity>

    <TouchableOpacity className='flex flex-row items-center gap-1'>
    <FontAwesome6 color={'#454545'} size={15} name={'thumbs-down'}/>
    <Text className='text-xs text-[#454545]'>dislike</Text>
    </TouchableOpacity>
    
    </View>
    </View>
    </View>
    </>)}
    contentContainerStyle={{paddingHorizontal:10, paddingVertical:15}}
    ListHeaderComponent={<>
    <View className='w-full'>
    <Image style={{width:'100%',height:180}} className='rounded-md' source={images.article_2}/>
    {/* the question and sked by details */}
    <Text className='font-bold mt-3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum nobis?</Text>
    <Text className='text-[#454545] pt-1 text-sm'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit illo rem debitis sint tempore? Itaque quidem hic, cumque temporibus laboriosam voluptatibus et tempore deleniti ratione nam accusamus quia nobis molestias?</Text>
    <View className='w-full flex flex-row items-center justify-between'>
    {/* the asked by data */}
    <View className='flex mt-2 flex-row gap-2 items-center'>
    <Image source={images.profile_pic} className='rounded-full' style={{width:26,height:26}}/>
    <View>
    <Text className='font-semibold text-sm'>Twesigye Fahad</Text>
    <Text className='text-[#454545] text-[10px]'>12d ago</Text>
    </View>
    </View>
    <Text className='text-[#454545] text-sm'>123k answers</Text>
    </View>
    <HorizontalRule mt={15}/>
    {/* the answers heading */}
    <View className='w-full flex flex-row mt-3 items-center justify-between'>
    <Text className='font-bold text-lg'>Answers to this question</Text>
    {/* the right see all button */}
    <TouchableOpacity className='flex flex-row items-center gap-2'>
    <Text className='text-green-600'>See all</Text>
    <FontAwesome6 size={15} color={'#16a34a'} name={'chevron-right'}/>
    </TouchableOpacity>
    </View>
    </View>
    </>}
    />

    </SafeAreaView>

  )
}

export default questionPage;