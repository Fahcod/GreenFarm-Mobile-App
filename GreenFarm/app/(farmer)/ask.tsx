import { View, Text, TextInput,Image, TouchableOpacity,
   FlatList, Pressable, Modal } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import MainHeader from '@/components/MainHeader';
import { Feather, FontAwesome6 } from '@expo/vector-icons';
import HorizontalRule from '@/components/HorizontalRule';
import { images } from '@/constants/images';
import { router } from 'expo-router';
import {Formik} from "formik";
import EmptyVideos from '@/components/EmptyComponents/EmptyVideos';

const ask = () => {

  const [modalVisible,setModalVisible] = useState(false);

  return (
    <SafeAreaView edges={["top","right","left"]} className='bg-white flex-1'>
    <MainHeader/>

    <FlatList
    data={[]}
    ListEmptyComponent={<EmptyVideos/>}
    contentContainerStyle={{paddingHorizontal:10,paddingVertical:15}}
    showsVerticalScrollIndicator={false}
    renderItem={({item})=>(
      <Pressable onPress={()=>router.push(`/(screens)/question/dd8765` as any)} className='w-full bg-white p-3 shadow-lg mt-4 rounded-md'>
      <View>
      <Image className='rounded-md' style={{width:'100%',height:130}} source={images.article_4}/>
      </View>
      {/* the question and details container */}
      <View className='w-full'>
      <Text numberOfLines={2} className='font-bold text-[#303030]'>{item}</Text>
      <Text numberOfLines={3} className='text-sm pt-1 text-[#454545]'>{item}</Text>
      </View>
      <View className='w-full flex flex-row items-center justify-between'>
      {/* the asked by data */}
      <View className='flex pt-1 flex-row gap-2 items-center'>
      <Image source={images.profile_pic} className='rounded-full' style={{width:26,height:26}}/>
      <View>
      <Text className='font-semibold text-sm'>Twesigye Fahad</Text>
      <Text className='text-[#454545] text-[10px]'>12d ago</Text>
      </View>
      </View>
      <Text className='text-[#454545] text-sm'>123k answers</Text>
      </View>
      </Pressable>
    )}
    ListHeaderComponent={<>
    {/* the quick action */}
    <View className='w-full flex gap-2 flex-row items-center'>
    <View className='flex bg-gray-100 rounded-md pr-3 flex-1 flex-row items-center'>
    <TextInput
    placeholder='What are you asking today?'
    className='flex-1 text-sm px-3'
    />
    <TouchableOpacity>
    <FontAwesome6 color={'#505050'} size={17} name={'images'}/>
    </TouchableOpacity>
    </View>
    <TouchableOpacity onPress={()=>router.push('/(screens)/search_question')} className='px-4 py-2 rounded-md bg-green-600'>
    <Text className='text-white'>
    <Feather size={19} name={'search'}/>
    </Text>
    </TouchableOpacity>
    </View>
    <HorizontalRule mt={15}/>
    {/* the heading for the recently asked questions */}
    <View className='w-full mt-5 flex flex-row justify-between items-center'>
    <Text className='font-bold text-lg'>Recently asked</Text>
    <TouchableOpacity>
    <Text className='text-green-600'>See more</Text>
    </TouchableOpacity>
    </View>
    </>}
    />
    {/* the modal for asking a qestion */}
    <Modal
    visible={modalVisible}
    onRequestClose={()=>setModalVisible(false)}
    transparent={true}
    animationType='slide'
    >
    {/* the overlay */}
    <View className='w-full h-full bg-[#00000033]'>
    {/* the ask questioin container */}
    <Pressable onPressOut={()=>setModalVisible(false)} className='w-full p-3 rounded-tr-3xl rounded-tl-3xl bg-white min-h-[380px] absolute bottom-0'>
    {/* the header */}
    <View className='w-full flex flex-row items-center justify-between'>
    <Text className='font-bold text-lg'>Ask a question</Text>
    </View>
    {/* the question form */}
    <Formik
    initialValues={{question:"",description:""}}
    onSubmit={(values)=>{}}
    >
   {({errors,values,touched,handleBlur,handleChange,handleSubmit})=>(
   <View className='w-full mt-7'>

  {/* the question */}
  <View className='w-full'>
  <TextInput
  placeholder='Your question here?'
  className='w-full p-3 bg-gray-100 rounded-md'
  onChangeText={handleChange('question')}
  onBlur={handleBlur('question')}
  />
  </View>

  {/* the description */}
  <View className='w-full mt-6'>
  <TextInput
  placeholder='Can you explain more about your question?'
  className='w-full h-[150px] p-3 bg-gray-100 rounded-md'
  onChangeText={handleChange('description')}
  onBlur={handleBlur('description')}
  multiline={true}
  numberOfLines={16}
  style={{textAlignVertical:'top'}}
  />
  </View>

  {/* the submit button */}
  <TouchableOpacity className='w-full p-3 mt-4 rounded-md bg-green-600'>
  <Text className='text-white text-center'>Submit question</Text>
  </TouchableOpacity>
  
   </View>
   )}
    </Formik>
    </Pressable>
    </View>
    </Modal>

    </SafeAreaView>
  )
}

export default ask;