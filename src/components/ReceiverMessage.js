import { View, Text,StyleSheet, Image } from 'react-native'
import React from 'react'

const ReceiverMessage = ({message}) => {
    console.log(message)
  return (
    <View style={[styles.Cont,styles.insideCont]}>

      <Image
      style={{height:12,width:12,borderRadius:100,position:'absolute',top:0,left:14}}
         source={{uri:message.senderphotoURL}}
      />
      <Text style={{color: 'white',}}>
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
        marginHorizontal:3,
        marginVertical:2,
        marginLeft:14,
        paddingVertical:3,
    },
    insideCont:{
        alignSelf:'flex-start',
    },
});
export default ReceiverMessage