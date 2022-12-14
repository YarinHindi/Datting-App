import { View, Text,StyleSheet,ImageBackground } from 'react-native'
import React from 'react'
import CountDown from 'react-native-countdown-component';

const Card = (props) => {
  const{id,name,bio,photoURL} = props.user;
  const blocked = props.blocked;
  console.log(blocked,"dsadasdsads")

 const isBlocked = ()=>{
  if(blocked)return(
    <View>
    <View style={{alignItems:'center'}}>
    <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>Swipes end can swipe agian in</Text>
    </View>
    <CountDown
    size={30}
    timeToShow = {['H','M','S']}
    until= {60*60*12}
    />
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