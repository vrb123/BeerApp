import React from 'react';
import {TouchableOpacity, Button, View, Text, StyleSheet} from 'react-native';

import DeleteEntryButton from '../../layout/DeleteEntryButton';
import EditEntryButton from '../EditEntryButton';
import AddEntryButton from '../AddEntryButton';

import RegisterEventButton from '../RegisterEventButton';

import DeleteEventButton from '../DeleteEventButton';

import EditEventButton from '../EditEventButton';
import ShowEntriesButton from '../ShowEntriesButton';

const dateFormat = require('dateformat');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8EE2B0',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Lobster-Regular',
    color: '#158040',
    alignContent: 'center',
  },
  description: {
    fontSize: 16,
    color: '#499467',
    fontStyle: 'italic',
    paddingBottom: 7.5,
  },
});

const EventDetails = props => {
  const createdAt = new Date(props.event.createdAt);
  const timeEnd = new Date(props.event.timeEnd);
  const currentTime = new Date();
  return (
    <View style={styles.container}>
      {!props.isRegistered && (
        <RegisterEventButton text="Register" onPress={props.onRegister} />
      )}

      <Text style={styles.title}>{props.event.title}</Text>
      {props.isOwner && (
        <View>
          <DeleteEventButton text="Delete event" onPress={props.onDelete} />
          <EditEventButton text="Edit event" onPress={props.onEdit} />
        </View>
      )}

      {props.isRegistered && !!props.userEntry && (
        <View style={{flexDirection: 'row'}}>
          <View style={{padding: 5}}>
            <DeleteEntryButton
              text="Delete entry"
              onPress={props.onDeleteEntry}
            />
          </View>

          <View style={{padding: 5}}>
            <EditEntryButton text="Edit entry" onPress={props.onEditEntry} />
          </View>
        </View>
      )}

      <ShowEntriesButton onPress={props.onViewAllEntries} text="View all events" />

      {props.isRegistered && !props.userEntry && (
        <AddEntryButton text="Add entry" onPress={props.onAddEntry} />
      )}
      <Text style={styles.description}>{props.event.description}</Text>
      <Text style={styles.description}>Starts on:</Text>
      <Text style={styles.description}>
        {dateFormat(new Date(props.event.timeStart), ' dddd, mmmm dS, yyyy')}
      </Text>
      <Text style={styles.description}>
        {dateFormat(new Date(props.event.timeStart), ' h:MM:ss TT')}
      </Text>
      <Text style={styles.description}>Ends on:</Text>
      <Text style={styles.description}>
        {dateFormat(timeEnd, ' dddd, mmmm dS, yyyy')}
      </Text>
      <Text style={styles.description}>
        {dateFormat(timeEnd, ' h:MM:ss TT')}
      </Text>
    </View>
  );
};

export default EventDetails;

{
  /* <Text style={styles.description}>
        Created on
        {dateFormat(createdAt, ' dddd, mmmm dS, yyyy')}
      </Text> */
}
