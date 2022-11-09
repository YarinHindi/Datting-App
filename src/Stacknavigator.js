import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ChatScreen from './screens/ChatScreen';
import HomeScreen from './screens/HomeScreen';
import NewMatchesScreen from './screens/NewMatchesScreen';
import ProfileScreen from './screens/ProfileScreen';
import { useNavigation } from '@react-navigation/native';
const Stack = createNativeStackNavigator();


const Stacknavigator = () => {
  return (
    <Stack.Navigator>
      
        <Stack.Screen name  = "HomeScreen" component={HomeScreen}/>
        <Stack.Screen name  = "ChatScreen" component={ChatScreen}/>
        <Stack.Screen name  = "NewMatchesScreen" component= {NewMatchesScreen}/>
        <Stack.Screen name  = "ProfileScreen" component= {ProfileScreen}/>
         
    </Stack.Navigator>

    
  )
}

export default Stacknavigator