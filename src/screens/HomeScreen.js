import { View, Text,Image,StyleSheet, ImageBackground,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Logo from '../components/Logo'
import Card from '../components/Card'
import Users from '../../data/Users'
import Animated ,{ useSharedValue, useAnimatedStyle,withSpring,useAnimatedGestureHandler, event, } from 'react-native-reanimated'
const HomeScreen = ({navigation}) => {

  //Used to make the card animation 
  const shardValue = useSharedValue(1);
  const cardStyle = useAnimatedStyle(()=>({
    transform:[
      {
        translateX :shardValue.value,
      },
    ],
  }));
//used to get users from
  const [currentCard,setCurrentCard] = useState(0)
  const nextCard = ()=>{
    if (currentCard<4){
    setCurrentCard(currentCard+1);
    }else{
      setCurrentCard(0)
      console.warn('Stack card is epmty!!')
    }
  }

  const ongestureHandler = useAnimatedGestureHandler({
    onStart: _=>{
      console.warn('Start touch');
    },
    onActive: event =>{
      console.log('Touch x:',event.translationX );

    },
    onEnd:()=>{
      console.warn('Touch ended');
    }
  })
  return (
      <View style = {{flex :1,}} >
        <View>
          <Logo/>
          <Text onPress={()=>nextCard()} style = {{fontSize : 10, color : 'red'}}>Next card---></Text>
          <Animated.View style = {[styles.animatedCard,shardValue]}>
            <Card   user = {Users[currentCard]}/>
          </Animated.View>
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