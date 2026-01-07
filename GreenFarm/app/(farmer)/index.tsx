import { StatusBar, SectionList } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainHeader from '@/components/MainHeader';
import VideoContainer from '@/components/Containers/VideoContainer';
import LatestArticles from '@/components/Containers/LatestArticles';
import SuggestedProducts from '@/components/Containers/SuggestedProducts';


const index = () => {

  const SECTIONS = [
    {type:'videos',data:[1]},
    {type:'products',data:[1]},
    {type:'videos',data:[1]},
    {type:'articles',data:[1]}
  ];

  // the funciton to render a section by its content type
  const renderItem = ({section}:{section:{type:string,data:number[]}})=>{
     switch(section.type){
        
      case "videos":
        return <VideoContainer/>;
      
      case "articles":
        return <LatestArticles/>

      case "products":
        return <SuggestedProducts/>

      default:
        return <></>
     }
  }

  return (
    <SafeAreaView edges={["top","left","right"]} className='flex-1 bg-white'>
    <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'}/>
    <MainHeader/>
    <SectionList
     sections={SECTIONS}
     renderItem={renderItem}
     showsVerticalScrollIndicator={false}
     keyExtractor={(item,index)=>index.toString()}
     contentContainerStyle={{paddingBottom:20,paddingHorizontal:10}}
    />
    
    </SafeAreaView>
  )
}

export default index;