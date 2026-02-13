import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import { Link, router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '@/API/api'
import * as SecureStore from "expo-secure-store"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserData } from '@/slices/userSlice';
import { Feather, FontAwesome6 } from '@expo/vector-icons';

interface SignupData {
  name:string,
  email:string,
  password:string,
}

const signup = () => {

  const dispatch = useDispatch();
  const user_role:string = useSelector((state:any)=>state.user.USER_ROLE);

  const signupUser = async (values:SignupData) =>{

  // check whether the role was selected
  if(!user_role){
    router.push('/(auth)/role_selecion');
    return
  }

  try {
  let cleanData = {...values,role:user_role};

  let response = await axiosInstance.post('/api/v1/auth/register',cleanData);
  if(response.status === 201){
    // store access_token token and refresh token in expo secure store
    await SecureStore.setItemAsync("access_token",response.data.access_token);
    await SecureStore.setItemAsync("refresh_token",response.data.refresh_token);
    // store the user role in async storage
    await AsyncStorage.setItem("role",response.data.data.role);

    dispatch(setUserData(response.data.data));
    router.push('/')
  }

  } catch (error:any) {
    if(error.response){
      alert(error.response.data.message);
    }else if (error.request){
      alert("Check your connection")
    }
  }
  };

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
    <Text className='font-poppins-bold text-center text-lg'>Register here</Text>
    </View>

    <Formik
    initialValues={{name:"",email:"",password:"",role:"farmer"}}
    onSubmit={(values)=>{signupUser(values)}}
    >
    {({errors,handleBlur,handleSubmit,handleChange,touched,values})=>(
    <View className='w-full rounded-md px-5 mt-7 flex flex-col'>

    <View>
    <Text className='font-poppins'>Name</Text>
    <View className='flex h-[45px] rounded-full items-center bg-input flex-row gap-2 px-3'>
    <FontAwesome6 color={'#454545'} name={'user'} size={18}/>
    <TextInput
    placeholder='Your name'
    className='w-full px-3 rounded-md'
    value={values.name}
    onChangeText={handleChange('name')}
    onBlur={handleBlur('name')}
    />
    </View>
    <Text></Text>
    </View>

    <View>
    <Text className='font-poppins'>Email</Text>
    <View className='flex h-[45px] rounded-full items-center bg-input flex-row gap-2 px-3'>
    <FontAwesome6 color={'#454545'} name={'envelope'} size={18}/>
    <TextInput
    placeholder='Your email'
    className='w-full mt-2 px-3 rounded-md'
    value={values.email}
    onChangeText={handleChange('email')}
    onBlur={handleBlur('email')}
    keyboardType='email-address'
    />
    </View>
    <Text></Text>
    </View>

    <View>
    <Text className='font-poppins'>Password</Text>
    <View className='flex h-[45px] rounded-full items-center bg-input flex-row gap-2 px-3'>
    <Feather color={'#454545'} name={'lock'} size={19}/>
    <TextInput
    placeholder='Your password'
    className='w-full mt-2 px-3 rounded-md'
    value={values.password}
    onChangeText={handleChange('password')}
    onBlur={handleBlur('password')}
    secureTextEntry={true}
    />
    </View>
    <Text></Text>
    </View>

    <View>
    <TouchableOpacity onPress={()=>handleSubmit()} 
    className='w-full px-3 flex flex-row justify-center items-center h-[45px] rounded-full bg-primary-300'>
    <Text className='text-white text-lg'>Continue</Text>
    </TouchableOpacity>
    <Text className='text-sm text-[#454545] pt-2'>Aleady have an account? 
    <Link className='text-blue-500' href="/(auth)/login">
    Login
    </Link></Text>
    </View>

    </View>
    )}
    </Formik>

    </ScrollView>
    </SafeAreaView>
  )
}

export default signup;