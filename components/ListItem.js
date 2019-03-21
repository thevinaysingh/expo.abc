import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  name: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: 'black'
  },
});

const ListItem = props => (
    <View style={{ flex:1, flexDirection:'row', borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
      <View style={{ alignSelf: 'stretch', flex:1, height:80, justifyContent:'center' }}>
        <Text style={styles.name}>{props.item.name}</Text>
      </View>
      <View style={{ width:80, height:80, justifyContent:'center' }}>
      {
        props.score >= props.item.number &&
          <Image
            onPress={() => props.onPress(props.item.number)}
            style={{ width: 50, height: 50 }}
            source={props.item.url}
          />
      }
      </View>            
  </View>
);

export default ListItem;
