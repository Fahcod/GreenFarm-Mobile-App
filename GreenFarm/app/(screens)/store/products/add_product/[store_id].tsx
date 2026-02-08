import { View, Text, TouchableOpacity, ScrollView, TextInput,Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome6 } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Formik } from 'formik';
import * as ImagePicker from "expo-image-picker";
import { axiosInstance } from '@/API/api';
import HorizontalRule from '@/components/HorizontalRule';

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
    <ScrollView showsVerticalScrollIndicator={false}>

    {/* the product images */}
    <View className='w-full mt-5'>
    <View className='w-full'>
    <Text className='text font-poppins-semibold px-3 w-full py-1'>Upload product images</Text>
    {/* the images container */}
    <View className='w-full flex flex-row p-3 gap-4'>

    {/* the image 1 placeholder */}
    {productFiles[0]?
    <Image source={{uri:productFiles[0]}} style={{width:'48%',height:114,borderRadius:6}}/>
    :<Pressable onPress={()=>pickImage()} className='w-[48%] flex items-center justify-center rounded-md h-[114px] bg-[#efefef]'>
    <View className='flex flex-row gap-2 items-center'>
    <FontAwesome6 size={14} color={'#454545'} name={'images'}/>
    <Text className='text-sm text-[#454545]'>Upload image</Text>
    </View>
    </Pressable>}

    {/* the image 2 placeholder */}
    {productFiles[1]?
    <Image source={{uri:productFiles[1]}} style={{width:'48%',height:114,borderRadius:6}}/>
    :<Pressable onPress={()=>pickImage()} className='w-[48%] flex items-center justify-center rounded-md h-[114px] bg-[#efefef]'>
    <View className='flex flex-row gap-2 items-center'>
    <FontAwesome6 size={14} color={'#454545'} name={'images'}/>
    <Text className='text-sm text-[#454545]'>Upload image</Text>
    </View>
    </Pressable>}

    </View>
    </View>
    </View>
    <HorizontalRule mt={10}/>
    
    <Formik
    initialValues={{title:"",price:"",description:"",category:""}}
    onSubmit={(values)=>uploadProduct(values)}>
   {({values,errors,handleBlur,handleSubmit,handleChange,touched})=>(
    <View className='w-full px-3 mb-6 rounded-md mt-6 flex pb-5 flex-col gap-8'>

    <View>
    <Text className='text-[#303030] font-poppins'>Product name:</Text>
    <TextInput
    value={values.title}
    onChangeText={handleChange('title')}
    onBlur={handleBlur('title')}
    placeholder='Product name...'
    className='w-full mt-1 h-[45px] font-poppins px-2 border-solid border border-gray-200 rounded-md'
    />
    </View>

    <View>
    <Text className='text-[#303030] font-poppins'>Product price:</Text>
    <TextInput
    placeholder='Product price'
    className='w-full mt-1 border-solid font-poppins border border-gray-200 h-[45px] text-sm px-3 rounded-md'
    keyboardType='numeric'
    onChangeText={handleChange('price')}
    onBlur={handleBlur('price')}
    value={values.price}
    />
    </View>

    <View>
    <Text className='text-[#454545] font-poppins'>Product category:</Text>
    <TextInput
    placeholder='Product category'
    value={values.category}
    onChangeText={handleChange('category')}
    onBlur={handleBlur('category')}
    className='w-full mt-1 h-[45px] font-poppins border-solid border border-gray-200 text-sm px-3 rounded-md'
    />
    </View>

    <View>
    <Text className='text-[#454545] font-poppins'>Product description:</Text>
    <TextInput
    multiline={true}
    onChangeText={handleChange('description')}
    onBlur={handleBlur('description')}
    value={values.description}
    placeholder='type the product description'
    className='w-full mt-1 h-[175px] font-poppins px-3 text-sm rounded-md border border-solid border-gray-200'
    numberOfLines={15}
    style={{textAlignVertical:'top'}}
    />
    </View>

    {/* the add product button */}
    <TouchableOpacity 
    onPress={()=>handleSubmit()} 
    className='w-full h-[45px] justify-center flex items-center flex-row bg-primary-300 rounded-md'>
    <Text className='text-white font-poppins'>Add product</Text>
    </TouchableOpacity>

    </View>
   )}
    </Formik>

    </ScrollView>
    </SafeAreaView>
  )
}

export default add_product;