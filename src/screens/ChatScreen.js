import { SafeAreaView, LogBox } from "react-native";
import React from "react";
import Logo from "../components/Logo";
import ChatList from "../components/ChatList";

LogBox.ignoreAllLogs();

const ChatScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Logo />
      <ChatList />
    </SafeAreaView>
  );
};

export default ChatScreen;
