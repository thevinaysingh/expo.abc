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

export default class CharlieScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      charlieList: [],
    };
  }

  componentWillMount() {
    this._retrieveData();
  }

  _storeData = async (newJson) => {
    const { charlieList } = this.state;
    charlieList.push(newJson);
    try {
      await AsyncStorage.setItem('CHARLIE_DATA', JSON.stringify(charlieList));
      this.setState({ charlieList });
    } catch (error) {
      console.warn(error);
      // Error saving data
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('CHARLIE_DATA');
      if (value !== null) {
        this.setState({
          charlieList: Array.from(JSON.parse(value)),
        })
      }
    } catch (error) {
      // Error retrieving data
    }
  };


  static navigationOptions = ({ navigation }) => ({
    title: Locales.CHARLIE.title,
    headerLeft: ( <MenuIcon onPress={() => navigation.openDrawer()} />)
  });

  onPress() {
    this.props.navigation.navigate("AddCharlie", { onSave: this._storeData });
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <FlatList
          style={{ flex: 1, alignSelf: 'stretch', marginHorizontal: 20 }}
          data={this.state.charlieList} 
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