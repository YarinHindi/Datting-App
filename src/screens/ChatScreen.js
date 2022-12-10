import {SafeAreaView ,View, Text,Image } from 'react-native'
import React from 'react'
import Logo from '../components/Logo'
import ChatList from '../components/ChatList'
import { useRoute } from '@react-navigation/native'

const ChatScreen = ({navigation}) => {
  const userId = useRoute().params.id; 
  let props = {
  userId : userId,
  }
  return (
    <SafeAreaView style = {{flex: 1}}>
      <Logo/>
      <ChatList {...props}/>
    </SafeAreaView>
  )
}

export default ChatScreen