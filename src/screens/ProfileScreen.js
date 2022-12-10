import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import React, { useState } from "react";
import { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const ProfileScreen = () => {
  const { currentUser } = firebase.auth();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [image] = useState(currentUser.photoURL);

  const setDatas = (currentUser) => {
    firestore()
      .collection("users")
      // Filter results
      .where("id", "==", currentUser.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          setBio(documentSnapshot.data().bio);
          setLookingFor(documentSnapshot.data().lookingFor);
          setGender(documentSnapshot.data().gender);
          setName(documentSnapshot.data().name);
        });
      });
  };

  setDatas(currentUser);

  return (
    <SafeAreaView style={theStyle.root}>
      <View style={theStyle.container}>
        <Image
          style={theStyle.images}
          source={{
            uri: image,
          }}
        ></Image>
        <Text style={theStyle.text1}>Name:</Text>
        <Text style={theStyle.text2}>{name}</Text>
        <Text style={theStyle.text1}>Bio:</Text>
        <Text style={theStyle.text2}>{bio}</Text>
        <Text style={theStyle.text1}>Gender:</Text>
        <Text style={theStyle.text2}>{gender}</Text>
        <Text style={theStyle.text1}>Looking for:</Text>
        <Text style={theStyle.text2}>{lookingFor}</Text>
      </View>
    </SafeAreaView>
  );
};

const theStyle = StyleSheet.create({
  root: {
    width: "100%",
    flex: 1,
    padding: 10,
  },
  container: {
    padding: 10,
  },
  text1: {
    fontSize: 20,
    textAlign: "center",
  },
  text2: {
    margin: 10,
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
    backgroundColor: "#ADD8E6",
    borderRadius: 20,
  },
  button: {
    backgroundColor: "#ADD8E6",
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    margin: 10,
  },
  images: {
    height: 170,
    width: 170,
    borderRadius: 15,
    alignSelf: "center",
    marginBottom: 7,
  },
});

export default ProfileScreen;
