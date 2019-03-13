import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import { Text, View } from 'react-native';
import { DrawerActions } from 'react-navigation';

class DrawerScreen extends Component {
  navigateToScreen(route) {
    this.props.navigation.navigate(route);
    this.props.navigation.closeDrawer();
  }

  render () {
    return (
      <View
        style={{
          paddingTop: 100,
          paddingLeft: 20,
        }}
      >
        <Text
          style={styles.text}
          onPress={() => this.props.navigation.dispatch(DrawerActions.closeDrawer())}
        >Updates</Text>
        <Text
          style={styles.text}
          onPress={() => this.navigateToScreen('Settings')}
        >Settings</Text>
        <Text
          style={styles.text}
          onPress={() => this.props.navigation.dispatch(DrawerActions.closeDrawer())}
        >Purchase Full Version</Text>
      </View>
    );
  }
}

const styles = {
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
    padding: 10
  },
}

export default DrawerScreen;