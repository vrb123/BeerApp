import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

const dateFormat = require('dateformat');

// tintColor="#499467"
//             baseColor="#158040"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8EE2B0',
    padding: 15,
  },
  eventItem: {
    padding: 10,
    flex: 1,
  },
  title: {
    fontSize: 19,
    fontFamily: 'Lobster-Regular',
    color: '#158040',
  },
  description: {
    fontSize: 15,
    color: '#499467',
  },
});

const Event = props => (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => props.onPress(props.event)}>
      <View>
        <Text style={styles.title}>{props.event.title}</Text>
        <Text style={styles.description}>
          Planned on
          {dateFormat(new Date(props.event.timeStart), ' dddd, mmmm dS, yyyy')}
        </Text>
        <Text style={styles.description}>
          Starts in
          {dateFormat(new Date(props.event.timeStart), ' h:MM:ss TT')}
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

export default Event;
