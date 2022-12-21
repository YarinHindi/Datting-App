import { View, Text, FlatList,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';
import { firebase } from "@react-native-firebase/auth";
import Header from './Header';
import ChatRow from './ChatRow';
const ChatList = () => {
    const [matches,setMatches] = useState([]);
    const navigation = useNavigation();
    const { currentUser } = firebase.auth();
    const userId = currentUser.uid;
    useEffect(
        () =>
         firestore().collection("matches").where('userMatched','array-contains',userId).onSnapshot(
            (snapshot)=>setMatches(
                snapshot.docs.map((doc)=>({
                    docId:doc.id,
                    ...doc.data(),
                }))
            )
        ),[userId]
    );

    return (
        matches.length > 0 ?(
            <FlatList 
            data={matches}
            
            keyExtractor = {item=> item.id}
            renderItem = {({item}) => <ChatRow matchDetails = {item}/>}
            />
        ) :(
        <View style ={{padding :5,flexDirection:'column',alignItems:'center'}}>
            <Text  style ={{textAlign:'center',fontSize:18,lineHeight: 28 }}> No matches at the moment</Text>
            <Image
             style = {{width:100, height:100,margin:'40%' }}
             source = {{uri:'https://cdn-icons-png.flaticon.com/128/1791/1791330.png'}}
            />
        </View>

        )
  )
}

export default ChatList