import { View, Text,Image,StyleSheet, ImageBackground,TouchableOpacity, Button } from 'react-native';
import React, { useState } from 'react';
import Logo from '../components/Logo';
import Card from '../components/Card';
import Users from '../../data/Users';
import { useNavigation } from '@react-navigation/native';
import NewMatchesScreen from './NewMatchesScreen';
import {app,db,getFirestore, collection, addDoc} from "../../firebase/index";
import { async } from '@firebase/util';
import firestore from '@react-native-firebase/firestore';



const HomeScreen = ({navigation}) => {

  const [currentCard,setCurrentCard] = useState(0)
const addMatches = async () =>{
  console.warn('herererere');
  try {
    await firestore().collection('users').add({id : '31321321', name: 'ddd'})
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


//used to get users from
 
  const SwipeRight = ()=>{
    if (Users[currentCard].id!=-1){
      addMatches();
    navigation.navigate('NewMatches1');
    }
    console.warn(Users[currentCard].id);
    nextCard();
  };
  const SwipeLeft = ()=>{
    console.warn(Users[currentCard].id);
    nextCard();
  };


  const nextCard = ()=>{
    if (Users[currentCard].id==-1){
    // setCurrentCard(currentCard);
    console.warn('Stack card is epmty!!')
    }else{
      setCurrentCard(currentCard+1);
    }
  }

  function goPremium() {
    navigation.navigate("PremiumCreation1");
  }

  return (
      <View style = {{flex :1}} >
        <View>
          <Logo/>
          {/* if user is not premium */}
          <Button title='Go premium' onPress={goPremium}/>
          <View style = {{flexDirection:'row',justifyContent:'space-evenly'}}>
          <TouchableOpacity  onPress={()=>SwipeLeft()} >
                <Image  style = {{height:30,width:30,borderColor:'red'}}
                        source = {{uri:'https://cdn-icons-png.flaticon.com/128/1828/1828665.png'}}/>    
          </TouchableOpacity>
          <TouchableOpacity  onPress={()=>SwipeRight()} >
                <Image  style = {{height:30,width:30}}
                        source = {{uri:'https://cdn-icons-png.flaticon.com/128/390/390973.png'}}/>
          </TouchableOpacity>
          </View>
            <Card   user = {Users[currentCard]}/>
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
export default HomeScreen;