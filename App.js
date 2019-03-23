import React from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { APP_CONSTANTS } from './constants/AppConstants';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    isFullVersionAvailable: false,
    isUpdatesAvailable: true,
    alphaScore: 0,
    charlieScore: 0,
    bravoList: [],
    bravoDateWiseList: [],
    alphaList: [],
    charlieList: [],
    notificationTime: "Fri Mar 21 2019 09:30:00 GMT+0530 (IST)",
    isNotificationChecked: true,
  };

  componentWillMount() {
    this.fetchUpdateTime();
    this.getItemWithKey(APP_CONSTANTS.IS_PURCHASED_FULL_VERSION, "isFullVersionAvailable");
    this.getItemWithKey(APP_CONSTANTS.ALPHA_SCORE, "alphaScore");
    this.getItemWithKey(APP_CONSTANTS.CHARLIE_SCORE, "charlieScore");
    this.getItemWithKey(APP_CONSTANTS.IS_UPDATES_AVAIALBLE, "isUpdatesAvailable");
    this.getItemWithKey(APP_CONSTANTS.IS_NOTIFICATION_CHECKED, "isNotificationChecked");
    this.getJsonItemWithKey(APP_CONSTANTS.ALPHA_DATA, "alphaList");
    this.getJsonItemWithKey(APP_CONSTANTS.BRAVO_DATA, "bravoDateWiseList");
    this.getJsonItemWithKey(APP_CONSTANTS.BRAVO_LIST, "bravoList");
    this.getJsonItemWithKey(APP_CONSTANTS.CHARLIE_DATA, "charlieList");
  }

  async fetchUpdateTime() {
    try {
      const value = await AsyncStorage.getItem(APP_CONSTANTS.NOTIFICATION_TIME);
      if (value !== null) {
        this.setState({ notificationTime: value }, () => {
            // time of first timespan
          const currentTimeHours = new Date().getHours();
          const notiTimeHours = new Date(this.state.notificationTime).getHours();

          // time of second timespan
          const currentTimeMinutes = new Date().getMinutes();
          const notiTimeMiniutes = new Date(this.state.notificationTime).getMinutes();

          const currenTimeInSeconds = (currentTimeHours * 60 * 60) + ( currentTimeMinutes * 60);

          const notiTimeInSeconds = (notiTimeHours * 60 * 60) + ( notiTimeMiniutes * 60);
          
          const timeDiffInSeconds = notiTimeInSeconds - currenTimeInSeconds;

          if(timeDiffInSeconds > 0 && this.state.isNotificationChecked) {
            
            setTimeout(() => this.onChangeUpdateAvaialble2(true), timeDiffInSeconds * 1000);
          }
        });
      }
    } catch (error) {
      
    }
  }

  async onChangeUpdateAvaialble(isAvailable) {
    try {
      await AsyncStorage.setItem(APP_CONSTANTS.IS_UPDATES_AVAIALBLE, JSON.stringify(isAvailable));
      this.setState({ isUpdatesAvailable: isAvailable });
      this.fetchUpdateTime();
    } catch (error) {
      
    }
  }

  async onChangeFullVersion(isFull) {
    try {
      await AsyncStorage.setItem(APP_CONSTANTS.IS_PURCHASED_FULL_VERSION, JSON.stringify(isFull));
      this.setState({ isFullVersionAvailable: isFull });
    } catch (error) {
      
    }
  }

  async onChangeUpdateAvaialble2(isAvailable) {
    
    try {
      await AsyncStorage.setItem(APP_CONSTANTS.IS_UPDATES_AVAIALBLE, JSON.stringify(isAvailable));
      this.setState({ isUpdatesAvailable: isAvailable });

    } catch (error) {
      
    }
  }

  async onUpdateNotificationSettings(isEnabled) {
    try {
      await AsyncStorage.setItem(APP_CONSTANTS.IS_NOTIFICATION_CHECKED, JSON.stringify(isEnabled));
      this.setState({ isNotificationChecked: isEnabled });

    } catch (error) {
      
    }
  }

  async onUpdateNotificationTime(nt) {
    try {
      await AsyncStorage.setItem(APP_CONSTANTS.NOTIFICATION_TIME, nt);
      this.setState({ notificationTime: nt }, () => {
        this.fetchUpdateTime();
      });
    } catch (error) {
      
    }
  }

  async getItemWithKey(key, stateKey) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        this.setState({
          [stateKey]: JSON.parse(value),
        })
      }
    } catch (error) {
      
    }
  }

  async setItemWithKey(key, value, stateKey) {
    try {
      await AsyncStorage.setItem(key, value);
      this.setState({ [stateKey]:  value});
    } catch (error) {
      
      // Error saving data
    }
  }

  async getJsonItemWithKey(key, stateKey) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        this.setState({
          [stateKey]: Array.from(JSON.parse(value)),
        })
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  async setJsonItemWithKey(key, value, stateKey) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      
      
      
      this.setState({
        [stateKey]: value,
      });

    } catch (error) {
      
      // Error saving data
    }
  }

  async onSetAlpha(alphaJson) {
    const { alphaList } = this.state;
    alphaList.push(alphaJson);
    try {
      await AsyncStorage.setItem(APP_CONSTANTS.ALPHA_DATA, JSON.stringify(alphaList));
      this.setState({ alphaList });

    } catch (error) {
      
    }
  }

  async onSetCharlie(charlieJson) {
    const { charlieList } = this.state;
    charlieList.push(charlieJson);
    try {
      await AsyncStorage.setItem(APP_CONSTANTS.CHARLIE_DATA, JSON.stringify(charlieList));
      this.setState({ charlieList });

    } catch (error) {
      
    }
  }

  async onSetBravo(bravoJson) {
    const { bravoDateWiseList, bravoList } = this.state;

    const date = new Date();
    const dateKey = `item${date.getDate()}_${date.getMonth()}_${date.getFullYear()}`;

    const index = bravoDateWiseList.findIndex(bd => bd.id === dateKey);

    if(index > -1) {
      bravoDateWiseList[index].data.push(bravoJson); 
      bravoList.push(bravoJson);
    } else {
      bravoDateWiseList.push({
        id: dateKey,
        label: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
        data: [bravoJson],
      }); 
      bravoList.push(bravoJson);
    }

    try {
      await AsyncStorage.setItem(APP_CONSTANTS.BRAVO_DATA, JSON.stringify(bravoDateWiseList));
      await AsyncStorage.setItem(APP_CONSTANTS.BRAVO_LIST, JSON.stringify(bravoList));
      this.setState({
        bravoDateWiseList,
        bravoList,
      });
    } catch (error) {
      
      // Error saving data
    }
  }

  async onUpdateAlphaScore(item, itemIndex, list, listIndex) {

    if(item.status != 0) {
      return;
    }

    const {bravoDateWiseList, bravoList} = this.state;

    bravoDateWiseList[listIndex].data[itemIndex].status = 1;

    const indx = bravoList.findIndex(bl => bl.id === item.id );
    bravoList[indx].status = -1;
    let alphaNumber = this.state.alphaScore;
    alphaNumber = Number.parseInt(alphaNumber) + Number.parseInt(item.alpha_amount);

    try {
      await AsyncStorage.setItem(APP_CONSTANTS.BRAVO_DATA, JSON.stringify(bravoDateWiseList));
      await AsyncStorage.setItem(APP_CONSTANTS.BRAVO_LIST, JSON.stringify(bravoList));
      await AsyncStorage.setItem(APP_CONSTANTS.ALPHA_SCORE, JSON.stringify(alphaNumber));

      this.setState({
        bravoDateWiseList,
        bravoList,
        alphaScore: alphaNumber,
      });
      alert("You have selected the item. It updates the alpha global score. Current alpha score is " + alphaNumber);
    } catch (error) {
      
    }
  }

  async onUpdateCharlieScore(item, itemIndex, list, listIndex) {

    if(item.status != 0) {
      return;
    }

    const {bravoDateWiseList, bravoList} = this.state;

    bravoDateWiseList[listIndex].data[itemIndex].status = -1;

    const indx = bravoList.findIndex(bl => bl.id === item.id );
    bravoList[indx].status = -1;
    let charlieNumber = this.state.charlieScore;
    charlieNumber = Number.parseInt(charlieNumber) + Number.parseInt(item.charlie_amount);

    try {
      await AsyncStorage.setItem(APP_CONSTANTS.BRAVO_DATA, JSON.stringify(bravoDateWiseList));
      await AsyncStorage.setItem(APP_CONSTANTS.BRAVO_LIST, JSON.stringify(bravoList));
      await AsyncStorage.setItem(APP_CONSTANTS.CHARLIE_SCORE, JSON.stringify(charlieNumber));

      this.setState({
        bravoDateWiseList,
        bravoList,
        charlieScore: charlieNumber,
      });

      alert("You have rejected the item. It updates the charlie global score. Current charlie score is " + charlieNumber);

    } catch (error) {
      
      // Error saving data
    }
  }

  async onUpdateAlphaNumber(num) {
    let alphaNumber = this.state.alphaScore;
    if(this.state.alphaScore >= num) {
      alphaNumber = Number.parseInt(alphaNumber) - Number.parseInt(num);
    }
    try {
      await AsyncStorage.setItem(APP_CONSTANTS.ALPHA_SCORE, JSON.stringify(alphaNumber));

      this.setState({
        alphaScore: alphaNumber,
      });

      alert(num + " Points deducted from alpha global score");
    } catch (error) {
      
    }
  }

  async onUpdateCharlieNumber(num) {
    let charlieNumber = this.state.charlieScore;
    
    if(this.state.charlieScore >= num) {
      charlieNumber = Number.parseInt(charlieNumber) - Number.parseInt(num);
    }
    try {
      await AsyncStorage.setItem(APP_CONSTANTS.ALPHA_SCORE, JSON.stringify(charlieNumber));

      this.setState({
        charlieScore: charlieNumber,
      });
      alert(num + " Points deducted from charlie global score");
    } catch (error) {
      
    }
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator
            screenProps={{
              ...this.state,
              onSetAlpha: (alphaJson) => this.onSetAlpha(alphaJson),
              onSetCharlie: (charlieJson) => this.onSetCharlie(charlieJson),
              onSetBravo: (bravoJson) => this.onSetBravo(bravoJson),
              onUpdateNotificationSettings: (isEnabled) => this.onUpdateNotificationSettings(isEnabled),
              onUpdateNotificationTime: (nt) => this.onUpdateNotificationTime(nt),
              onSetItemWithKey: (key, value, stateKey) => this.setItemWithKey(key, value, stateKey),
              onChangeUpdateAvaialble: (isAvailable) => this.onChangeUpdateAvaialble(isAvailable),
              onChangeFullVersion: (isFull) => this.onChangeFullVersion(isFull),
              onUpdateAlphaScore: (item, itemIndex, list, listIndex) => this.onUpdateAlphaScore(item, itemIndex, list, listIndex),
              onUpdateCharlieScore: (item, itemIndex, list, listIndex) => this.onUpdateCharlieScore(item, itemIndex, list, listIndex),
              onUpdateAlphaNumber: (num) => this.onUpdateAlphaNumber(num),
              onUpdateCharlieNumber: (num) => this.onUpdateCharlieNumber(num),
            }}
          />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
