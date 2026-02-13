import { View, Text } from 'react-native'
import React from 'react'

const MyMessage = (props:any) => {
  return (
    <View className='w-full flex flex-row justify-end'>
    {/* the message card */}
    <View className='bg-white shadow-md max-w-[65%] mt-5 rounded-md p-2'>
    <Text>{props.message}</Text>
    </View>
    </View>
  )
}

export default MyMessage;