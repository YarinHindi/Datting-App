import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import {useState, React} from 'react';
import Logo from '../components/Logo';
import { SelectList } from 'react-native-dropdown-select-list';
import { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const PremiumCreationScreen = ({navigation}) => {
    const { currentUser } = firebase.auth();
    const [creditCard, setCreditCard] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [threeDigits, setThreeDigits] = useState('');

    const months = [
        {key:'1', value:'1'},
        {key:'2', value:'2'},
        {key:'3', value:'3'},
        {key:'4', value:'4'},
        {key:'5', value:'5'},
        {key:'6', value:'6'},
        {key:'7', value:'7'},
        {key:'8', value:'8'},
        {key:'9', value:'9'},
        {key:'10', value:'10'},
        {key:'11', value:'11'},
        {key:'12', value:'12'}
    ]

    const years = [
        {key:'1', value:'2023'},
        {key:'2', value:'2024'},
        {key:'3', value:'2025'},
        {key:'4', value:'2026'},
        {key:'5', value:'2027'},
        {key:'6', value:'2028'},
        {key:'7', value:'2029'},
        {key:'8', value:'2030'},
        {key:'9', value:'2031'},
        {key:'10', value:'2032'}
    ]

    function back() {
        navigation.navigate('Home1');
    }
    
    const pay  = async () =>{        
        await firestore()
        .collection("users")
        .doc(`${currentUser.uid}`)
        .update({
          id: `${currentUser.uid}`,
          isPremium: true,
        });
        alert("Welcome to the premium club, enjoy!)");
        navigation.navigate('Home1');
    }

    return(
        <View>
            <Logo/>
            <Button title='Regret?' onPress={back}/>
            <TextInput
                style = {styles.input}
                placeholder ='Enter credit card number'
                value = {creditCard}
                onChangeText = {setCreditCard}
            />
            <Text>Select month expiration date</Text>
            <SelectList 
                setSelected={(month) => setMonth(month)} 
                data={months} 
                save="value"
                label="Month"
            />
            <Text>Select year expiration date</Text>
            <SelectList 
                setSelected={(year) => setYear(year)} 
                data={years} 
                save="value"
                label="Year"
            />
            <TextInput
                style = {styles.input}
                placeholder ='Enter three back digits'
                value = {threeDigits}
                onChangeText = {setThreeDigits}
            />
            <Button title='Pay 9.99$' onPress={pay}/>
        </View>     
    )
}

export default PremiumCreationScreen;

const styles = StyleSheet.create({
    input:{
        width: '90%',
        fontSize: 15,
        padding: 8,
        borderColor: 'gray',
        borderWidth: 0.2,
        borderRadius: 10,
        margin: 4
    }
});