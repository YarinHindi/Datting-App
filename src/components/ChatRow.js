import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const ChatRow = ({ matchDetails }) => {
  const [matchedUserInfo, setmatchedUserInfo] = useState(null);
  const [URL, setURL] = useState("");
  const [name, setName] = useState("");
  const [docId, setdocId] = useState("");
  const navigation = useNavigation();
  const { currentUser } = firebase.auth();
  let otherUser;
  if (matchDetails.userMatched[0] == currentUser.uid) {
    otherUser = matchDetails.userMatched[1];
  } else {
    otherUser = matchDetails.userMatched[0];
  }
  useEffect(
    () =>
      firestore()
        .collection("users")
        .where("id", "==", otherUser)
        .onSnapshot((snapshot) =>
          setmatchedUserInfo(
            snapshot.docs.map((doc) => ({
                ...doc.data(),

            }))
          )
        ),
    [currentUser]
  );
  const makeUrlName = async () => {
    const photoURL = await matchedUserInfo[0].photoURL;
    const curName = await matchedUserInfo[0].name;
    setURL(photoURL);
    setName(curName);

  };

  makeUrlName();

  return (
    <TouchableOpacity
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          marginHorizontal: 3,
          marginVertical: 1,
          borderRadius: 8,
        },
        styles.cardSahdow,
      ]}
      onPress={() =>
        navigation.navigate("Messages1", {
          matchDetails: {name:name, photo: URL,otherUserId: otherUser,docId:matchDetails.docId},
        })
      }
    >
      <Image
        style={{
          borderRadius: 100,
          height: 40,
          width: 40,
          marginRight: 14,
          marginLeft: 6,
        }}
        // source={{uri: matchedUserInfo?.photoURL}}
        source={{ uri: URL }}
      />

      <View>
        <Text style={{ fontWeight: "bold", fontSize: 18, lineHeight: 28 }}>
          {name}
        </Text>
        <Text>Say Hi!</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;

const styles = StyleSheet.create({
  cardSahdow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});