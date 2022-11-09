import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
// Screens
import HomeScreen from '../screens/HomeScreen';
import NewMatchesScreen from '../screens/NewMatchesScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { color } from 'react-native-reanimated';


//Screen names
const homeName = "Home";
const chatName = "Chat";
const newMatchesName = "NewMatches";
const profileName = 'Profile';

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? 'home' : 'home-outline';

          } else if (rn === chatName) {
            iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';

          } else if (rn === newMatchesName) {
            iconName = focused ? 'heart-circle' : 'heart-circle-outline';
          }else if(rn == profileName){
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        
      })}

      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'grey',
        labelStyle: { paddingBottom: 7, fontSize: 10, },
        style: { padding: 10, height: 70}
      }}


      >
      <Tab.Screen name={homeName} options= {{headerShown :false }}  component={HomeScreen} />
      <Tab.Screen name={chatName} options= {{headerShown :false}} component={ChatScreen} />
      <Tab.Screen name={newMatchesName} options= {{headerShown :false}} component={NewMatchesScreen} />
      <Tab.Screen name={profileName} options= {{headerShown :false}} component={ProfileScreen} />

    </Tab.Navigator>
  </NavigationContainer>
   
  );
}

export default MainContainer;