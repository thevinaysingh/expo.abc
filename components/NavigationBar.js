import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { Images } from '../assets/images';

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  icon: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  }
});


const FloatingButton = props => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={() => props.onPress()}
    style={styles.button}
  >
    <Image
      source={Images.plusIcon}
      style={styles.icon}
    />
  </TouchableOpacity>
);

export default FloatingButton;
