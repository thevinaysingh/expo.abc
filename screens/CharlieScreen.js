import React from 'react';
import {Image,
  Platform,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  ActivityIndicator, Alert , Modal, TouchableHighlight} from 'react-native';
  import { TextField } from 'react-native-material-textfield';
  import routines_data  from './Charliedata.js';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Charlie',
  };
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  clickHandler = () => {
    
 this.setModalVisible(true);

  
  };
  handleTextChange = (newText) => this.setState({ phone: newText });

  componentDidMount() {
    this.setState({
      phone: '00'
    });
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
          marginLeft: "0%"
        }}
      />
    );
  };
  
  render() {
    return (
      <View style={styles.MainContainer}>
      <ScrollView>
     
        <FlatList
        data={routines_data}        
          renderItem={({item}) =>
              <View style={{flex:1,flexDirection:'row'}}>
              <View style={{width:320,height:80, justifyContent:'center'}}>
              <Text style={styles.item}>{item.name}</Text>
              </View>
                       
        </View>
        }
        ItemSeparatorComponent={this.renderSeparator}
        />
    
      </ScrollView>
      <TouchableOpacity
          activeOpacity={0.7}
          onPress={this.clickHandler}
          style={styles.TouchableOpacityStyle}>
          <Image
           source={require('../assets/images/plusIcon.png')}
           style={styles.FloatingButtonStyle}
          />
        </TouchableOpacity>

       <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
            <View style={{marginTop:30,padding:10,fontSize:14,fontWeight:'bold'}}>
       <TextField style={{fontColor:'black',fontSize:'15',fontWeight:'bold'}}
          label='Name'
          //value={phone}
          onChangeText={ (phone) => this.setState({ phone }) }
        />
       

   <View style={{fontSize:14,fontWeight:'bold'}}>
        <TextField style={{fontColor:'black',fontSize:'15',fontWeight:'bold'}}
        label='Number'
        onChangeText={ (phone) => this.setState({ phone }) }
      />

      </View>
     </View>

     <Text style = {styles.save}>
               save
            </Text>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style = {styles.cancel}>
               Cancel
            </Text>
            
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
</View>
</View>
    );
  }
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 20
  }, 
  buttonContainer: {
    margin: 20
  },
  cancel: {
    top:400,
    borderWidth: 5,
    width:200,
    padding: 25,
    borderColor: 'black',
    backgroundColor: 'white'
 },
 save: {
  top:477,
  left:200,
  borderWidth: 5,
  width:200,
  padding: 25,
  borderColor: 'black',
  backgroundColor: 'white'
},item: {
  padding: 10,
  fontSize: 18,
  height: 44,
},
MainContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  
},
TouchableOpacityStyle: {
  position: 'absolute',
  width: 50,
  height: 50,
  alignItems: 'center',
  justifyContent: 'center',
  right: 30,
  bottom: 30,
},

FloatingButtonStyle: {
  resizeMode: 'contain',
  width: 50,
  height: 50,
  //backgroundColor:'black'
},
});