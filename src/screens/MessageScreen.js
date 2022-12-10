import { View, Text,SafeAreaView } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import Header from '../components/Header'


const MessageScreen = () => {
    const matchDetails = useRoute().params.matchDetails;
    // const userId = useRoute().params.userId;

    return (
    <SafeAreaView>
        <Header
            title = 'yarin'
        />
        <Text>
            Message Screen
        </Text>
    </SafeAreaView>
  )
}

export default MessageScreen