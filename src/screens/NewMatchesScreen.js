import { View, Text, TouchableOpacity,Image, Dimensions } from 'react-native'
import React from 'react'
import Logo from '../components/Logo'
import { useNavigation, useRoute } from '@react-navigation/native'
import Header from '../components/Header'

const NewMatchesScreen = ({navigation}) => {
  // const {params} = useRoute();

  // const {loggedInProfile,userSwiped} = params;



  return (
    <View style = {{height :"100%", backgroundColor: 'red',paddingTop :20, opacity:0.70}}>
      <Header title='NewMatch' />
      <View style = {{alignItems:'center',justifyContent:'center',paddingHorizontal:10,paddingTop:50}}>
      <Image 
            style = {{height : 60, width: Dimensions.get('window').width/1.3,marginBottom:30}}
            source = {{uri: "https://links.papareact.com/mg9"}}/>
      </View>
      
      <Text style = {{color:'white',textAlign:'center',marginTop:5}}>
        {/* You and {userSwiped.name} have liked each other. */}
        You and Rachel have liked each other.
      </Text>

      <View style ={{flexDirection:'row',justifyContent:'space-evenly',marginTop:30}}>
        <Image
          style = {{height:70,width:70,borderRadius:100}}
          source ={{uri:'https://images.pexels.com/photos/6625880/pexels-photo-6625880.jpeg?auto=compress&cs=tinysrgb&w=1600'}}/>
  
        <Image
          style = {{height:70,width:70,borderRadius:100}}
          source ={{uri:'https://images.pexels.com/photos/6625880/pexels-photo-6625880.jpeg?auto=compress&cs=tinysrgb&w=1600'}}/>
      </View>
      <TouchableOpacity  onPress={()=>{
        navigation.goBack();
        navigation.navigate("Chat");
      }}
       style = {{backgroundColor:'white', margin:5,paddingHorizontal:10,paddingVertical:8
    ,borderRadius:20,marginTop:20,alignItems:'center'}}>
      <Text>Send a Message</Text>

      </TouchableOpacity>
    </View>
    
  )
}

export default NewMatchesScreen