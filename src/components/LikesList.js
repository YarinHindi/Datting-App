import { View, Text, FlatList, Image, StyleSheet, Button } from "react-native";
import React, { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "@react-native-firebase/auth";
const LikesList = () => {
  const [users, setUsers] = useState([]);
  const [isPremium, setIsPremium] = useState("");
  const navigation = useNavigation();
  const { currentUser } = firebase.auth();
  const userId = currentUser.uid;

  function goPremium() {
    navigation.navigate("PremiumCreation1");
  }

  useEffect(() => {
    firestore()
      .collection("users")
      .where("id", "==", currentUser.uid)
      .onSnapshot((snap) =>
        snap.forEach((documentSnapshot) => {
          setIsPremium(documentSnapshot.data().isPremium);
        })
      );
  }, []);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("users")
      .onSnapshot((snap) => {
        snap.forEach((documentSnapshot) => {
          firestore()
            .collection("users")
            .doc(documentSnapshot.data().id)
            .collection("MySwipes")
            .where("likes", "array-contains", userId)
            .get()
            .then((s) => {
              if (s.size > 0) {
                const user = {
                  key: documentSnapshot.data().id,
                  name: documentSnapshot.data().name,
                  bio: documentSnapshot.data().bio,
                  photoURL: documentSnapshot.data().photoURL,
                };

                // Check if user is already in the array
                const userExists = users.find((u) => u.key === user.key);

                // Only add the user if they are not already in the array
                if (!userExists) {
                  setUsers((prev) => [...prev, user]);
                }
              }
            });
        });
      });

    return () => {
      unsubscribe();
    };
  }, []);

  const updatedUsers = users.filter(
    (user, index, self) => self.findIndex((u) => u.key === user.key) === index
  );

  if (!isPremium) {
    return (
      <View style={styles.container}>
        <Text>Only premium account can see the users who liked them</Text>
        <Text>Join the family!</Text>
        <Button title="Go premium" onPress={goPremium} />
      </View>
    );
  } else {
    return updatedUsers.length > 0 ? (
      <View style={styles.container}>
        <FlatList
          data={updatedUsers}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image style={styles.image} source={{ uri: item.photoURL }} />
              <Text style={styles.name}>{item.name}</Text>
              <Text>{item.bio}</Text>
            </View>
          )}
        />
      </View>
    ) : (
      <View
        style={{ padding: 5, flexDirection: "column", alignItems: "center" }}
      >
        <Text style={{ textAlign: "center", fontSize: 18, lineHeight: 28 }}>
          {" "}
          No one liked you yet
        </Text>
        <Image
          style={{ width: 100, height: 100, margin: "40%" }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/1791/1791330.png",
          }}
        />
      </View>
    );
  }
};

export default LikesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: "lightgray",
    fontSize: 25,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
  },
  image: {
    borderRadius: 100,
    height: 40,
    width: 40,
    marginRight: 14,
    marginLeft: 6,
  },
});
