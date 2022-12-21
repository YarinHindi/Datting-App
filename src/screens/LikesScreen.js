import {SafeAreaView ,View, Text,Image } from 'react-native'
import React from 'react'
import Logo from '../components/Logo'
import LikesList from '../components/LikesList'
import { useRoute } from '@react-navigation/native'

const LikesScreen = ({navigation}) => {
  return (
    <SafeAreaView style = {{flex: 1}}>
      <Logo/>
      <LikesList/>
    </SafeAreaView>
  )
}

export default LikesScreen