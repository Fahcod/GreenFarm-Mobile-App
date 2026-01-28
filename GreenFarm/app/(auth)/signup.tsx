import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import { Link } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '@/API/api'

interface SignupData {
  name:string,
  email:string,
  password:string,
}

const signup = () => {

  const dispatch = useDispatch();
  const user_role:string = useSelector((state:any)=>state.user.USER_ROLE);

  const signupUser = async (values:SignupData) =>{
  try {

  let response = await axiosInstance.post('/api/v1/auth/register',values);
  if(response.status === 201){
    // store token in async storage
    
  }

  } catch (error:any) {
    if(error.response){
      
    }else if (error.request){
      
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
    <Text className='font-bold text-center text-lg'>Register here</Text>
    </View>

    <Formik
    initialValues={{name:"",email:"",password:"",role:"farmer"}}
    onSubmit={(values)=>{}}
    >
    {({errors,handleBlur,handleSubmit,handleChange,touched,values})=>(
    <View className='w-full bg-white p-3 rounded-md shadow-md px-5 mt-7 flex flex-col'>

    <View>
    <Text>Name</Text>
    <TextInput
    placeholder='Your name'
    className='w-full h-[45px] bg-input mt-2 px-3 rounded-md'
    value={values.name}
    onChangeText={handleChange('name')}
    onBlur={handleBlur('name')}
    />
    <Text></Text>
    </View>

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
    value={values.password}
    onChangeText={handleChange('password')}
    onBlur={handleBlur('password')}
    secureTextEntry={true}
    />
    <Text></Text>
    </View>

    <View>
    <TouchableOpacity className='w-full px-3 flex flex-row justify-center items-center h-[45px] rounded-md bg-primary-300'>
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