import { View, Text, Image,StyleSheet,Modal, TouchableOpacity, Button, ScrollView, FlatList,Pressable } from 'react-native'
import React, { useState } from 'react'
import firestore from "@react-native-firebase/firestore";

const UsersRowDisplay = ({UserDetails}) => {
    const [showModal,setShowMOdal]= useState(false); 
    const reports = ['GotReportedby: miriam , casue: sent Nudes', 'GotReportedby: simha , casue: talk dirty']
    const deleteAcount = async () =>{
        console.log(UserDetails.id);
        try {
            const res = await fetch('http://192.168.56.1:1000/deleteUser', { method: "POST", 
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              } , body: JSON.stringify({id: UserDetails.id})});
        } catch (error) {
            console.error(error);
        }
        alert('Done!');
    }



    return (

    
    <View style = {{flex : 1,paddingBottom:10}}>    
        <View style = {{flex:0.5,backgroundColor:'#d0c7b7',borderRadius:10}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style ={{fontSize:20}}>Name: {UserDetails.name}</Text>
                <TouchableOpacity onPress={()=>setShowMOdal(true)}>
                <Image
                style={{  borderRadius: 100,height: 34,width: 34,}}
                source ={{uri:UserDetails.photoURL}}
                />
                </TouchableOpacity>
                <Modal
            transparent = {true}
            visible = {showModal}
            >
            <View style = {{flex:1}}>
                <View style = {{backgroundColor:'white',margin:50,marginBottom:'70%',opacity: 0.7,padding:40,borderRadius:10,flex:1}}>
                
                <Text style ={{fontSize:25,textAlign:'center',fontWeight:'bold',}}>More Details and options:</Text>
                <Text style={{paddingTop:5,fontWeight:'bold',paddingBottom:7,fontSize:20}}> Reports:</Text>
                <FlatList
                data={reports}
                keyExtractor =  {item=> reports.indexOf(item)}
                renderItem = {({item}) => <Text style = {{fontSize:16,fontWeight:'800'}}> {item}</Text>}
                />
                <View style={{alignItems:'center',justifyContent:'center',marginBottom:4}}>
                <Pressable style ={[styles.button,{marginBottom:7}]} onPress={deleteAcount} >
                    <Text style={styles.text}> Delete Acount </Text>
                </Pressable>
                <Pressable style ={[styles.button,{marginBottom:7}]} onPress={()=>setShowMOdal(false)}>
                    <Text style={styles.text}>Warning</Text>
                </Pressable>
                <Pressable style ={[styles.button,{marginBottom:7}]} onPress={()=>setShowMOdal(false)}>
                    <Text style={styles.text}>Exit</Text>
                </Pressable>
                </View>
                </View>

            </View>

        </Modal>

            </View>
      <Text style={[styles.User,{marginBottom:10}]}>Gender : {UserDetails.gender}   </Text>
      <Text style={[styles.User,{marginBottom:10}]}>isPremium : {UserDetails.isPremium} </Text>
      <Text style = {[styles.User,{paddingBottom:4}]} >GotReported : {UserDetails.swipeCounter}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    User:{
        fontSize:20,
    },
        button: {
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 12,
          paddingHorizontal: 32,
          borderRadius: 100,
          elevation: 3,
          backgroundColor: 'black',
        },
        text: {
          fontSize: 16,
          lineHeight: 21,
          fontWeight: 'bold',
          letterSpacing: 0.25,
          color: 'white',
        },
      
})

export default UsersRowDisplay