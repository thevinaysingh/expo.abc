import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Locales } from '../../constants/locales.js';
import TwoButtonFooter from '../../components/TwoButtonFooter.js';


export default class AddAlpha extends React.Component {
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
    // TODO:
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