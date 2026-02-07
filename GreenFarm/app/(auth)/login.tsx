import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import { Link, router } from 'expo-router';
import { axiosInstance } from '@/API/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import * as SecureStore from "expo-secure-store"
import { setUserData } from '@/slices/userSlice';
import { loginValidationSchema } from '@/schemas/schemas';
interface LoginData {
  email:string,
  password:string,
}

const login = () => {

  const dispatch = useDispatch();
  const submitData = async (values:LoginData)=>{
    try {
    
      let response = await axiosInstance.post('/api/v1/auth/login',values);
      if(response.status === 200){
        // store access_token token and refresh token in expo secure store
        await SecureStore.setItemAsync("access_token",response.data.access_token);
        await SecureStore.setItemAsync("refresh_token",response.data.refresh_token);
        // store the user role in async storage
        await AsyncStorage.setItem("role",response.data.data.role);
    
        dispatch(setUserData(response.data.data));
        router.push('/(business)/' as any)
      }
    
      } catch (error:any) {
        if(error.response){
          alert(error.response.data.message);
        }else if (error.request){
          alert("Check your connection")
        }
      }
  }
  
  return (
    <SafeAreaView className='flex-1 bg-white'>
    <ScrollView contentContainerStyle={{
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',
       paddingHorizontal:12
    }}>
    {/* This is the register page for the users */}
    <View className='mt-12'>
    <Text className='font-bold text-center text-lg'>Login here</Text>
    </View>

    <Formik
    initialValues={{name:"",email:"",password:""}}
    validationSchema={loginValidationSchema}
    onSubmit={(values)=>{submitData(values)}}
    >
    {({errors,handleBlur,handleSubmit,handleChange,touched,values})=>(
    <View className='w-full bg-white p-3 rounded-md shadow-md px-5 mt-7 flex flex-col'>

    <View>
    <Text>Email</Text>
    <TextInput
    placeholder='Your email'
    className='w-full h-[45px] bg-input mt-2 px-3 rounded-md'
    value={values.email}
    onChangeText={handleChange('email')}
    onBlur={handleBlur('email')}
    keyboardType='email-address'
    />
    <Text></Text>
    </View>

    <View>
    <Text>Password</Text>
    <TextInput
    placeholder='Your password'
    className='w-full h-[45px] bg-input mt-2 px-3 rounded-md'
    value={values.name}
    onChangeText={handleChange('name')}
    onBlur={handleBlur('name')}
    secureTextEntry={true}
    />
    <Text></Text>
    </View>

    <View>
    <TouchableOpacity onPress={()=>handleSubmit()} className='w-full px-3 flex flex-row justify-center items-center h-[45px] rounded-md bg-primary-300'>
    <Text className='text-white text-lg'>Continue</Text>
    </TouchableOpacity>
    <Text className='text-sm text-[#454545] pt-1'>Don't have an account? 
    <Link className='text-blue-500' href="/(auth)/signup">Register</Link></Text>
    </View>

    </View>
    )}
    </Formik>

    </ScrollView>
    </SafeAreaView>
  )
}

export default login;