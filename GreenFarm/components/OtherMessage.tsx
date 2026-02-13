import { View, Text } from 'react-native'
import React from 'react'

const OtherMessage = (props:any) => {
  return (
    <View className='w-full flex flex-row justify-start'>
    {/* the message card */}
    <View className='bg-green-50 shadow-md max-w-[65%] mt-5 rounded-md p-2'>
    <Text>{props.message}</Text>
    </View>
    </View>
  )
}

export default OtherMessage;