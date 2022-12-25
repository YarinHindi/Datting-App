import { SafeAreaView, LogBox } from "react-native";
import React from "react";
import Logo from "../components/Logo";
import LikesList from "../components/LikesList";

LogBox.ignoreAllLogs();

const LikesScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Logo />
      <LikesList />
    </SafeAreaView>
  );
};

export default LikesScreen;
