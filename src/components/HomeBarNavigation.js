import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LikesScreen from "../screens/LikesScreen";

const HomeBarNavigation = () => {
  const homeName = "Home";
  const chatName = "Chat";
  const likesName = "Likes";
  const profileName = "Profile";
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === chatName) {
            iconName = focused
              ? "chatbubble-ellipses"
              : "chatbubble-ellipses-outline";
          } else if (rn == likesName) {
            iconName = focused ? "heart" : "heart-outline";
          } else if (rn == profileName) {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "grey",
        labelStyle: { paddingBottom: 7, fontSize: 10 },
        style: { padding: 10, height: 70 },

        // "tabBarActiveTintColor": "tomato",
        // "tabBarInactiveTintColor": "grey",
        // "tabBarLabelStyle": {
        //   "paddingBottom": 7,
        //   "fontSize": 10
        // },
        // "tabBarStyle": [
        //   {
        //     "display": "flex"
        //   },
        //   null
        // ]
      }}
    >
      <Tab.Screen
        name={homeName}
        options={{ headerShown: false }}
        component={HomeScreen}
      />
      <Tab.Screen
        name={chatName}
        options={{ headerShown: false }}
        component={ChatScreen}
      />
      <Tab.Screen
        name={likesName}
        options={{ headerShown: false }}
        component={LikesScreen}
      />
      <Tab.Screen
        name={profileName}
        options={{ headerShown: false }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default HomeBarNavigation;
