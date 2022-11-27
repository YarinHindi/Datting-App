import { View, Text,StyleSheet,ImageBackground } from 'react-native'
import React from 'react'

const Card = (props) => {
    const{name,image,bio} = props.user;
  return (
    <View style = {styles.pageContainer}>
      <View style = {styles.card}>
        <ImageBackground
        source= {{uri: image}}
          style = {styles.image}>
            <Text style = {styles.name}> {name}</Text>
            <Text style = {styles.bio}> {bio}. </Text>
        </ImageBackground>
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
      height : '78%',
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