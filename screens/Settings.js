import React from 'react';
import {Text,View,TouchableOpacity, Button,StyleSheet} from 'react-native';

export default class HomeScreen extends React.Component {
    render() {
         return (
        <View style = {styles.container}>
        <View style={{marginTop:30,paddingLeft:10,fontSize:14,fontWeight:'bold'}}>
        <Text>Notifications Enabled</Text>
        <Text>Notify daily at </Text>
        
        
        </View>
        <TouchableOpacity>
            <Text style = {styles.cancel}>
               Cancel
            </Text>
            <Text style = {styles.save}>
               Save
            </Text>
         </TouchableOpacity>
        </View>
      );
      }
     
    } const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
        
        }, 
        cancel: {
            top:500,
            borderWidth: 5,
            width:170,
            padding: 25,
            borderColor: 'black',
            backgroundColor: 'white'
         },
         save: {
          top:420,
          left:180,
          borderWidth: 5,
          width:180,
          padding: 25,
          borderColor: 'black',
          backgroundColor: 'white'
       }
    
    
    
    
    
    });