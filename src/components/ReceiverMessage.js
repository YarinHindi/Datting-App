import { View, Text,StyleSheet, Image } from 'react-native'
import React from 'react'

const ReceiverMessage = ({message}) => {
    console.log(message)
  return (
    <View style={[styles.Cont,styles.insideCont]}>

      <Image
      style={{height:26,width:26,borderRadius:100,position:'absolute',top:0,left:-30}}
         source={{uri:message.senderphotoURL}}
      />
      <Text style={{color: 'white'}}>
        {message.message}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    Cont: {
        backgroundColor:'red',
        borderRadius:8,
        borderTopLeftRadius:0,
        marginHorizontal:6,
        marginVertical:7,
        paddingVertical:5,
        paddingHorizontal:5,
        marginLeft:30,
    },
    insideCont:{
        alignSelf:'flex-start',
    },
});
export default ReceiverMessage