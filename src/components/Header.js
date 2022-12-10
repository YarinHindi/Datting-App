import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons';
const Header = ({title}) => {
    const navigation = useNavigation();
  return (
    <View style = {{padding:2,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
        <View style = {{flex:1,flexDirection:'row',alignItems:'center'}}>
            <TouchableOpacity onPress={()=>navigation.goBack()} style ={{padding:2}}>
                <Ionicons name="chevron-back-outline" size={28} color="#FF5864" />
            </TouchableOpacity>
            <Text style={{fontSize:20,lineHeight:32,fontWeight:'bold',paddingLeft:40,color:'black'}}>{title}</Text>

        </View>
    </View>
  )
}

export default Header