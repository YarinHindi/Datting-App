import {
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Pressable,
  Button,
} from "react-native";
import React, { useState } from "react";
import auth, { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const ProfileScreen = ({ navigation }) => {
  const { currentUser } = firebase.auth();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [image, setImage] = useState(currentUser.photoURL);

  const edit = () => {
    navigation.navigate("Data2");
  };

  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log("User signed out!"));

    navigation.navigate("SignIn1");
  };

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
          setImage(documentSnapshot.data().photoURL);
        });
      });
  };

  const reloadData = () => {
    setDatas(currentUser);
  };

  setDatas(currentUser);

  return (
    <SafeAreaView style={theStyle.root}>
      <ScrollView style={theStyle.container}>
        <Pressable onPress={reloadData} style={theStyle.reload}>
          <Text>Reload Data</Text>
        </Pressable>
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
        <Pressable onPress={edit} style={theStyle.button}>
          <Text>Edit Profile</Text>
        </Pressable>
        <Pressable onPress={logout} style={theStyle.button}>
          <Text>Log Out</Text>
        </Pressable>
      </ScrollView>
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
    backgroundColor: "#FFCCCB",
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    margin: 10,
  },
  reload: {
    backgroundColor: "#FFCCCB",
    height: 70,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
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
