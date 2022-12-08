import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import ImagePicker from "react-native-image-crop-picker";
import { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const ProfileScreen = () => {
  const { currentUser } = firebase.auth();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [image, setImage] = useState(currentUser.photoURL);

  const save = async () => {
    try {
      await firestore()
        .collection("users")
        .add({
          id: `${currentUser.uid}`,
          name: `${name ? name : console.warn("no name")}`,
          photoURL: `${image ? image : console.warn("no image")}`,
          bio: `${bio ? bio : console.warn("no bio")}`,
          lookingFor: `${
            lookingFor ? lookingFor : console.warn("no looking for")
          }`,
          gender: `${gender ? gender : console.warn("no gender")}`,
          isPremium: false,
        });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    alert("We got your data successfully :)");
  };

  const uploadImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then((image) => {
      path = image.path;
      setImage(image.path);
      currentUser.updateProfile({
        photoURL: image.path,
      });
    });
  };

  const logOutF = () => {
    console.warn(currentUser.photoURL);
  };

  return (
    <SafeAreaView style={theStyle.root}>
      <View style={theStyle.container}>
        <Image
          style={theStyle.images}
          source={{
            uri: image,
          }}
        ></Image>
        <Pressable onPress={uploadImage} style={theStyle.button}>
          <Text>Upload Image</Text>
        </Pressable>
        <TextInput
          style={theStyle.input}
          placeholder="Name..."
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={theStyle.input}
          placeholder="bio..."
          multiline
          numberOfLines={3}
          value={bio}
          onChangeText={setBio}
        />
        <Text>Gender</Text>
        <Picker
          label="Gender"
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="Male" value="MALE" />
          <Picker.Item label="Female" value="FEMALE" />
        </Picker>
        <Text>Looking for</Text>
        <Picker
          label="Looking for"
          selectedValue={lookingFor}
          onValueChange={(itemValue) => setLookingFor(itemValue)}
        >
          <Picker.Item label="Male" value="MALE" />
          <Picker.Item label="Female" value="FEMALE" />
        </Picker>
        <Pressable onPress={save} style={theStyle.button}>
          <Text>Save</Text>
        </Pressable>
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
  input: {
    margin: 10,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
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
    height: 100,
    width: 100,
    borderRadius: 15,
  },
});

export default ProfileScreen;
