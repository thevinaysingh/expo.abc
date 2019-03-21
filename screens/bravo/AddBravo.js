import React from 'react';
import {
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import { Locales } from '../../constants/locales.js';
import TwoButtonFooter from '../../components/TwoButtonFooter.js';

const typeData = [{
  value: 'Delta',
  }, {
    value: 'Echo',
  }, 
];

export default class AddBravo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      type: '',
      alphaAmount: '',
      charlieAmount: '',
    };
  }

  onChange(key, value) {
    this.setState({
      [key]: value,
    });
  }

  onChangeDropDownText(key, value, index, data) {
    this.setState({
      [key]: value,
    });
  }

  onSave() {
    if(this.state.name.trim() === "" || this.state.type.trim() === ""
    || this.state.charlieAmount.trim() === "" || this.state.alphaAmount.trim() === "" ) {
      Alert.alert('Fill all fields');
      return;
    }

    this.props.navigation.state.params.onSave({
      name: this.state.name,
      type: this.state.type,
      id: Date.now().toString(),
      charlie_amount: this.state.charlieAmount,
      alpha_amount: this.state.alphaAmount,
      status: 0,
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

          <View style={styles.dropdownContainer}>
            <Dropdown
              label={Locales.GENERAL.type}
              labelFontSize={18}
              data={typeData}
              onChangeText={(value, index, data) => this.onChangeDropDownText("type", value, index, data)}
            />
          </View>

          <TextField
            label={Locales.GENERAL.alpha_amount}
            value={this.state.alphaAmount}
            labelFontSize={18}
            onChangeText={text => this.onChange("alphaAmount", text) }
          />

          <TextField
            label={Locales.GENERAL.charlie_amount}
            value={this.state.charlieAmount}
            labelFontSize={18}
            onChangeText={text => this.onChange("charlieAmount", text) }
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
  dropdownContainer: {
    top: 10,
  },
  dropdownLabel: {
    top: 20,
    fontSize: 14,
    fontWeight: 'bold',
    color:'black',
  },
});