import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
import HorizontalRule from '@/components/HorizontalRule';
import { PAYMENT_PLANS } from '@/constants/payment_plans';
import { useDispatch, useSelector } from 'react-redux';
import { setPaymentPlan } from '@/slices/formSlice';
import { RootState } from '@/store/store';
import { axiosInstance } from '@/API/api';


const add_subscription_plan = () => {

  const dispatch = useDispatch();
  const [isSubmitting,setIsSubmitting] = useState(false);
  
  let data = useSelector((state:RootState)=>state.forms.create_store);

  // function to save the plan chosen and create the store
  async function saveAndCreate(plan:string){
    if(isSubmitting) return;

    dispatch(setPaymentPlan(plan));
       setIsSubmitting(true);
        try {
          let response = await axiosInstance.post('/api/v1/store/create',data);
          if(response.status === 201){
          alert(response.data.message);
          setIsSubmitting(false)
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
    <SafeAreaView className='bg-white flex-1'>
    {/* the custom header */}
    <View className='w-full flex flex-row items-center justify-start p-3 z-[1000] h-[45px] bg-white'>
    <TouchableOpacity onPress={()=>router.back()}>
    <FontAwesome6 size={22} name={'arrow-left'}/>
    </TouchableOpacity>
    </View>
    {/* end of the custom header */}

    {/* The container for the pricing cards */}
    <FlatList
    data={[1,2,3]}
    renderItem={({item})=>(<></>)}
    contentContainerStyle={{paddingHorizontal:10}}
    ListHeaderComponent={
      <>
      <View className='w-full mt-6'>
      <Text className='text-center font-poppins-bold text-xl'>Select payment plan</Text>
      <Text className='text-center text-sm font-poppins text-[#454545]'>Choose the best for your business</Text>
      </View>
      <HorizontalRule mt={10}/>
      {/* the pricing cards */}
      <FlatList
      data={PAYMENT_PLANS}
      horizontal={true}
      contentContainerStyle={{marginTop:30,gap:15}}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item)=>item.type}
      renderItem={({item})=>(<>
       <View className='w-[200px] pb-4 px-2 flex bg-white border-solid border border-gray-200 flex-col items-center rounded-md'>
      {/* header */}
      <View className='flex flex-col items-center mt-2'>
      <FontAwesome6 size={30} color={'#16a34a'} name={"leaf"} solid/>
      <Text className='font-poppins-semibold'>{item.title}</Text>
      </View>
      <HorizontalRule mt={6}/>
      {/* the price */}
      <View className='flex flex-row items-center mt-2'>
      <Text className='font-poppins-bold text-2xl'>UGX {item.amount}</Text>
      <Text className='text-[#454545]'>/month</Text>
      </View>
      <HorizontalRule mt={6}/>
      {/* the features offered */}
      <View className='w-full flex flex-col mt-2 gap-3'>
      {item.features?.map((item,index)=>{
        return(
          <View key={index} className='flex flex-row items-center gap-2'>
          <FontAwesome6 size={19} name={"check-circle"} solid/>
          <Text>{item}</Text>
          </View>
        )
      })}
      </View>
      {/* the button */}
      {item.type === "free"?
      <TouchableOpacity onPress={()=>saveAndCreate(item.type)} 
      className='w-full mt-3 py-2 bg-primary-300 rounded-md'>
      <Text className='font-poppins text-white text-center'>Get started</Text>
      </TouchableOpacity>
      :item.type === "pro"?
      <TouchableOpacity onPress={()=>saveAndCreate(item.type)} 
      className='w-full mt-3 py-2 bg-primary-300 rounded-md'>
      <Text className='font-poppins text-white text-center'>Upgrade now</Text>
      </TouchableOpacity>
      :<TouchableOpacity onPress={()=>saveAndCreate(item.type)} 
      className='w-full mt-3 py-2 bg-primary-300 rounded-md'>
       <Text className='font-poppins text-white text-center'>Go Premium</Text>
      </TouchableOpacity>}
      </View>
      </>)}
      />
      </>
    }
    />
    </SafeAreaView>
  )
}

export default add_subscription_plan;