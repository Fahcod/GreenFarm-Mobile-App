import { View } from 'react-native';
import React from 'react'

// this component is to be used as an 'hr' element like that in html
const HorizontalRule = (props:{mt:number}) => {
  return (
    <View style={{width:'100%',marginTop:props.mt,height:1,backgroundColor:'#f3f4f6'}}>
    </View>
  )
}

export default HorizontalRule;