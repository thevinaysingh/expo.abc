import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import { Text, View } from 'react-native';
import { DrawerActions } from 'react-navigation';
import { APP_CONSTANTS } from '../../constants/AppConstants';

class DrawerScreen extends Component {
  navigateToScreen(route) {
    this.props.navigation.navigate(route);
    this.props.navigation.closeDrawer();
  }

  onPurchaseFullVersion() {
    this.props.screenProps.onChangeFullVersion(true);
    this.props.screenProps.onSetItemWithKey(APP_CONSTANTS.IS_PURCHASED_FULL_VERSION, true, "isFullVersionAvailable");
    this.props.navigation.closeDrawer();
  }

  async onUpdatesClick() {
    this.props.screenProps.onChangeUpdateAvaialble(false);
    this.navigateToScreen("Updates");
  }

  render () {
    return (
      <View style={{ paddingTop: 100, paddingLeft: 20 }}>
        <View>
          {this.props.screenProps.isUpdatesAvailable && <View style={styles.redCircle} />}
          <Text
            style={styles.text}
            onPress={() => this.onUpdatesClick()}
          >Updates</Text>
        </View>
        <Text
          style={styles.text}
          onPress={() => this.navigateToScreen('Settings')}
        >Settings</Text>
        <Text
          style={styles.text}
          onPress={() => this.onPurchaseFullVersion()}
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
  redCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'red',
    marginBottom: -24,
    marginLeft: 80
  },
}

export default DrawerScreen;