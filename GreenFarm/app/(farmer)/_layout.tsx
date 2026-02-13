import React from 'react';
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
        title={'Q&A'} 
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