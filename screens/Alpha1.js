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
  ActivityIndicator, Alert , Modal, TouchableHighlight 
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import routines_data  from './Alphadata.js';
import {AsyncStorage} from 'react-native';


export default class HomeScreen extends React.Component {
  _storeData = async () => {
    try {
     
      await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
      _retrieveData
    } catch (error) {
      // Error saving data
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('TASKS');
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };




  static navigationOptions = {
    title: 'Alpha',
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
                <View style={{width:250,height:80, justifyContent:'center'}}>
                <Text style={styles.item}>{item.name}</Text>
                </View>
                <View style={{width:80,height:80, justifyContent:'center'}}>
                    <Image
                        style={{width: 50, height: 50}}
                        source={item.url}
                    />
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
       

   <View style={{marginTop:30,fontSize:14,fontWeight:'bold'}}>
        <TextField style={{fontColor:'black',fontSize:'15',fontWeight:'bold'}}
        label='Number'
        onChangeText={ (phone) => this.setState({ phone }) }
      />

      </View>
     </View>
     <TouchableHighlight
                onPress={() => {
                //  this.setModalVisible(!this.state.modalVisible);
                this. _storeData.bind(this)
              }}>
                <Text style = {styles.save}>
               Save
            </Text>
            
              </TouchableHighlight>

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
   // backgroundColor: '#ddd'
 },
 save: {
  top:477,
  left:200,
  borderColor: 'black',
    backgroundColor: 'white',
  width:200,
  padding: 25,
  borderWidth: 5,
  //backgroundColor: '#222'
},
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    top:50,
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  item: {
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
/*<View>
  <Text>hiiiii</Text>
<Image Source={require('../assets/images/plusIcon.png')}>
  
  <Button onPress={() => this.props.navigation.navigate('SavingsScreen')} title="Save"/>

</View>
);
  }
}*/