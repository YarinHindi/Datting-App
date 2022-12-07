import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
// Screens
;
import NewMatchesScreen from '../screens/NewMatchesScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeBarNavigation from './HomeBarNavigation';

const Stack = createNativeStackNavigator(); 


function MainContainer() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="SignIn1" options= {{headerShown :false }} component ={SignInScreen}/>
      <Stack.Screen name="SignUp1" options= {{headerShown :false }} component ={SignUpScreen}/>
      <Stack.Screen name="Home1" options= {{headerShown :false }} component ={HomeBarNavigation}/>
      <Stack.Screen name="Chat1" options= {{headerShown :false }} component ={ChatScreen}/>
      <Stack.Screen name="Profile1" coptions= {{headerShown :false }} component={ProfileScreen}/>
      <Stack.Screen name="NewMatches1" options= {{headerShown :false }} component={NewMatchesScreen}/>
    </Stack.Navigator>
  </NavigationContainer>
   
  );
}

export default MainContainer;