import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { AntDesign, Feather} from '@expo/vector-icons';

interface IconProps {
  icon:any,
  title:string,
  from:string,
  focused:boolean,
  size:number
}

const TabBarIcon = ({icon,from,focused,title,size}:IconProps)=>{
  if(from === 'ant'){
    return (
      <View className='flex w-full pt-2.5 flex-col items-center'>
      <AntDesign name={icon} size={size}/>
      <Text className='text-xs'>{title}</Text>
      </View>
    )
  }else if(from === 'feat'){
    return(
       <View className='flex w-full pt-2.5 flex-col items-center'>
      <Feather name={icon} size={size}/>
      <Text className='text-xs'>{title}</Text>
      </View>
    )
  }
}

const _layout = () => {
  return (
    <Tabs
    screenOptions={{
        headerShown:false,
        tabBarShowLabel:false,
        tabBarIconStyle:{
          width:'100%'
        }
    }}
    >

    <Tabs.Screen
    name="index"
    options={{
      tabBarIcon:({focused})=>(
        <TabBarIcon 
        icon={'home'} 
        title={'Home'} 
        from={'ant'} 
        focused={focused} size={22}
        />
      )
    }}
    />

    <Tabs.Screen
    name="ask"
    options={{
      tabBarIcon:({focused})=>(
        <TabBarIcon 
        icon={'question-circle'} 
        title={'Ask'} 
        from={'ant'} 
        focused={focused} size={22}
        />
      )
    }}
    />

     <Tabs.Screen
    name="marketplace"
    options={{
      tabBarIcon:({focused})=>(
        <TabBarIcon 
        icon={'shop'} 
        title={'Marktplace'} 
        from={'ant'} 
        focused={focused} size={22}
        />
      )
    }}
    />

     <Tabs.Screen
    name="profile"
    options={{
      tabBarIcon:({focused})=>(
         <TabBarIcon 
        icon={'user'} 
        title={'Profile'} 
        from={'ant'} 
        focused={focused} size={22}
        />
      )
    }}
    />

    </Tabs>
  )
}

export default _layout