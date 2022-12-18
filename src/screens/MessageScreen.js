import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  ImageBackground,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import Header from "../components/Header";
import { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import ProfileScreen from "./ProfileScreen";
import { async } from "@firebase/util";
import SenderMessage from "../components/SenderMessage";
import ReceiverMessage from "../components/ReceiverMessage";
import Modal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";

const MessageScreen = () => {
  const { name, photo, otherUserId, docId } = useRoute().params.matchDetails;
  const { currentUser } = firebase.auth();
  const [currentUserDetials, setCurrentUserDetials] = useState([]);
  const [currentUserURL, currentUserSetURL] = useState("");
  const [currentUsername, currentUserSetName] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [reason, setReason] = useState("Nudity");

  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  useEffect(
    () =>
      firestore()
        .collection("matches")
        .doc(docId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              ...doc.data(),
            }))
          )
        ),
    []
  );

  useEffect(
    () =>
      firestore()
        .collection("users")
        .where("id", "==", currentUser.uid)
        .onSnapshot((snapshot) =>
          setCurrentUserDetials(
            snapshot.docs.map((doc) => ({
              ...doc.data(),
            }))
          )
        ),
    []
  );

  const report = async () => {
    try {
      await firestore()
        .collection("reports")
        .add({
          id: `${otherUserId}`,
          reason: `${reason}`,
        });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    alert("We got your report successfully :)");
    handleModal();
  };

  const makeUrlName = async () => {
    const photoURL = await currentUserDetials[0].photoURL;
    const curName = await currentUserDetials[0].name;
    currentUserSetURL(photoURL);
    currentUserSetName(curName);
  };
  makeUrlName();
  const sendMessage = async () => {
    await firestore()
      .collection("matches")
      .doc(docId)
      .collection("messages")
      .add({
        timestamp: firebase.firestore.Timestamp.now().toMillis(),
        senderId: currentUser.uid,
        senderName: currentUsername,
        senderphotoURL: currentUserURL,
        message: input,
      })
      .then(setInput(""));
  };

  let props = {
    userInfo: { name: name, photo: photo },
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        style={{ flex: 1 }}
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzKq99XaTnbfYjwYCr0gLVB95Fyy4Gkn8w9w&usqp=CAU",
        }}
      >
        <Header {...props} />

        <Pressable onPress={handleModal} style={styles.button}>
          <Text style={{ color: "#FFFFFF" }}>Report</Text>
        </Pressable>

        <Modal style={styles.modal} isVisible={isModalVisible}>
          <View style={{ flex: 1 }}>
            <Text style={styles.text}>You are about to report: "{name}"</Text>
            <Text style={styles.text}>Please choose a reason:</Text>
            <Picker
              label="Reason"
              selectedValue={reason}
              onValueChange={(itemValue) => setReason(itemValue)}
            >
              <Picker.Item label="Nudity" value="Nudity" />
              <Picker.Item label="Verbal Abuse" value="Verbal Abuse" />
              <Picker.Item
                label="Underage Usage (18+ only)"
                value="Underage Usage"
              />
              <Picker.Item label="Fake Profile" value="Fake Profile" />
              <Picker.Item label="Prostitution" value="Prostitution" />
            </Picker>
            <Pressable onPress={report} style={styles.button2}>
              <Text style={{ color: "black", fontSize: 35 }}>Submit</Text>
            </Pressable>
          </View>
        </Modal>

        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={10}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <FlatList
              data={messages}
              inverted={-1}
              style={{ paddingLeft: 4 }}
              keyExtractor={(item) => item.id}
              renderItem={({ item: message }) =>
                message.senderId == currentUser.uid ? (
                  <SenderMessage key={message.id} message={message} />
                ) : (
                  <ReceiverMessage key={message.id} message={message} />
                )
              }
            />
          </TouchableWithoutFeedback>
          <View style={styles.textCont}>
            <TextInput
              style={{
                height: 40,
                fontWeight: "400",
                color: "green",
                fontSize: 18,
                lineHeight: 28,
              }}
              placeholder="Send Message...."
              onChangeText={setInput}
              onSubmitEditing={sendMessage}
              value={input}
            />
            <Button onPress={sendMessage} title="Send" color="#FF5864" />
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  textCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: "#FFFFFF",
    paddingHorizontal: 5,
    paddingVertical: 2,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#B33A3A",
    height: 70,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    margin: 10,
  },
  button2: {
    backgroundColor: "#B33A3A",
    marginTop: 15,
    paddingVertical: 15,
    borderRadius: 25,
    width: "80%",
    alignItems: "center",
    alignSelf: "center",
  },
  text: {
    color: "black",
    fontWeight: "700",
    alignSelf: "center",
    fontSize: 35,
    paddingTop: 20,
  },
  modal: {
    backgroundColor: "#ffffff",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
  },
});
export default MessageScreen;
