import React from 'react';
import { Text, View, StyleSheet, CheckBox } from 'react-native';
import MenuIcon from '../components/MenuIcon.js';
import { Locales } from '../constants/locales.js';
import TwoButtonFooter from '../components/TwoButtonFooter.js';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { getFormatTime } from '../utils/Helper.js';

export default class SettingsScreen extends React.Component {

  state = {
    isDateTimePickerVisible: false,
    pickedDate: "",
    checked: false,
  }

  componentWillMount() {
    this.setState({
      pickedDate: this.props.screenProps.notificationTime,
      checked: this.props.screenProps.isNotificationChecked,
    });
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
 
  _handleDatePicked = (date) => {
    this.setState({
      pickedDate: date.toString(),
    });
  };

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: Locales.GENERAL.settings,
    headerLeft: ( <MenuIcon onPress={() => navigation.openDrawer()} screenProps={screenProps} />)
  });

  onSave() {
    const { onUpdateNotificationTime, onUpdateNotificationSettings } = this.props.screenProps;
    const { pickedDate, checked } = this.state;
    onUpdateNotificationTime(pickedDate);
    onUpdateNotificationSettings(checked);
    this.props.navigation.goBack()
  }
  

  render() {
    const { onUpdateNotificationSettings, isNotificationChecked, notificationTime } = this.props.screenProps;
    return (
      <View style = {styles.container}>
        <View style={{ flex: 1, marginTop: 60, paddingLeft: 20}}>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CheckBox
              value={Boolean(this.state.checked)}
              onValueChange={(checked) => this.setState({ checked })}
            />
            <Text style={{ fontSize: 16 }}>
              Notifications Enabled</Text>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 10 }}>

            <View style={{ flexDirection: "row" }} >

              <Text style={{ fontSize: 16 }}> Notify daily at </Text>

              <Text onPress={this._showDateTimePicker}
                style={{
                  fontSize: 16,
                  borderWidth: 2,
                  borderColor: 'grey',
                  paddingHorizontal: 3,
                  }}
                > {getFormatTime(this.state.pickedDate)} </Text>
            </View>
            
          </View>

          <DateTimePicker
            mode="time"
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={(d) => this._handleDatePicked(d)}
            onCancel={() => this.setState({ isDateTimePickerVisible: false })}
          />

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