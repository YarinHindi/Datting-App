import { View, Text,Image } from 'react-native'
import React from 'react'

const Logo = () => {
  return (
    <View style = {{alignItems :'center'}}>
        <Image
        style = {{width:50, height:50 , alignItems: 'flex-start' }}
        source = {require('../../data/images/logo.png')}/>
    </View>
  )
}

export default Logo