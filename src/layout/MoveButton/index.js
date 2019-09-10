import React from 'react';
import styles from './style';
import {TouchableOpacity, Text} from 'react-native';

const MoveButton = ({text, onPress}) => (
  <TouchableOpacity style={styles.buttonStyle} onPress={() => onPress()}>
    <Text style={styles.textStyle}>{text}</Text>
  </TouchableOpacity>
);

export default MoveButton;
