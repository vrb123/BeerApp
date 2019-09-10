import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  icon: {
    backgroundColor: '#499467',
    color: '#8EE2B0',
  },
});

export default props => (
  <Icon.Button
    style={styles.icon}
    name="arrow-back"
    onPress={() => props.onPress()}
    solid>
    {props.text}
  </Icon.Button>
);
