import { View, Text,SafeAreaView } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import Header from '../components/Header'


const MessageScreen = () => {
    const {name,photo} = useRoute().params.matchDetails;
    // const userId = useRoute().params.userId;
    // console.log(name);
    // console.log(photo)
    let props = {
        userInfo:{name:name,photo:photo,}
    }
    return (
    <SafeAreaView>
        <Header
            {...props}
        />
        <Text>
            Message Screen
        </Text>
    </SafeAreaView>
  )
}

export default MessageScreen