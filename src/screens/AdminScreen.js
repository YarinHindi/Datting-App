import { View, Button, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import Header from '../components/Header';
import UsersRowDisplay from '../components/UsersRowDisplay';
import auth from "@react-native-firebase/auth";

const AdminScreen = ({navigation}) => {
  const [users,setUsers] = useState([]);


  useEffect(
    ()=> {
    firestore().collection('users').onSnapshot( async (snap)=>{
      let bans = [];
       let temp_users = [] 
     await firestore().collection('Bans').get().then((doc)=>{
          bans = doc.docs.map((d)=>d.data().id)
          snap.forEach((doc2)=>{
            if(!bans.includes(doc2.data().id)){
                temp_users.push(doc2.data());
            }
            })
        }) 
      let temp_users1 = temp_users.filter((u) => u.id != 'I8TYZWC2bgWVuosPDUOuIT0QF7A2');
      setUsers(temp_users1);
      // setUsers(users.filter((u) => u.id != 'I8TYZWC2bgWVuosPDUOuIT0QF7A2'));
    })
  } ,[])


  let props = {
    userInfo:{name:'Yarin-Admin',photo:'',}
}

const logout = () => {
  auth()
    .signOut()
    .then(() => console.log("User signed out!"));

  navigation.navigate("SignIn1");
};

  return (
    <View>
      <Button title="Log Out" onPress={logout} />
      <FlatList
           data={users}
           keyExtractor = {item=> item.id}
           renderItem = {({item}) => <UsersRowDisplay UserDetails = {item}/>}
      
      />
    </View>
  )
}

export default AdminScreen