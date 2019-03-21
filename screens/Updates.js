import React from 'react';
import { Text, View, StyleSheet, CheckBox, ScrollView, Dimensions } from 'react-native';
import MenuIcon from '../components/MenuIcon.js';
import { Locales } from '../constants/locales.js';
import TwoButtonFooter from '../components/TwoButtonFooter.js';
import SimpleCarousel from '../components/SimpleCorousal.js';

const bravoData = [
  {
    id: "item_20_2_2019",
    label: "20/2/2019",
    data: [{
      name: "hashj",
      type: "dddd",
      id: Date.now().toString(),
      charlie_amount: 80,
      alpha_amount: 900,
      status: 0
    },
    {
      name: "hashj",
      type: "dddd",
      id: Date.now().toString(),
      charlie_amount: 80,
      alpha_amount: 900,
      status: 0
    }
  ],
  },
  {
    id: "item_20_2_2019",
    label: "20/2/2019",
    data: [{
      name: "hashj",
      type: "dddd",
      id: Date.now().toString(),
      charlie_amount: 80,
      alpha_amount: 900,
      status: 0
    },
    {
      name: "hashj",
      type: "dddd",
      id: Date.now().toString(),
      charlie_amount: 80,
      alpha_amount: 900,
      status: 0
    }
  ],
  },
  {
    id: "item_20_2_2019",
    label: "20/2/2019",
    data: [{
      name: "hashj",
      type: "dddd",
      id: Date.now().toString(),
      charlie_amount: 80,
      alpha_amount: 900,
      status: 0
    },
    {
      name: "hashj",
      type: "dddd",
      id: Date.now().toString(),
      charlie_amount: 80,
      alpha_amount: 900,
      status: 0
    }
  ],
  }
]

export default class UpdatesScreen extends React.Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: Locales.GENERAL.updates,
    headerLeft: ( <MenuIcon onPress={() => navigation.openDrawer()} screenProps={screenProps} />)
  });

  onSave() {
    // TODO:
  }

  onPressCross = (item, itemIndex, list, listIndex) => {
    const { onUpdateCharlieScore } = this.props.screenProps;
    // if(item.status != 0) {
    //   return;
    // }
    onUpdateCharlieScore(item, itemIndex, list, listIndex);
  }

  onPressTick = (item, itemIndex, list, listIndex) => {
    const { onUpdateAlphaScore } = this.props.screenProps;
    // if(item.status != 0) {
    //   return;
    // }
    onUpdateAlphaScore(item, itemIndex, list, listIndex);
  }
  
  render() {
    const { bravoDateWiseList, bravoList } = this.props.screenProps;
    return (
      <View style ={styles.container}>
        {bravoList.length ? <SimpleCarousel 
          lists={bravoDateWiseList}
          onPressTick={this.onPressTick}
          onPressCross={this.onPressCross}
        /> :
        <Text
          style={{
            paddingVertical: 30,
            paddingHorizontal: 15,
          }}
        >{Locales.GENERAL.no_items_available}</Text>}
      </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }, 
  cancel: {
    top:500,
    borderWidth: 5,
    width:170,
    padding: 25,
    borderColor: 'black',
    backgroundColor: 'white'
  },
  save: {
    top:420,
    left:180,
    borderWidth: 5,
    width:180,
    padding: 25,
    borderColor: 'black',
    backgroundColor: 'white'
  }
});