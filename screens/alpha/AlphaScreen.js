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


export default class AlphaScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alphaList: [],
    };
  }

  componentWillMount() {
    this._retrieveData();
  }

  _storeData = async (newJson) => {
    const { alphaList } = this.state;
    alphaList.push(newJson);
    try {
      await AsyncStorage.setItem('ALPHA_DATA', JSON.stringify(alphaList));
      this.setState({ alphaList });
    } catch (error) {
      console.warn(error);
      // Error saving data
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('ALPHA_DATA');
      if (value !== null) {
        this.setState({
          alphaList: Array.from(JSON.parse(value)),
        })
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  static navigationOptions = ({ navigation }) => ({
    title: Locales.ALPHA.title,
    headerLeft: ( <MenuIcon onPress={() => navigation.openDrawer()} />)
  });

  onPress() {
    this.props.navigation.navigate("AddAlpha", { onSave: this._storeData })
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <FlatList
          style={{ flex: 1, alignSelf: 'stretch', marginHorizontal: 20 }}
          data={this.state.alphaList} 
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