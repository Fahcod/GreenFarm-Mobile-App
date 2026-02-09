import { AntDesign, Feather} from '@expo/vector-icons';
import { View, Text } from 'react-native';

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
      <AntDesign name={icon} color={focused?'#16a34a':''} size={size}/>
      <Text className={`text-xs ${focused?'text-[#16a34a]':''}`}>{title}</Text>
      </View>
    )
  }else if(from === 'feat'){
    return(
       <View className='flex w-full pt-2.5 flex-col items-center'>
      <Feather name={icon} color={focused?'#16a34a':''} size={size}/>
      <Text className={`text-xs ${focused?'text-[#16a34a]':''}`}>{title}</Text>
      </View>
    )
  }
}

export default TabBarIcon;