import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import AlphaScreen from '../screens/alpha/AlphaScreen';
import AddAlpha from '../screens/alpha/AddAlpha';

import LinksScreen from '../screens/bravo/BravoScreen';
import AddBravo from '../screens/bravo/AddBravo';


import SettingsScreen from '../screens/charlie/CharlieScreen';
import AddCharlie from '../screens/charlie/AddCharlie';

import { Locales } from '../constants/locales';

const HomeStack = createStackNavigator({
  Home: AlphaScreen,
  AddAlpha: {
    screen: AddAlpha,
    key: 'AddAlphaScreen',
    navigationOptions: {
      title: Locales.ADD_ALPHA.title,
    },
  },
});

HomeStack.navigationOptions = {
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

const LinksStack = createStackNavigator({
  Links: LinksScreen,
  AddBravo: {
    screen: AddBravo,
    key: 'AddBravoScreen',
    navigationOptions: {
      title: Locales.ADD_BRAVO.title,
    },
  },
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Bravo',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
  AddCharlie: {
    screen: AddCharlie,
    key: 'AddCharlieScreen',
    navigationOptions: {
      title: Locales.ADD_CHARLIE.title,
    },
  },
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Charlie',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});
