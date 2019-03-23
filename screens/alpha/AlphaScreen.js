import React from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  AsyncStorage,
  Text,
} from 'react-native';
import ListItem from '../../components/ListItem';
import ListSeparator from '../../components/ListSeparator';
import FloatingButton from '../../components/FloatingButton.js';
import { Locales } from '../../constants/locales.js';
import MenuIcon from '../../components/MenuIcon.js';

export default class AlphaScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  _storeData = (newJson) => {
    const { isFullVersionAvailable, alphaList, onSetAlpha } = this.props.screenProps;
    if(alphaList.length == 2 && !isFullVersionAvailable) {
      alert("Purchase full version to add more.");
      return;
    }
    onSetAlpha(newJson);
  };

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: Locales.ALPHA.title,
    headerLeft: ( <MenuIcon onPress={() => navigation.openDrawer()} screenProps={screenProps} />),
    headerRight: ( <Text style={styles.rightNavText} >{screenProps.alphaScore}</Text>)
  });

  onPress() {
    this.props.navigation.navigate("AddAlpha", { onSave: this._storeData })
  }

  render() {
    const { alphaList, alphaScore, onUpdateAlphaNumber } = this.props.screenProps;
    return (
      <View style={styles.mainContainer}>
        {alphaList.length === 0 &&
          <Text
            style={{
              paddingVertical: 30,
              paddingHorizontal: 15,
            }}
          >{Locales.ALPHA.no_items}</Text>}
        <FlatList
          style={{ flex: 1, alignSelf: 'stretch', marginHorizontal: 20 }}
          data={alphaList} 
          extraData={this.props.screenProps}
          keyExtractor={(item, index) => item.id.toString()}       
          renderItem={({ item }) =>
            <ListItem
              item={item}
              score={alphaScore}
              onPress={(num) => onUpdateAlphaNumber(num)}
            />
          }
          ItemSeparatorComponent={() => <ListSeparator />}
        />
        <FloatingButton onPress={() => this.onPress()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightNavText: {
    fontSize: 14,
    paddingHorizontal: 10
  }
});