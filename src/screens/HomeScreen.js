import { View, Text,Image,StyleSheet, ImageBackground,TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Logo from '../components/Logo';
import Card from '../components/Card';
import Users from '../../data/Users';
import { useNavigation, useRoute } from '@react-navigation/native';
import NewMatchesScreen from './NewMatchesScreen';
import {app,db,getFirestore, collection, addDoc} from "../../firebase/index";
import { async } from '@firebase/util';
import firestore, { firebase } from '@react-native-firebase/firestore';



const HomeScreen = ({navigation}) => {
  const [users,setUsers] = useState([]);
  const [btn,setBtn] = useState(false);
  const userId = useRoute().params.id;
  const [currentCard,setCurrentCard] = useState(0)
  useEffect(
    ()=>
    firestore().collection('users').where('id','!=',userId).onSnapshot(
      (snapshot)=>setUsers(
        snapshot.docs.map((doc)=>({
          ...doc.data(),
        })

        )
      )
    ),[]
  )
  const usersfilter = users.map(({id,name,bio,photoURL})=>({id,name,bio,photoURL}))
  const addLikeAndcheckMatch = async () =>{
  try {
    firestore().collection('likes').add({swippingUser: userId, swippedUser:users[currentCard].id });
    let flag =  false;
    (await firestore().collection('likes').where('swippingUser','==',users[currentCard].id).get()).forEach(
      (doc)=>{
        if(doc.data().swippedUser==userId){
            flag = true;
        }
      }
    )
    console.warn(flag);

    if(flag){
      firestore().collection('matches').add({userMatched:[userId,users[currentCard].id]});
      // navigation.navigate('NewMatches1');
    }

    // await firestore().collection('matches').add({userMatched:[userId,Users[currentCard].id]});
    // const a = (await firestore().collection('matches').where('userMatched','array-contains',userId).get()).docs.map((doc)=>({
    //   ...doc.data(),
    // })

    // );
    // console.log(a);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const unLike = async ()=>{
 await  firestore().collection('unlikes').add({swippingUser: userId, swippedUser:users[currentCard].id });
}
  const SwipeRight = ()=>{
    addLikeAndcheckMatch();
    nextCard();
  };
  const SwipeLeft = ()=>{
    unLike();
    nextCard();
  };
  const nextCard = ()=>{
    if (users.length>currentCard){
      setCurrentCard((prev)=>prev+1);
      
      if(users.length-1==currentCard){
        setBtn((prev)=>prev=true);
        console.warn('Stack card is epmty!!')  
      }
    }
}
  const fetchCard = ()=>{
    if(users.length>currentCard){
      const props = {
        user: usersfilter[currentCard],
        userId:userId,
      }
      return props
      }else{
        const props = {
          user: {id:'-1',name:'None',bio:'None',photoURL:'None'},
          userId:userId,
      }
      return props
    }
  }
  let props = fetchCard();
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
  )
}

const styles = StyleSheet.create({
  pageContainer:{
    justifyContent : 'center',
    alignItems : 'center',
  },
  card:{
    width : '95%',
    height : '85%',
    borderRadius : 10,

    shadowColor : '#000',
    shadowOffset:{
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  animatedCard:{
    width : '100%',
    height: '100%',
    // alignItems : 'center',
  //  justifyContent: 'center',
  },

})
export default HomeScreen