import { View, Text, Button } from 'react-native'
import React, {useState, useEffect} from 'react'
import Logo from '../components/Logo'
import auth from '@react-native-firebase/auth';
import { useNavigation, useRoute } from '@react-navigation/native';

const ProfileScreen = ({navigation}) => {
  const userId = useRoute().params.id;
  console.warn(userId);
  function Login() {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
  
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
  
    if (!user) {
      navigation.navigate("SignIn1");
    }
  }

  function logOff() {
    auth()
    .signOut()
    .then(() => console.log('User signed out!'));
  }

  return (
    <View>
      <Logo/>
      <Login/>
      <Text>ProfileScreen</Text>
      <Button title='logoff' onPress={logOff}/>
    </View>
  )
}

export default ProfileScreen