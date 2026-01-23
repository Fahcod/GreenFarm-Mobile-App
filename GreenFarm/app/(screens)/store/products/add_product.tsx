import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Formik } from 'formik';

const add_product = () => {
  return (
    <SafeAreaView className='flex-1 bg-white'>
    {/* the custom header */}
    <View className='w-full flex flex-row items-center justify-between p-3 z-[1000] h-[60px] bg-white border-solid border-b border-gray-100'>
    <TouchableOpacity onPress={()=>router.back()}>
    <FontAwesome6 size={22} name={'arrow-left'}/>
    </TouchableOpacity>

    <Text className='font-bold text-lg'>Add a product</Text>

    <TouchableOpacity>
    <FontAwesome6 size={19} name={'ellipsis-vertical'}/>
    </TouchableOpacity>
    </View>
    {/* end of the header, the create product form */}
    <ScrollView className='px-3' showsVerticalScrollIndicator={false}>

    {/* the product images */}
    <View className='w-full mt-5'>
    <View className='w-full bg-[#fff] shadow-md rounded-md '>
    <Text className='text font-sm text-primary-300 px-3 w-full py-1 bg-green-50'>Upload product images</Text>
    {/* the images container */}
    <View className='w-full flex flex-row p-3 gap-4'>

    {/* the image 1 placeholder */}
    <View className='w-[48%] flex items-center justify-center rounded-md h-24 bg-[#efefef]'>
    <View className='flex flex-row gap-2 items-center'>
    <FontAwesome6 size={13} color={'#454545'} name={'images'}/>
    <Text className='text-xs text-[#454545]'>Upload image</Text>
    </View>
    </View>

    {/* the image 2 placeholder */}
    <View className='w-[48%] flex items-center justify-center rounded-md h-24 bg-[#efefef]'>
    <View className='flex flex-row gap-2 items-center'>
    <FontAwesome6 size={13} color={'#454545'} name={'images'}/>
    <Text className='text-xs text-[#454545]'>Upload image</Text>
    </View>
    </View>

    </View>
    </View>
    </View>
    
    <Formik
    initialValues={{title:"",price:"",description:"",category:""}}
    onSubmit={(values)=>{}}>
   {({values,errors,handleBlur,handleSubmit,handleChange,touched})=>(
    <View className='w-full mb-6 bg-white rounded-md mt-3 shadow-md flex pb-5 p-3 flex-col gap-8'>

    <View>
    <Text className='text-[#454545]'>Product name:</Text>
    <TextInput
    placeholder='type the product name...'
    className='w-full mt-1 h-[40px] text-sm px-3 bg-[#f7f6f6] rounded-md'
    />
    </View>

    <View>
    <Text className='text-[#454545]'>Product price:</Text>
    <TextInput
    placeholder='type the product price'
    className='w-full mt-1 h-[40px] text-sm px-3 bg-[#f7f6f6] rounded-md'
    keyboardType='numeric'
    />
    </View>

    <View>
    <Text className='text-[#454545]'>Product category:</Text>
    <TextInput
    placeholder='select the product category'
    className='w-full mt-1 h-[45px] text-sm px-3 rounded-md bg-[#f7f6f6]'
    />
    </View>

    <View>
    <Text className='text-[#454545]'>Product description:</Text>
    <TextInput
    multiline={true}
    placeholder='type the product description'
    className='w-full mt-1 h-[175px] px-3 text-sm rounded-md bg-[#f7f6f6]'
    numberOfLines={15}
    style={{textAlignVertical:'top'}}
    />
    </View>

    {/* the add product button */}
    <TouchableOpacity className='w-full h-[45px] justify-center flex items-center flex-row bg-primary-300 rounded-md'>
    <Text className='text-white'>Add product</Text>
    </TouchableOpacity>

    </View>
   )}
    </Formik>

    </ScrollView>
    </SafeAreaView>
  )
}

export default add_product;