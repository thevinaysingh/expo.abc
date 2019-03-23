import React, { Component } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { Constants, Icon } from 'expo';
import { Images } from '../assets/images';

const { width } = Dimensions.get('window');
const height = width * 0.8

export default class SimpleCarousel extends Component {

  scrollView = null;

  render() {
    const { lists } = this.props;
    if (lists && lists.length) {
      return (
        <View style={styles.scrollContainer}>
          <ScrollView
            ref={(scrollView => { this.scrollView = scrollView })}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {lists.map((list, listIndex)=> (
              <View key={"item-"+listIndex} style={styles.itemContainer}>
                <View style={styles.itemInnerContainer}>
                  {
                    (lists.length > 1 && listIndex != 0) && 
                    <Icon.Ionicons
                      onPress={() => this.scrollView.scrollTo({x: (listIndex - 1) * width }) }
                      name={"md-arrow-back"} size={30}
                    />
                  }
                  <Text style={styles.itemTitle}>{list.label}</Text>
                  {
                    (lists.length > 1 && listIndex + 1 != lists.length) && 
                    <Icon.Ionicons
                      onPress={() => this.scrollView.scrollTo({x: (listIndex + 1) * width }) }
                      name={"md-arrow-forward"} size={30}
                    />
                  }
                </View>

                {
                  list.data.map((item, itemIndex) => (
                    <View  key={"listitem-"+itemIndex} style={styles.itemInnerRowContainer}>
                      <TouchableOpacity
                        onPress={() => this.props.onPressCross(item, itemIndex, list, listIndex)}
                        style={styles.crossContainer}
                      >
                        <Icon.Ionicons  color={"white"} name={"md-close"} size={30} />
                      </TouchableOpacity>
                      <Text style={[styles.rowLabel,
                        { backgroundColor: item.status === 0 ? "powderblue" : item.status === 1 ? "green" : "red" }]}>{item.name}</Text>
                      <TouchableOpacity
                        onPress={() => this.props.onPressTick(item, itemIndex, list, listIndex)}
                        style={styles.tickContainer}
                      >
                        <Icon.Ionicons color={"white"} name={"md-checkmark"} size={30} />
                      </TouchableOpacity>
                    </View>
                  ))
                }
              </View>
            ))}
          </ScrollView>
        </View>
      );
    }
    console.log('Please provide list');
    return null;    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  scrollContainer: {
    height,
    flex: 1,
  },
  image: {
    width,
    height,
  },
  itemContainer: {
    flex: 1,
    width,
  },
  itemInnerContainer: {
    height: 50,
    width,
    flexDirection: 'row',
    alignItems: "center",
    paddingHorizontal: 10,
  },
  itemTitle: {
    fontSize: 16,
    flex: 1,
    textAlign: "center",
  },
  itemInnerRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginVertical: 1,
  },
  crossContainer: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
  rowLabel: {
    height: 50,
    textAlignVertical: "center",
    textAlign: "center",
    backgroundColor: "powderblue",
    fontSize: 16,
    flex: 1, 
    fontWeight: "600",
    color: "white",
  },
  tickContainer: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
  },
});