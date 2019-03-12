import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { Images } from '../assets/images';

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    alignSelf: 'stretch',
    borderColor: 'lightgrey',
    margin: 5,
  },
});


const TwoButtonFooter = props => (
  <View style={styles.container}>
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => props.onLeftPress()}
      style={styles.button}
    >
      <Text>Cancel</Text>
    </TouchableOpacity>
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => props.onRightPress()}
      style={styles.button}
    >
      <Text>Save</Text>
    </TouchableOpacity>
  </View>
);

export default TwoButtonFooter;
