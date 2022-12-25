import {
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TextInput,
  Image,
  LogBox,
} from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import ImagePicker from "react-native-image-crop-picker";
import { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

LogBox.ignoreAllLogs();

const UpdateUserData = ({ navigation }) => {
  const { currentUser } = firebase.auth();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [image, setImage] = useState(currentUser.photoURL);

  const uploadImageToStorage = (path, imageName) => {
    let reference = storage().ref(imageName);
    let task = reference.putFile(path);

    task
      .then(() => {
        // 4
        console.log("Image uploaded to the bucket!");
      })
      .catch((e) => console.error("uploading image error => ", e));
  };

  const updateName = () => {
    firestore()
      .collection("users")
      .doc(`${currentUser.uid}`)
      .update({
        id: `${currentUser.uid}`,
        name: `${name ? name : console.warn("no name")}`,
      });
  };

  const updateBio = () => {
    firestore()
      .collection("users")
      .doc(`${currentUser.uid}`)
      .update({
        id: `${currentUser.uid}`,
        bio: `${bio ? bio : console.warn("no bio")}`,
      });
  };

  const updateLookingFor = () => {
    firestore()
      .collection("users")
      .doc(`${currentUser.uid}`)
      .update({
        id: `${currentUser.uid}`,
        lookingFor: `${
          lookingFor ? lookingFor : console.warn("no looking for")
        }`,
      });
  };

  const updateGender = () => {
    firestore()
      .collection("users")
      .doc(`${currentUser.uid}`)
      .update({
        id: `${currentUser.uid}`,
        gender: `${gender ? gender : console.warn("no gender")}`,
      });
  };

  const updatePhoto = async () => {
    uploadImageToStorage(image, `${currentUser.uid}`);
    const ref = firebase.storage().ref(`${currentUser.uid}`);
    const url = await ref.getDownloadURL();

    firestore()
      .collection("users")
      .doc(`${currentUser.uid}`)
      .update({
        id: `${currentUser.uid}`,
        photoURL: `${url}`,
      });
  };

  const save = () => {
    if (name) updateName();
    if (bio) updateBio();
    if (lookingFor) updateLookingFor();
    if (gender) updateGender();
    if (image) updatePhoto();
    alert("We got your data successfully :)");
    navigation.navigate("Home1");
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
    // auth().signOut();
  };

  return (
    <SafeAreaView style={theStyle.root}>
      <ScrollView style={theStyle.container}>
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

export default UpdateUserData;
