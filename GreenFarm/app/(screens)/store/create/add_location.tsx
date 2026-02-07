import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons'
import { ScrollView } from 'react-native'
import HorizontalRule from '@/components/HorizontalRule';
import { icons } from '@/constants/icons';
import {Picker} from "@react-native-picker/picker";
import { useDispatch } from 'react-redux';
import { setStoreLocationObject } from '@/slices/formSlice';

const add_location = () => {

    const dispatch = useDispatch();
    const [storeLocation,setStoreLocation] = useState({
      country:"",
      city:"",
      region:""
    });

    function saveData (){
      dispatch(setStoreLocationObject(storeLocation));
      router.push('/(screens)/store/create/add_store_contacts')
    }

  return (
    <SafeAreaView className='bg-white flex-1'>
    {/* the custom header */}
    <View className='w-full flex flex-row items-center justify-start p-3 z-[1000] h-[45px] bg-white'>
    <TouchableOpacity onPress={()=>router.back()}>
    <FontAwesome6 size={22} name={'arrow-left'}/>
    </TouchableOpacity>
    </View>
    {/* end of the custom header */}
    <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal:10,
          paddingVertical:25,
          display:'flex',
          alignItems:'center',
        }}>
        {/* the page contents come next */}
    <View className='w-full flex flex-col items-center'>
    <View className='flex-col items-center'>
    <Image style={{width:140,height:140}} source={icons.store_location}/>
    <Text className='font-poppins-bold text-xl text-[#454545]'>Add store location</Text>
    </View>
    <HorizontalRule mt={10}/>
    {/* the form fields for selecting */}
    <View className='w-[90%] mt-4'>
    
    <View className='w-full'>
    <Text className='font-poppins-semibold text-[#454545]'>Country</Text>
    <Picker
    selectedValue={storeLocation.country}
    style={{width:'100%',backgroundColor:'#fff',borderRadius:6,height:55}}
    onValueChange={(value)=>setStoreLocation({...storeLocation,["country"]:value})}>
    <Picker.Item label='Uganda' value={'Uganda'}/>
    </Picker>
    </View>
    <HorizontalRule mt={0}/>

    <View className='w-full mt-6'>
    <Text className='font-poppins-semibold text-[#454545]'>City</Text>
    <Picker
    selectedValue={storeLocation.city}
    style={{width:'100%',backgroundColor:'#fff',borderRadius:6,height:55}}
    onValueChange={(value)=>setStoreLocation({...storeLocation,["city"]:value})}>
    <Picker.Item label='Kampala' value={'Kampala'}/>
    <Picker.Item label='Mukono' value={'Mukono'}/>
    <Picker.Item label='Masaka' value={'Masaka'}/>
    <Picker.Item label='Wakiso' value={'Wakiso'}/>
    <Picker.Item label='Mpigi' value={'Mpigi'}/>
    </Picker>
    </View>
    <HorizontalRule mt={0}/>

    <View className='w-full mt-6'>
    <Text className='font-poppins-semibold text-[#454545]'>Area</Text>
    <Picker
    selectedValue={storeLocation.region}
    style={{width:'100%',backgroundColor:'#fff',borderRadius:6,height:55}}
    onValueChange={(value)=>setStoreLocation({...storeLocation,["region"]:value})}>
    <Picker.Item label='Kawempe' value={'Kawempe'}/>
    <Picker.Item label='Nabweru' value={'Nabweru'}/>
    <Picker.Item label='Makindye' value={'Makindye'}/>
    </Picker>
    </View>
    <HorizontalRule mt={0}/>

    {/* the next button */}
    <View className='w-full mt-6'>
    <TouchableOpacity
    onPress={()=>{saveData()}}
    className='px-3 py-2 rounded-md bg-primary-300 gap-3'>
    <Text className='font-poppins text-white text-center'>Next</Text>
    </TouchableOpacity>
    </View>
    
    </View>
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default add_location;