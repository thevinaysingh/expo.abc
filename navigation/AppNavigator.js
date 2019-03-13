import React from 'react';
import { createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation';
import DrawerScreen from '../screens/sidebar/DrawerScreen';
import MainTabNavigator from './MainTabNavigator';

const DrawerNavigator = createDrawerNavigator({
  Home: { screen: MainTabNavigator },
},{
  initialRouteName: 'Home',
  contentComponent: DrawerScreen,
  drawerWidth: 300
});

const StackNavigator = createAppContainer(createStackNavigator({
  DrawerNavigator: {
      screen: DrawerNavigator,
      navigationOptions: {
        header: null
    }
  }
}));

export default StackNavigator;
