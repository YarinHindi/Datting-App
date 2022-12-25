import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Header = (props) => {
  const navigation = useNavigation();
  const title = props.userInfo.name;
  const photoURL = props.userInfo.photo;
  return (
    <SafeAreaView
      style={{
        padding: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#D3D3D3",
          padding: 3,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ padding: 2 }}
        >
          <Ionicons name="chevron-back-outline" size={28} color="#FF5864" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            lineHeight: 32,
            fontWeight: "bold",
            paddingLeft: 20,
            color: "black",
          }}
        >
          {title}
        </Text>
      </View>
      <View style={{ backgroundColor: "#D3D3D3", padding: 3 }}>
        <Image
          style={{ borderRadius: 100, height: 34, width: 34, marginRight: 15 }}
          source={{ uri: photoURL }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Header;
