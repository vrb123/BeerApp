import React from 'react';
import {View} from 'react-native';

import EntriesList from '../components/EntriesList';

const EventEntriesScreen =  props => {
  return <EntriesList entries={props.navigation.getParam('entries')} />;
};

EventEntriesScreen.navigationOptions = {};

export default EventEntriesScreen;