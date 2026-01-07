import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';

const login = () => {
  return (
    <SafeAreaView className='flex-1 bg-white'>
    <ScrollView contentContainerStyle={{
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center'
    }}>
    {/* This is the login page for the users */}
    <View className='mt-12'>
    <Text className='font-bold text-center text-lg'>Login here</Text>
    </View>

    <Formik
    initialValues={{name:"",email:"",password:"",role:"farmer"}}
    onSubmit={(values)=>{}}
    >
    {({errors,handleBlur,handleSubmit,handleChange,touched,values})=>(
    <View className='w-full px-5 mt-7 flex flex-col gap-3'>

    <View>
    <TextInput
    placeholder='Your email'
    className='w-full p-4 rounded-md border-solid border border-gray-200'
    value={values.email}
    onChangeText={handleChange('email')}
    onBlur={handleBlur('email')}
    keyboardType='email-address'
    />
    <Text></Text>
    </View>

    <View>
    <TextInput
    placeholder='Your password'
    className='w-full p-4 rounded-md border-solid border border-gray-200'
    value={values.password}
    onChangeText={handleChange('password')}
    onBlur={handleBlur('password')}
    secureTextEntry={true}
    />
    <Text></Text>
    </View>

    <View>
    <TouchableOpacity className='w-full p-4 rounded-md bg-primary-300'>
    <Text className='text-white text-lg text-center'>Continue</Text>
    </TouchableOpacity>
    <Text className='text-sm text-[#454545] pt-1'> have Don'tan account? Signup</Text>
    </View>

    </View>
    )}
    </Formik>

    </ScrollView>
    </SafeAreaView>
  )
}

export default login;