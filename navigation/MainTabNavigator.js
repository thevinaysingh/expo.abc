import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import AlphaScreen from '../screens/AlphaScreen';
import AddAlpha from '../screens/AddAlpha';

import LinksScreen from '../screens/BravoScreen';
import SettingsScreen from '../screens/CharlieScreen';
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
