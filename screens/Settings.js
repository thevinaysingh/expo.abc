import React from 'react';
import { Text, View, StyleSheet, CheckBox } from 'react-native';
import MenuIcon from '../components/MenuIcon.js';
import { Locales } from '../constants/locales.js';
import TwoButtonFooter from '../components/TwoButtonFooter.js';

export default class SettingsScreen extends React.Component {

  state = {
    checked: false,
  }

  static navigationOptions = ({ navigation }) => ({
    title: Locales.GENERAL.settings,
    headerLeft: ( <MenuIcon onPress={() => navigation.openDrawer()} />)
  });

  press = () => {
    this.setState({checked: !state.checked});
  }

  onSave() {
    // TODO:
  }
  

  render() {
    return (
      <View style = {styles.container}>
        <View style={{ flex: 1, marginTop: 60, paddingLeft: 20}}>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CheckBox
              onPress={this.press}
              checked={this.state.checked}
            />
            <Text style={{ fontSize: 16 }}>
              Notifications Enabled</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 16 }}>
              Notify daily at 9: 30 PM </Text>
          </View>

        </View>

        <TwoButtonFooter
          onLeftPress={() => this.props.navigation.goBack()}
          onRightPress={() => this.onSave()}
        />
      </View>);
  }
}

const styles = StyleSheet.create({
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