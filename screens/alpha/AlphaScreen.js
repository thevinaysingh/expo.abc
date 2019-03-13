import React from 'react';
import {
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import routines_data  from './Alphadata.js';
import ListItem from '../../components/ListItem';
import ListSeparator from '../../components/ListSeparator';
import FloatingButton from '../../components/FloatingButton.js';
import { Locales } from '../../constants/locales.js';


export default class AlphaScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alphaList: Array.from(routines_data),
    };
  }

  static navigationOptions = {
    title: Locales.ALPHA.title,
  };

  onPress() {
    this.props.navigation.navigate("AddAlpha")
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