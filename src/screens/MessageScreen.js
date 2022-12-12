import { View, 
    Text,SafeAreaView, 
    TextInput,StyleSheet,
    Button, 
    KeyboardAvoidingView,
    Platform, 
    TouchableWithoutFeedback,
    Keyboard,
    FlatList,
} from 'react-native'
import React, { useState,useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import Header from '../components/Header'
import { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import ProfileScreen from './ProfileScreen';
import { async } from '@firebase/util';
import SenderMessage from '../components/SenderMessage';
import ReceiverMessage from '../components/ReceiverMessage';


const MessageScreen = () => {
    const {name,photo,otherUserId,docId} = useRoute().params.matchDetails;
    const { currentUser } = firebase.auth();
    const [currentUserDetials,setCurrentUserDetials] = useState([]);
    const [currentUserURL, currentUserSetURL] = useState("");
    const [currentUsername, currentUserSetName] = useState("");
    const [input,setInput] = useState("");
    const [messages,setMessages] = useState([]);
    
    useEffect(
        ()=>
        firestore().collection('matches').doc(docId).collection('messages')
        .orderBy("timestamp","desc").onSnapshot(
          (snapshot)=>setMessages(
            snapshot.docs.map((doc)=>({
              ...doc.data(),
            })
    
            )
          )
        ),[]
      )


    useEffect(
        ()=>
        firestore().collection('users').where('id','==',currentUser.uid).onSnapshot(
          (snapshot)=>setCurrentUserDetials(
            snapshot.docs.map((doc)=>({
              ...doc.data(),
            })
    
            )
          )
        ),[]
      )
 
      const makeUrlName = async () => {
        const photoURL = await currentUserDetials[0].photoURL;
        const curName = await currentUserDetials[0].name;
        currentUserSetURL(photoURL);
        currentUserSetName(curName);
    
      };
      makeUrlName();
    const sendMessage = async () =>{
        await firestore().collection('matches').doc(docId).collection('messages').add({      
                timestamp: firebase.firestore.Timestamp.now().toMillis(),
                senderId:currentUser.uid,
                senderName : currentUsername,
                senderphotoURL:currentUserURL,
                message:input,            
            }).then(setInput(""))
    };

    let props = {
        userInfo:{name:name,photo:photo,}
    }
    return (
    <SafeAreaView style={{flex:1}}>
        <Header
            {...props}
        />
        <KeyboardAvoidingView
        behavior={Platform.OS=="ios" ? 'padding': "height"}
        style={{flex:1}}
        keyboardVerticalOffset={10}
        >

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <FlatList
        data={messages}
        inverted={-1}
        style={{paddingLeft:4}}
        keyExtractor={item=>item.id}
        renderItem = {({ item : message})=>
        message.senderId==currentUser.uid ? (
            <SenderMessage key={message.id} message={message}/>
        ):(
            <ReceiverMessage key={message.id} message={message}/>
        )
    }

        />
        </TouchableWithoutFeedback>

      <View style={styles.textCont}>
            <TextInput style ={{height:40,fontWeight:'400' ,color:'green',fontSize:18,lineHeight:28,}}
                        placeholder="Send Message...."
                        onChangeText={setInput}
                        onSubmitEditing={sendMessage}
                        value = {input}
            />
            <Button onPress={sendMessage} title="Send" color="#FF5864"  />
            
        </View>

        </KeyboardAvoidingView>
  
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    textCont: {
        flexDirection:'row',
        justifyContent:'space-between',
        borderTopWidth:1,
        borderColor:'#FFFFFF',
        paddingHorizontal:5,
        paddingVertical:2,
    },
});
export default MessageScreen