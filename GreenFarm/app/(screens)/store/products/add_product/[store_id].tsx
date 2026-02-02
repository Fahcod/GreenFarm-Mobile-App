import { View, Text, TouchableOpacity, ScrollView, TextInput,Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome6 } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Formik } from 'formik';
import * as ImagePicker from "expo-image-picker";
import { axiosInstance } from '@/API/api';

interface ProductData {
    title:string,
    category:string,
    price:string,
    description:string
}

const add_product = () => {

    // get the store id
    const {store_id} = useLocalSearchParams();
    const [productFiles,setProductFiles] = useState<any[]>([]);
    
    // the function for picking images
    const pickImage = async () =>{
       await ImagePicker.requestMediaLibraryPermissionsAsync();
       const result = await ImagePicker.launchImageLibraryAsync({
        quality:1,
        allowsMultipleSelection:false,
        aspect:[5,5],
        allowsEditing:true
       });

       if(!result.canceled){
        setProductFiles([...productFiles,result.assets[0].uri] as any);
       }
    }

    // Upload the product to the server
    const uploadProduct = async (values:ProductData) =>{

    // create the form data
    let product_data = {...values,quantity:0}
    let formData = new FormData();

    formData.append("title",product_data.title);
    formData.append("price",product_data.price);
    formData.append("category",product_data.category);
    formData.append("description",product_data.description);
    formData.append("quantity",product_data.quantity as any)

    // add the product images
    for (let i = 0; i < productFiles.length; i++) {
       formData.append("images",{
       name:'product_image.png',
       uri:productFiles[i],
       type:'image/png'
       } as any)
    }
    //after, send the data to the server
    try {

    let response = await axiosInstance.post(`/api/v1/product/create/${store_id}`,formData,
    {headers:{'Content-Type':'multipart/form-data'}});

    if(response.status == 201){
        alert(response.data.message);
    }
        
    } catch (error:any) {
        if(error.response){
            alert(error.response.data.message)
        }else if (error.request){
            alert("Check your connection")
            console.log(error.request)
        }
    }    
 }

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
    {productFiles[0]?
    <Image source={{uri:productFiles[0]}} style={{width:'48%',height:114,borderRadius:6}}/>
    :<Pressable onPress={()=>pickImage()} className='w-[48%] flex items-center justify-center rounded-md h-[114px] bg-[#efefef]'>
    <View className='flex flex-row gap-2 items-center'>
    <FontAwesome6 size={13} color={'#454545'} name={'images'}/>
    <Text className='text-xs text-[#454545]'>Upload image</Text>
    </View>
    </Pressable>}

    {/* the image 2 placeholder */}
    {productFiles[1]?
    <Image source={{uri:productFiles[1]}} style={{width:'48%',height:114,borderRadius:6}}/>
    :<Pressable onPress={()=>pickImage()} className='w-[48%] flex items-center justify-center rounded-md h-[114px] bg-[#efefef]'>
    <View className='flex flex-row gap-2 items-center'>
    <FontAwesome6 size={13} color={'#454545'} name={'images'}/>
    <Text className='text-xs text-[#454545]'>Upload image</Text>
    </View>
    </Pressable>}

    </View>
    </View>
    </View>
    
    <Formik
    initialValues={{title:"",price:"",description:"",category:""}}
    onSubmit={(values)=>uploadProduct(values)}>
   {({values,errors,handleBlur,handleSubmit,handleChange,touched})=>(
    <View className='w-full mb-6 bg-white rounded-md mt-3 shadow-md flex pb-5 p-3 flex-col gap-8'>

    <View>
    <Text className='text-[#454545]'>Product name:</Text>
    <TextInput
    value={values.title}
    onChangeText={handleChange('title')}
    onBlur={handleBlur('title')}
    placeholder='type the product name...'
    className='w-full mt-1 h-[40px] text-sm px-3 border-solid border border-gray-200 rounded-md'
    />
    </View>

    <View>
    <Text className='text-[#454545]'>Product price:</Text>
    <TextInput
    placeholder='type the product price'
    className='w-full mt-1 border-solid border border-gray-200 h-[40px] text-sm px-3 rounded-md'
    keyboardType='numeric'
    onChangeText={handleChange('price')}
    onBlur={handleBlur('price')}
    value={values.price}
    />
    </View>

    <View>
    <Text className='text-[#454545]'>Product category:</Text>
    <TextInput
    placeholder='select the product category'
    value={values.category}
    onChangeText={handleChange('category')}
    onBlur={handleBlur('category')}
    className='w-full mt-1 h-[45px] border-solid border border-gray-200 text-sm px-3 rounded-md'
    />
    </View>

    <View>
    <Text className='text-[#454545]'>Product description:</Text>
    <TextInput
    multiline={true}
    onChangeText={handleChange('description')}
    onBlur={handleBlur('description')}
    value={values.description}
    placeholder='type the product description'
    className='w-full mt-1 h-[175px] px-3 text-sm rounded-md border border-solid border-gray-200'
    numberOfLines={15}
    style={{textAlignVertical:'top'}}
    />
    </View>

    {/* the add product button */}
    <TouchableOpacity onPress={()=>handleSubmit()} className='w-full h-[45px] justify-center flex items-center flex-row bg-primary-300 rounded-md'>
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