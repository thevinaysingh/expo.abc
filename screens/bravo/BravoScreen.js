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

export default class BravoScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  _storeData = (newJson) => {
    const { isFullVersionAvailable, bravoList, onSetBravo } = this.props.screenProps;

    if(bravoList.length == 2 && !isFullVersionAvailable) {
      alert("Purchase full version to add more.");
      return;
    }

    onSetBravo(newJson);
  };

  static navigationOptions = ({ navigation , screenProps}) => ({
    title: Locales.BRAVO.title,
    headerLeft: ( <MenuIcon onPress={() => navigation.openDrawer()} screenProps={screenProps} />)
  });

  onPress() {
    this.props.navigation.navigate("AddBravo", { onSave: this._storeData })
  }

  render() {
    const { bravoList } = this.props.screenProps;
    return (
      <View style={styles.mainContainer}>
        {bravoList.length === 0 &&
          <Text
            style={{
              paddingVertical: 30,
              paddingHorizontal: 15,
            }}
          >{Locales.BRAVO.no_items}</Text>}
        <FlatList
          style={{ flex: 1, alignSelf: 'stretch', marginHorizontal: 20 }}
          data={bravoList} 
          extraData={this.props.screenProps}
          keyExtractor={(item, index) => item.id.toString()}       
          renderItem={({ item }) => <ListItem item={item} /> }
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
});