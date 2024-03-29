import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  LogBox,
} from "react-native";
import auth, { firebase} from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import Logo from "../components/Logo";

LogBox.ignoreAllLogs();

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  function Login() {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    let admin_id = 'I8TYZWC2bgWVuosPDUOuIT0QF7A2';

    // Handle user state changes
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
    }

    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    if (user) {
      const { currentUser } = firebase.auth();
      const userId = currentUser.uid;

      if (userId == admin_id) {
        navigation.navigate("Admin1");
      }
      else {
        navigation.navigate("Home1");
      }  
    }
  }

  function enter() {
    auth()
      .signInWithEmailAndPassword(email, pass)
      .then(() => {
        console.log("User account signed in!");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }

        console.error(error);
      });
  }

  function check() {
    navigation.navigate("SignUp1");
  }

  return (
    <View>
      <Logo />
      <Login />
      <TextInput
        style={styles.input}
        placeholder="Enter your mail"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={pass}
        onChangeText={setPass}
      />
      <Button title="Sign in" onPress={enter}></Button>
      <Text>First time here?</Text>
      <Button title="sign up" onPress={check} />
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  input: {
    width: "90%",
    fontSize: 15,
    padding: 8,
    borderColor: "gray",
    borderWidth: 0.2,
    borderRadius: 10,
  },
});
