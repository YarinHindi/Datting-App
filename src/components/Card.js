import { View, Text,StyleSheet,ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import CountDown from 'react-native-countdown-component';
import firestore from '@react-native-firebase/firestore';
import { firebase } from "@react-native-firebase/auth";
import { useNavigation } from '@react-navigation/native';
const Card = (props) => {
  const navi = useNavigation();
  const { currentUser } = firebase.auth();
  const userId = currentUser.uid;
  const{id,name,bio,photoURL} = props.user;
  const blocked  =props.blocked;
  const [second,setSecond] = useState(20);
  const timeStamp = new Date();
  let timeInMil = timeStamp.getTime();

    

  useEffect(
    ()=>{
      let timeInMil = timeStamp.getTime();
    
      firestore().collection('users').doc(userId).collection('MySwipes').doc(userId).get().then((doc)=>{
        let lastSwipe =doc.data().lastSwipeTime;
        const milDiff = Math.abs(timeInMil-lastSwipe);
        const secDiff = Math.ceil(milDiff/(1000))
        setSecond(5000-secDiff);
      });
  },[]);
  
  const Timer = ()=>{
    var timer;

    useEffect(()=>{
      
      timer = setInterval(()=>{
        setSecond(second-1);

        if(second==0){
          setSecond(20);
          firestore().collection('users').doc(userId).update("swipeCounter",0);
        }
      },1000)
      return ()=>clearInterval(timer);
    });
  }



const handleFinish  = async   ()=>{
  // alert('finish')
  // navi.navigate("Home1");
  setBlocked(false)

  // await firestore().collection('users').doc(userId).update("swipeCounter",0);
}
 const isBlocked = ()=>{
  if(blocked)return(
    <View>
    <View style={{alignItems:'center'}}>
    <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>Swipes end can swipe agian in</Text>
    <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>TIME LEFT {second}</Text>
    </View>
    <Timer/>
    </View>
  )
 }

  function showCard(){
    if(id!=-1){
      return (        
      <ImageBackground
        source= {{uri: photoURL}}
          style = {styles.image}>
            {isBlocked()}
            <Text style = {styles.name}> {name}</Text>
            <Text style = {styles.bio}> {bio}. </Text>
            
        </ImageBackground>);
    }else{
      return ( 
      <View style={{alignContent:'center',alignContent:'center',justifyContent:'center'}}>
      <ImageBackground 
        source= {{uri: 'https://cdn-icons-png.flaticon.com/128/1791/1791330.png'}}
          style = {{  width: 200,height:200,justifyContent:'flex-end',marginLeft:50,marginTop:70}}>
            <Text style = {{ fontSize :18,color: 'black',fontWeight : 'bold',}}> there is no more swipes for you get premium</Text>
        </ImageBackground>
        </View>);
    };
   
};

    return (
    <View style = {styles.pageContainer}>
      <View style = {styles.card}>
      {showCard()}
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
    image:{
      width: '100%',
      height:'100%',
      borderRadius: 10,
      overflow :'hidden',
      justifyContent: 'flex-end',
    },
    name:{
      fontSize :30,
      color: 'white',
      fontWeight : 'bold',
    },
    bio:{
      fontSize :18,
      color: 'white',
      lineHeight: 25,
    },
  
  })

export default Card