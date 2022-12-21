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
  const [likes,setLikes] = useState([]);
  const [unlikes,setUnLikes] = useState([])
  const [users,setUsers] = useState([]);
  const [btn,setBtn] = useState(false);
  const { currentUser } = firebase.auth();
  const userId = currentUser.uid;
  const [currentCard,setCurrentCard] = useState(0)
  const [swipeBlock,setSwipeBlock] = useState(false);
  const numOfSwipesTillBlock = 3;
  const [swipeCounter,setswipeCounter] = useState(0);
  const [lastSwipeTime,setLastSwipeTime] = useState(0);
  const [isPremium, setIsPremium] = useState("");
  const timeStamp = new Date();
  useEffect(
    () => {
     firestore().collection('users').where('id', '!=', userId).get().then((snap)=>
     {
      let testUsers = snap.docs.map(doc =>doc.data());
           firestore().collection('users').doc(userId).collection('MySwipes').get().then((swipe) => {
            
            let swipeTime = swipe.docs.map(doc => doc.data().lastSwipeTime);

            if(swipeTime.length>0)setLastSwipeTime(swipeTime[0])
            let testUnLikes = [];
            let testLikes = [];
            let testUnlikesBefore = swipe.docs.map(doc => doc.data().unlikes);

            if(testUnlikesBefore.length>0) testUnLikes = testUnlikesBefore[0];
            
            
            let testLikesBefore = swipe.docs.map(doc => doc.data().likes);
            if(testLikesBefore.length>0)testLikes = testLikesBefore[0];
            let swipes = [...testLikes,...testUnLikes];
            let filteredArr = testUsers.filter(u => !swipes.find(un => u.id == un));
            console.log(filteredArr);
            setUsers(filteredArr)
           })
     }

     );
    },[]);
      
 
  const usersfilter = users.map(({id,name,bio,photoURL})=>({id,name,bio,photoURL}))
  const addLikeAndcheckMatch = async () =>{
  try {
    const userRef  = firestore().collection('users').doc(userId).collection('MySwipes');
    console.log((await userRef.get()).size);
   
    if( (await  userRef.get()).size >0){
      userRef.doc(userId).update("likes",firebase.firestore.FieldValue.arrayUnion(users[currentCard].id));
      userRef.doc(userId).update("lastSwipeTime",firebase.firestore.Timestamp.now().toMillis());
    }else{
      userRef.doc(userId).set({likes:[users[currentCard].id],unlikes:[],lastSwipeTime
        : firebase.firestore.Timestamp.now().toMillis()})
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
    if( (await  userRef.get()).size >0){
      userRef.doc(userId).update("unlikes",firebase.firestore.FieldValue.arrayUnion(users[currentCard].id));
    }else{
      userRef.doc(userId).set({likes:[],unlikes:[users[currentCard].id],
        lastSwipeTime:0})
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
  const nextCard = async ()=>{
    if (users.length>currentCard){
      const inc  = firebase.firestore.FieldValue.increment(1);
      await firestore().collection('users').doc(userId).update({
        swipeCounter : inc,
      });
      setCurrentCard((prev)=>prev+1);
      setswipeCounter((prev)=>prev+1);
      setLastSwipeTime(timeStamp.getTime());
    }
  }
  const fetchCard = ()=>{
    if(users.length>currentCard){
      const props = {
        user: usersfilter[currentCard],
        blocked:swipeBlock,
      }
      return props
      }else{
        const props = {
          user: {id:'-1',name:'None',bio:'None',photoURL:'None'},
          blocked:swipeBlock,    
      }
      return props
    }
  }

  
useEffect(()=>{
  if(users.length==currentCard ||users.length==0||swipeBlock){
    setBtn((prev)=>prev=true);
    if(users.length==0){
      setCurrentCard(0);
    }
}else{
  setBtn((prev)=>prev=false);
}

})

useEffect(() => {
  firestore()
    .collection("users")
    .where("id", "==", currentUser.uid)
    .onSnapshot((snap) =>
      snap.forEach(
        (documentSnapshot) => {
          setIsPremium(documentSnapshot.data().isPremium);
          setswipeCounter(documentSnapshot.data().swipeCounter);
        }
      )
    );
}, []);


useEffect(
  ()=>{
    let timeInMil = timeStamp.getTime();
    
    firestore().collection('users').doc(userId).collection('MySwipes').doc(userId).get().then((doc)=>{
      let lastSwipe =doc.data().lastSwipeTime;
      const milDiff = Math.abs(timeInMil-lastSwipe);
      const msInHour = 1000*60*60;;
      const hoursDiff = Math.round(milDiff/msInHour)
      if(swipeCounter>=numOfSwipesTillBlock && hoursDiff<=12 && !isPremium){
        setSwipeBlock(true)
      }else{
        if(hoursDiff>24)firestore().collection('users').doc(userId).update('swipeCounter',0)
        setSwipeBlock(false);      
      }
    })

});





let props = fetchCard();
  return (
      <View style = {{flex :1}} >
        <View>
          <Logo/>
          {/* if user is not premium */}
          {/* <Button title='Go premium' onPress={goPremium}/> */}
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
          <Card {...props}/>
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