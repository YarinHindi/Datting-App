import { View, Text,Image,StyleSheet, ImageBackground,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Logo from '../components/Logo'
import Card from '../components/Card'
import Users from '../../data/Users'
import { useNavigation } from '@react-navigation/native'
import NewMatchesScreen from './NewMatchesScreen'

const HomeScreen = ({navigation}) => {
const unLikePhoto = 'https://media.istockphoto.com/id/158002966/photo/painted-x-mark.jpg?s=612x612&w=0&k=20&c=hvGlwd3ep45Y0ALc45flcM_wxDR3WIjcyYuTwsOvt9U=';
const LlikePhoto = 'https://-tbn0.gstatic.com/images?q=tbn:ANd9GcSl9lFE3qs-WV8PMOrcjj_Zz-cRKfuv9NyR3nCTNo4ZLw&s';
//used to get users from
  const [currentCard,setCurrentCard] = useState(0)
 
  const SwipeRight = ()=>{
    navigation.navigate('NewMatches1');
    console.warn("right")
    nextCard();
  };
  const SwipeLeft = ()=>{
    console.warn("left")
    nextCard();
  };


  const nextCard = ()=>{
    if (currentCard<4){
    setCurrentCard(currentCard+1);
    }else{
      setCurrentCard(0)
      console.warn('Stack card is epmty!!')
    }
  }
  return (
      <View style = {{flex :1}} >
        <View>
          <Logo/>
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
export default HomeScreen