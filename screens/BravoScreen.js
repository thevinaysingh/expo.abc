import React from 'react';
import {  
  Image,
  Platform,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  ActivityIndicator, Alert , Modal, TouchableHighlight} from 'react-native';
  import { Dropdown } from 'react-native-material-dropdown';
// import { ExpoLinksView } from '@expo/samples';
import { TextField } from 'react-native-material-textfield';
import routines_data  from './Bravodata.js';

let data = [{
  value: 'Delta',
  },
   {
    value: 'Echo',
  }, 
  ];



  let data1 = [{
      value: '1',
      },
       {
        value: '2',
      }, 

      {
          value: '3',
        }, 
        {
          value: '4',
        }, 

        {
          value: '5',
        }, 
      ];

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Bravo',
  };
  state = {
    modalVisible: false,
    phone: '',
  };
  handleTextChange = (newText) => this.setState({ phone: newText });

  componentDidMount() {
    this.setState({
      phone: '00'
    });
  }
  
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  clickHandler = () => {
    
 this.setModalVisible(true);

  
  };

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

          <View style={{top:10,paddingLeft:25,paddingRight:25,fontSize:14,fontWeight:'bold'}}>
          <TextField style={{fontColor:'black',fontSize:'15',fontWeight:'bold'}}
            label='Name'
            //value={phone}
            onChangeText={ (phone) => this.setState({ phone }) }
          />
          </View>

          <View style={{top:10,paddingLeft:25,paddingRight:25}}>
     <Text style={{top:20,fontSize:14,fontWeight:'bold',fontColor:'black'}}>Type</Text>
          <Dropdown
        //   label='Delta'
           data={data}
          />
     </View>

     <View style={{top:10,paddingLeft:25,paddingRight:25}}>
    <Text style={{top:20,fontSize:14,fontWeight:'bold',fontColor:'black'}}>Alpha Amount</Text>
          <Dropdown
          // label='Alpha Amount'
           data={data1}
          />
    </View>
    <View style={{marginTop:8,paddingLeft:25,paddingRight:25}}>
    <Text style={{top:20,fontSize:14,fontWeight:'bold',fontColor:'black'}}>Bravo Amount</Text>
          <Dropdown
           //label='Bravo Amount'
           data={data1}
           />
    </View>
            <View>
           

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
    top:270,
    borderWidth: 5,
    width:200,
    padding: 20,
    borderColor: 'black',
    backgroundColor: 'white'
 },
 save: {
  top:354,
  left:200,
  borderColor: 'black',
    backgroundColor: 'white',
  width:200,
  padding: 20,
  borderWidth: 5,
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