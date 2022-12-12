
import { View, Text,Image,StyleSheet, ImageBackground,TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Logo from '../components/Logo';
import Card from '../components/Card';
import { useNavigation, useRoute } from '@react-navigation/native';
import NewMatchesScreen from './NewMatchesScreen';
import { async } from '@firebase/util';
import firestore from '@react-native-firebase/firestore';
import { firebase } from "@react-native-firebase/auth";

const HomeScreen = ({navigation}) => {
  const [users,setUsers] = useState([]);
  const [btn,setBtn] = useState(false);
  const { currentUser } = firebase.auth();
  const userId = currentUser.uid;
  const [likes,setLikes] = useState([]);
  const [unlikes,setUnLikes] = useState([])
  const [currentCard,setCurrentCard] = useState(0)
  useEffect(
    ()=>
    firestore().collection('users').where('id','!=',userId).onSnapshot(
      (snapshot)=>setUsers(
        snapshot.docs.map((doc)=>({
          ...doc.data(),
        })

        ).filter((currDoc)=> filterUsers(currDoc))
      )
    ),[likes,unlikes]
  )
  useEffect(
    ()=>
    firestore().collection('users').doc(userId).collection('MySwipes').onSnapshot(
      (snapshot)=>snapshot.forEach(docsnap =>{
        setLikes(docsnap.data().likes);
        setUnLikes(docsnap.data().unlikes);
      })
      ),[]
    )

  const usersfilter = users.map(({id,name,bio,photoURL})=>({id,name,bio,photoURL}))
  const addLikeAndcheckMatch = async () =>{
  try {
    const userRef  = firestore().collection('users').doc(userId).collection('MySwipes');
    console.log((await userRef.get()).size);
   
    if( (await  userRef.get()).size >0){
      userRef.doc(userId).update("likes",firebase.firestore.FieldValue.arrayUnion(users[currentCard].id));
    }else{
      userRef.doc(userId).set({likes:[users[currentCard].id],unlikes:[]})
    }
    const otherUserRef = firestore().collection('users').doc(users[currentCard].id).collection('MySwipes');

    if((await otherUserRef.get()).size>0){
      if ((await otherUserRef.where('likes','array-contains',userId).get()).size>0){
        firestore().collection('matches').add({userMatched:[userId,users[currentCard].id]});
      }
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const unLike = async ()=>{
  try {
    const userRef  = firestore().collection('users').doc(userId).collection('MySwipes');
    console.log((await userRef.get()).size);
    if( (await  userRef.get()).size >0){
      userRef.doc(userId).update("unlikes",firebase.firestore.FieldValue.arrayUnion(users[currentCard].id));
    }else{
      userRef.doc(userId).set({likes:[],unlikes:[users[currentCard].id]})
    } 
  }catch (e) {
      console.error("Error adding document: ", e);
    }
}

  const SwipeRight = ()=>{
    if(users.length>0){
    addLikeAndcheckMatch();
    }
    nextCard();
  };
  const SwipeLeft = ()=>{
    if(users.length>0){
    unLike();
    }
    nextCard();
  };
  const nextCard = ()=>{
    if (users.length>currentCard){
      setCurrentCard((prev)=>prev+1);
    }
      
    //   if(users.length-1==currentCard ||users.length==0){
    //     setBtn((prev)=>prev=true);
    //     console.warn('Stack card is epmty!!')  
      
    // }
}
  const fetchCard = ()=>{
    if(users.length>currentCard){
      const props = {
        user: usersfilter[currentCard],
        
      }
      return props
      }else{
        const props = {
          user: {id:'-1',name:'None',bio:'None',photoURL:'None'},
          
      }
      return props
    }
  }
  let props = fetchCard();

  const filterUsers = (doc)=>{
      if(likes.some(item=> item==doc.id) || unlikes.some(item=> item==doc.id)){
        return false;
      }else{
        return true;
      }
  }
  
// console.log(likes);
// console.log(unlikes);
// console.log(users.length)
// console.log(currentCard);
useEffect(()=>{
  if(users.length==currentCard ||users.length==0){
    setBtn((prev)=>prev=true);
    if(users.length==0){
      setCurrentCard(0);
    }  
}else{
  setBtn((prev)=>prev=false);
}

}

)
 
  return (
      <View style = {{flex :1}} >
        <View>
          <Logo/>
          <View style = {{flexDirection:'row',justifyContent:'space-evenly'}}>
          <TouchableOpacity disabled={btn} onPress={()=>SwipeLeft()} >
                <Image  style = {{height:30,width:30,borderColor:'red'}}
                        source = {{uri:'https://cdn-icons-png.flaticon.com/128/1828/1828665.png'}}/>    
          </TouchableOpacity>
          <TouchableOpacity disabled={btn} onPress={()=>SwipeRight()} >
                <Image  style = {{height:30,width:30}}
                        source = {{uri:'https://cdn-icons-png.flaticon.com/128/390/390973.png'}}/>
          </TouchableOpacity>
          </View>
            <Card {...props} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "95%",
    height: "85%",
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  animatedCard: {
    width: "100%",
    height: "100%",
    // alignItems : 'center',
    //  justifyContent: 'center',
  },
});
export default HomeScreen;
