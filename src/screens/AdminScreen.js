import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import Header from '../components/Header';
import UsersRowDisplay from '../components/UsersRowDisplay';




const admin= require('firebase-admin')



const serviceAccount = require("C:\Users\yarin\Downloads\datingapp-3423b-firebase-adminsdk-ok7h7-f21f29b81e.json")





admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://datingapp-3423b.firebaseio.com'
});



const AdminScreen = () => {
  const [users,setUsers] = useState([]);


  useEffect(
    ()=> {
    firestore().collection('users').onSnapshot((snap)=>{
      setUsers(snap.docs.map((doc)=>doc.data()))
    })
  } ,[])


  let props = {
    userInfo:{name:'Yarin-Admin',photo:'',}
}

  return (
    <View>
      <Header {...props}  />
      <FlatList
           data={users}
           keyExtractor = {item=> item.id}
           renderItem = {({item}) => <UsersRowDisplay UserDetails = {item}/>}
      
      />
    </View>
  )
}

export default AdminScreen