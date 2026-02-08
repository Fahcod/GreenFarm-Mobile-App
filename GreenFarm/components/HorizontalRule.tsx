import { View } from 'react-native';
import React from 'react'

// this component is to be used as an 'hr' element like that in html
const HorizontalRule = (props:{mt:number,mb?:number,bg?:string}) => {
  return (
    <View style={{width:'100%',
    marginTop:props.mt,
    height:1,
    marginBottom:props.mb,
    backgroundColor:props.bg?props.bg:'#f3f4f6'}}>
    </View>
  )
}

export default HorizontalRule;