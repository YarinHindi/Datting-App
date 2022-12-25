import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import Header from '../components/Header';
import UsersRowDisplay from '../components/UsersRowDisplay';



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