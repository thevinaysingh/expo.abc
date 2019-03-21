import React from 'react';
import {
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Locales } from '../../constants/locales.js';
import TwoButtonFooter from '../../components/TwoButtonFooter.js';
import { Images } from '../../assets/images/index.js';

export default class AddCharlie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      number: '',
    };
  }

  onChange(key, value) {
    this.setState({
      [key]: value,
    });
  }

  onSave() {
    if(this.state.name.trim() === "" || this.state.number.trim() === "") {
      Alert.alert('Fill all fields');
      return;
    }
    this.props.navigation.state.params.onSave({
      name: this.state.name,
      number: this.state.number,
      id: Date.now().toString(),
      url: Images.shoppingCart,
    });
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={[styles.mainContainer, { margin: 20 }]}>
          <TextField
            label={Locales.GENERAL.name}
            value={this.state.name}
            labelFontSize={18}
            onChangeText={text => this.onChange("name", text) }
          />

          <TextField
            label={Locales.GENERAL.number}
            value={this.state.number}
            labelFontSize={18}
            onChangeText={text => this.onChange("number", text) }
          />
        </View>
        <TwoButtonFooter
          onLeftPress={() => this.props.navigation.goBack()}
          onRightPress={() => this.onSave()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});