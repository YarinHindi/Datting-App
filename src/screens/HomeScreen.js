import { View, Text,Image,StyleSheet, ImageBackground,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Logo from '../components/Logo'
import Card from '../components/Card'
import Users from '../../data/Users'
const HomeScreen = ({navigation}) => {
  const [currentCard,setCurrentCard] = useState(0)

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
          <Text onPress={()=>nextCard()} style = {{fontSize : 10, color : 'red'}}>Next card---></Text>
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
export default HomeScreen