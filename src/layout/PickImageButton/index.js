import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  icon: {
    backgroundColor: '#499467',
    color: '#8EE2B0',
  },
  container: {
    paddingTop: 15,
  },
});

export default props => (
  <View style={styles.container}>
    <Icon.Button
      style={styles.icon}
      name="image-plus"
      onPress={() => props.onPress()}
      solid>
      {props.text}
    </Icon.Button>
  </View>
);
