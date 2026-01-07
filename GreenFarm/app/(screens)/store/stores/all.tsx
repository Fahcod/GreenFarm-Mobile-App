import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { Feather, FontAwesome6 } from '@expo/vector-icons'
import { all_stores } from '@/constants/data'
import StoreItem from '@/components/StoreItem'

const allStores = () => {
  return (
    <SafeAreaView className='flex-1 bg-white'>
    {/* the custom header */}
    <View className='w-full p-3 h-[60px] flex flex-row items-center justify-between z-[1000] border-solid border-b border-gray-100'>
    <TouchableOpacity onPress={()=>router.back()}>
    <FontAwesome6 size={20} name="arrow-left"/>
    </TouchableOpacity>
    <Text className='font-bold text-lg'>All stores</Text>
    <TouchableOpacity>
    <FontAwesome6 size={20} name="ellipsis-vertical"/>
    </TouchableOpacity>
    </View>
    {/* end of the header, the stores */}
    <FlatList
    data={all_stores}
    contentContainerStyle={{paddingHorizontal:10}}
    showsVerticalScrollIndicator={false}
    ListHeaderComponent={<>
    <View className='w-full'>
    {/* the search box */}
    <View className='w-full mb-3 mt-3 px-3 bg-[#efefef] rounded-md flex gap-4 flex-row items-center'>
    <TouchableOpacity>
    <Feather size={18} color={'#454545'} name={'search'}/>
    </TouchableOpacity>
    <TextInput 
    className='flex-1'
    placeholder='search stores'/>
    <TouchableOpacity>
    <FontAwesome6 size={18} color={'#454545'} name={'filter'}/>
    </TouchableOpacity>
    </View>
    </View>
    </>}
    renderItem={({item})=><StoreItem {...item}/>}
    keyExtractor={(item)=>item._id}
    />

    </SafeAreaView>
  )
}

export default allStores;