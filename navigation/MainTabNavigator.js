import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import AlphaScreen from '../screens/alpha/AlphaScreen';
import AddAlpha from '../screens/alpha/AddAlpha';

import BravoScreen from '../screens/bravo/BravoScreen';
import AddBravo from '../screens/bravo/AddBravo';

import CharlieScreen from '../screens/charlie/CharlieScreen';
import AddCharlie from '../screens/charlie/AddCharlie';

import Settings from '../screens/Settings';
import Updates from '../screens/Updates';

import { Locales } from '../constants/locales';

const AlphaStack = createStackNavigator({
  Alpha: AlphaScreen,
  AddAlpha: {
    screen: AddAlpha,
    key: 'AddAlphaScreen',
    navigationOptions: {
      title: Locales.ADD_ALPHA.title,
    },
  },
  Settings: {
    screen: Settings,
    key: 'SettingsScreen'
  },
  Updates: {
    screen: Updates,
    key: 'UpdatesScreen'
  },
});

AlphaStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Alpha',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === 'ios'
            ? `ios-information-circle${focused ? '' : '-outline'}`
            : 'md-information-circle'
        }
      />
    ),
  };
};

const BravoStack = createStackNavigator({
  Bravo: BravoScreen,
  AddBravo: {
    screen: AddBravo,
    key: 'AddBravoScreen',
    navigationOptions: {
      title: Locales.ADD_BRAVO.title,
    },
  },
});

BravoStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Bravo',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
      />
    ),
  };
};

const CharlieStack = createStackNavigator({
  Charlie: CharlieScreen,
  AddCharlie: {
    screen: AddCharlie,
    key: 'AddCharlieScreen',
    navigationOptions: {
      title: Locales.ADD_CHARLIE.title,
    },
  },
});

CharlieStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Charlie',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
      />
    ),
  };
};

export default createBottomTabNavigator({
  AlphaStack,
  BravoStack,
  CharlieStack,
});
