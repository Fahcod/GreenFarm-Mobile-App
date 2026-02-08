import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { FontAwesome6 } from '@expo/vector-icons'
import { Formik } from 'formik'
import { editProductVlidationSchema } from '@/schemas/schemas'

const editProduct = () => {
  return (
    <SafeAreaView className='bg-white flex-1'>
    {/* the custom header */}
    <View className='w-full flex flex-row items-center justify-between p-3 bg-white h-[60px] border-solid border-b border-gray-100'>
    <TouchableOpacity onPress={()=>router.back()}>
    <FontAwesome6 name={'arrow-left'} size={22}/>
    </TouchableOpacity>

    {/* the store name */}
    <Text className='font-poppins-bold text-lg'>edit product</Text>
    
    <TouchableOpacity>
    <FontAwesome6 name={'ellipsis-vertical'} size={20}/>
    </TouchableOpacity>
    </View>
    {/* end of the custom header */}

    <ScrollView 
    contentContainerStyle={{paddingBottom:25}}
    showsHorizontalScrollIndicator={false}>
    {/* the edit product form */}
    <View className='w-full'>
    <Formik 
    initialValues={{new_title:"",new_description:"",new_price:"",new_category:""}}
    validationSchema={editProductVlidationSchema}
    onSubmit={(values)=>{}}>
    {({values,handleBlur,handleChange,handleSubmit,touched})=>(
    <View className='w-full mt-11 px-3 flex flex-col gap-6'>

    <View>
    <Text className='font-poppins text-[#303030]'>Title</Text>
    <TextInput
    value={values.new_title}
    onChangeText={handleChange('new_title')}
    onBlur={handleBlur('new_title')}
    placeholder='Your new title'
    className='w-full font-poppins mt-2 rounded-md h-[45px] border-solid border border-gray-100'
    />
    </View>

    {/* the container for price and category */}
    <View className='w-full flex flex-row gap-2'>
    <View className='w-[48%]'>
    <Text className='font-poppins text-[#303030]'>Price</Text>
    <TextInput
    value={values.new_price}
    onChangeText={handleChange('new_price')}
    onBlur={handleBlur('new_price')}
    keyboardType='numeric'
    placeholder='Your new price'
    className='w-full px-2 font-poppins rounded-md mt-1 h-[45px] border-solid border border-gray-100'
    />
    </View>

    <View className='w-[48%]'>
    <Text className='font-poppins text-[#303030]'>Category</Text>
    <TextInput
    value={values.new_category}
    onChangeText={handleChange('new_category')}
    onBlur={handleBlur('new_category')}
    placeholder='Your new category'
    className='w-full px-2 font-poppins rounded-md mt-1 h-[45px] border-solid border border-gray-100'
    />
    </View>
    </View>

    {/* the container for the description */}
    <View>
    <Text className='font-poppins text-[#303030]'>Product description:</Text>
    <TextInput
    multiline={true}
    onChangeText={handleChange('new_description')}
    onBlur={handleBlur('new_description')}
    value={values.new_description}
    placeholder='type the product description'
    className='w-full mt-1 h-[185px] px-3 rounded-md border border-solid border-gray-200'
    numberOfLines={15}
    style={{textAlignVertical:'top'}}
    />
    </View>

    {/* the submit button */}
    <TouchableOpacity onPress={()=>handleSubmit()} className='w-full h-[45px] justify-center flex items-center flex-row bg-primary-300 rounded-md'>
    <Text className='text-white'>Save changes</Text>
    </TouchableOpacity>
    </View>
    )}
    </Formik>
    </View>

    </ScrollView>
    </SafeAreaView>
  )
}

export default editProduct;