import { View, Text,StyleSheet, Image } from 'react-native'
import React from 'react'

const SenderMessage = ({message}) => {
  return (
    <View style={[styles.Cont,styles.insideCont]}>

      <Text style={{color: 'white',}}>
        {message.message}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    Cont: {
        backgroundColor:'purple',
        borderRadius:6,
        borderTopLeftRadius:0,
        marginHorizontal:6,
        marginVertical:7,
        paddingVertical:5,
        paddingHorizontal:5,
    },
    insideCont:{
        alignSelf:'flex-start',
        marginLeft:"auto",
    },
});
export default SenderMessage;