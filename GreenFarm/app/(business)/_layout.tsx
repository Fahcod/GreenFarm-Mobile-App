import React from 'react'
import { Tabs } from 'expo-router';
import TabBarIcon from '@/components/TabBarIcon';

const _layout = () => {
  return (
   <Tabs 
   screenOptions={{
        headerShown:false,
        tabBarShowLabel:false,
        tabBarIconStyle:{
          width:'100%'
        }
    }}>

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
    name="messaging"
    options={{
      tabBarIcon:({focused})=>(
        <TabBarIcon
        icon={'message'}
        title={'Chats'}
        from={'ant'} 
        focused={focused} size={22}
        />
      )
    }}
    />

    <Tabs.Screen
    name="stores"
    options={{
      tabBarIcon:({focused})=>(
        <TabBarIcon
        icon={'shop'} 
        title={'Stores'}
        from={'ant'} 
        focused={focused} size={21}
        />
      )
    }}
    />

    <Tabs.Screen
    name="notifications"
    options={{
      tabBarIcon:({focused})=>(
        <TabBarIcon
        icon={'bell'} 
        title={'Alerts'}
        from={'feat'}
        focused={focused} size={21}
        />
      )
    }}
    />

   </Tabs>
  )
}

export default _layout;