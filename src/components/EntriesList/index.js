import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

import Entry from '../Entry';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#40C574',
  },
  text: {
    fontSize: 19,
    color: '#fff',
  }
});

export default class EntriesList extends React.Component {
  _renderEntry = ({item, index}) => <Entry data={item} number={index+1} />;

  render() {
    return (
      <View style={styles.container}>
      {this.props.entries.length >0 ? (
        <FlatList
          data={this.props.entries}
          renderItem={this._renderEntry}
          keyExtractor={(item, index) => index.toString()}
        />
      ): <Text style={styles.text}>No entries...</Text>}
        
      </View>
    );
  }
}
