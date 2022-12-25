import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  LogBox,
} from "react-native";
import auth from "@react-native-firebase/auth";
import Logo from "../components/Logo";

LogBox.ignoreAllLogs();

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [user, setUser] = useState();
  function Login() {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);

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
      navigation.navigate("Set User Data");
    }
  }

  function create() {
    auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(() => {
        console.log("User account created & signed in!");
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
    navigation.navigate("SignIn1");
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
        placeholder="Enter desired password"
        value={pass}
        onChangeText={setPass}
      />
      <Button title="Sign up" onPress={create}></Button>
      <Text>Returning user? </Text>
      <Button title="sign in" onPress={check} />
    </View>
  );
};

export default SignUpScreen;

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
