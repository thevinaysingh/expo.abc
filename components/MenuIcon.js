import React from 'react';
import { Icon } from 'expo';
import {
  TouchableOpacity,
  View,
} from 'react-native';

const styles = {
  redCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'red',
    marginBottom: -15,
    marginLeft: 15,
  },
}

const MenuIcon = props => {
  return (
    <TouchableOpacity
      style={{ paddingLeft: 20, paddingRight: 5, justifyContent: 'center',alignItems: 'center' }}
      onPress={() => props.onPress()}
    >
      {props.screenProps.isUpdatesAvailable && <View style={styles.redCircle} />}
      <Icon.Ionicons name={"md-menu"} size={26} />
    </TouchableOpacity>
  )
};

export default MenuIcon;