import { View } from 'react-native';
import React from 'react'

const EmptyNotifications = () => {

    const dummy_data=[1,2,3,4,5,8]

  return (
    <View className='w-full flex-col flex gap-5'>
    {dummy_data.map((item,index)=>{
        return(
            <View className='w-full h-16 rounded-md bg-input' key={index}>
            </View>
        )
    })}
    </View>
  )
}

export default EmptyNotifications;