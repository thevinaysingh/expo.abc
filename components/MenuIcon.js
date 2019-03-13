import React from 'react';
import { Icon } from 'expo';
import {
  TouchableOpacity,
} from 'react-native';

const MenuIcon = props => {
  return (
    <TouchableOpacity
      style={{ paddingLeft: 20, paddingRight: 5, justifyContent: 'center',alignItems: 'center' }}
      onPress={() => props.onPress()}
    >
      <Icon.Ionicons name={"md-menu"} size={26} />
    </TouchableOpacity>
  )
};

export default MenuIcon;