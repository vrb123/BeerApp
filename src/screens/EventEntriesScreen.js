import React from 'react';
import {View} from 'react-native';

import EntriesList from '../components/EntriesList';

export default props => {
  console.log(props.navigation.getParam('entries'));
  return <EntriesList entries={props.navigation.getParam('entries')} />;
};
