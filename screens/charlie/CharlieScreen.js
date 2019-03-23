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

export default class CharlieScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  _storeData = (newJson) => {
    const { isFullVersionAvailable, charlieList, onSetCharlie } = this.props.screenProps;

    if(charlieList.length == 2 && !isFullVersionAvailable) {
      alert("Purchase full version to add more.");
      return;
    }

    onSetCharlie(newJson);
  };

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: Locales.CHARLIE.title,
    headerLeft: ( <MenuIcon onPress={() => navigation.openDrawer()} screenProps={screenProps} />),
    headerRight: ( <Text style={styles.rightNavText}>{screenProps.charlieScore}</Text>)
  });

  onPress() {
    this.props.navigation.navigate("AddCharlie", { onSave: this._storeData });
  }

  render() {

    const { charlieList, charlieScore, onUpdateCharlieNumber } = this.props.screenProps;

    return (
      <View style={styles.mainContainer}>
        {charlieList.length === 0 &&
          <Text
            style={{
              paddingVertical: 30,
              paddingHorizontal: 15,
            }}
          >{Locales.CHARLIE.no_items}</Text>}
        <FlatList
          style={{ flex: 1, alignSelf: 'stretch', marginHorizontal: 20 }}
          data={charlieList} 
          extraData={this.props.screenProps}
          keyExtractor={(item, index) => item.id.toString()}       
          renderItem={({ item }) =>
            <ListItem
              item={item}
              score={charlieScore}
              onPress={(num) => onUpdateCharlieNumber(num)}
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