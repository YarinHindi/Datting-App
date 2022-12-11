import {SafeAreaView ,View, Text,Image } from 'react-native'
import React from 'react'
import Logo from '../components/Logo'
import ChatList from '../components/ChatList'
import { useRoute } from '@react-navigation/native'

const ChatScreen = ({navigation}) => {

  return (
    <SafeAreaView style = {{flex: 1}}>
      <Logo/>
      <ChatList/>
    </SafeAreaView>
  )
}

export default ChatScreen