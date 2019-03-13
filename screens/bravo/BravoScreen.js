import React from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  AsyncStorage,
} from 'react-native';
import ListItem from '../../components/ListItem';
import ListSeparator from '../../components/ListSeparator';
import FloatingButton from '../../components/FloatingButton.js';
import { Locales } from '../../constants/locales.js';
import MenuIcon from '../../components/MenuIcon.js';

export default class BravoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bravoList: [],
    };
  }

  componentWillMount() {
    this._retrieveData();
  }

  _storeData = async (newJson) => {
    const { bravoList } = this.state;
    bravoList.push(newJson);
    try {
      await AsyncStorage.setItem('BRAVO_DATA', JSON.stringify(bravoList));
      this.setState({ bravoList });
    } catch (error) {
      console.warn(error);
      // Error saving data
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('BRAVO_DATA');
      if (value !== null) {
        this.setState({
          bravoList: Array.from(JSON.parse(value)),
        })
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  static navigationOptions = ({ navigation }) => ({
    title: Locales.BRAVO.title,
    headerLeft: ( <MenuIcon onPress={() => navigation.openDrawer()} />)
  });

  onPress() {
    this.props.navigation.navigate("AddBravo", { onSave: this._storeData })
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <FlatList
          style={{ flex: 1, alignSelf: 'stretch', marginHorizontal: 20 }}
          data={this.state.bravoList} 
          extraData={this.state}
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