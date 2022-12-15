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
  const [second,setSecond] = useState(0);
  const [minutes,setMinutes] = useState(0);
  const [hours,setHours] = useState(0);
  const timeStamp = new Date();
  let timeInMil = timeStamp.getTime();

    

  useEffect(
    ()=>{
      let timeInMil = timeStamp.getTime();
    
      firestore().collection('users').doc(userId).collection('MySwipes').doc(userId).get().then((doc)=>{
        let lastSwipe =doc.data().lastSwipeTime;
        console.log(timeStamp.toLocaleString('en-US'));
        const milDiff = Math.abs(timeInMil-lastSwipe);
        const secDiff = Math.ceil(milDiff/(1000))
        const minutesDiff = Math.ceil(milDiff/(1000*60))
        const hoursDiff = Math.ceil(milDiff/(1000*36000))
        setHours(12-hoursDiff)
        setMinutes((12*60-minutesDiff)%60)
        setSecond((12*3600-secDiff)%60);
        // setMinutes(12*60-minutesDiff)
        // console.log(hoursDiff)
        // setHours(12-hoursDiff);
      });
  },[]);
  
  const Timer = ()=>{
    var timer;

    useEffect(()=>{
      
      timer = setInterval(()=>{
        setSecond(second-1);

        if(second==0){
          setSecond(59);
          setMinutes(minutes-1);
        }
        if(minutes==0){
          setSecond(59)
          setMinutes(59)
          setHours(hours-1);
        }

        if(hours<=0){
          firestore().collection('users').doc(userId).update("swipeCounter",0);
        }
      },1000)
      return ()=>clearInterval(timer);
    });
  }

 const isBlocked = ()=>{
  if(blocked)return(
    <View>
    <View style={{alignItems:'center',}}>
    <Text style={{fontSize:20,fontWeight:'bold',color:'white',marginBottom:20}}>Swipes ends for now :(</Text>
    <Text style={{fontSize:20,fontWeight:'bold',color:'white',marginBottom:20}}>TIME-LEFT:</Text>
    <View style={{flexDirection:'row'}}>
   
    <Text style={{fontSize:30,fontWeight:'300',color:'white',backgroundColor:'#FF5349',borderRadius:10,paddingTop:5,paddingBottom:5,marginRight:5}}>H:{hours} </Text>
    <Text style={{fontSize:30,fontWeight:'300',color:'white',backgroundColor:'#FF5349',borderRadius:10,paddingTop:5,paddingBottom:5,marginRight:5,}}>M:{minutes}</Text>
    <Text style={{fontSize:30,fontWeight:'300',color:'white',backgroundColor:'#FF5349',borderRadius:10,paddingTop:5,paddingBottom:5,marginRight:5,paddingHorizontal:4}}>S:{second}  </Text>
    </View>
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
    Cont: {
      backgroundColor:'red',
      borderRadius:8,
      borderTopLeftRadius:0,
      marginHorizontal:6,
      marginVertical:7,
      paddingVertical:5,
      paddingHorizontal:5,
  },
  
  })

export default Card