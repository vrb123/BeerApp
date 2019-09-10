import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#40C574',
  },
});

import Event from '../Event';

export default class EventList extends React.Component {
  displayEvent = ({item}) => (
    <Event onPress={this.props.onSingleEventPress} event={item} />
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.events}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.displayEvent}
        />
      </View>
    );
  }
}
