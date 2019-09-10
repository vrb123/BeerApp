import React from 'react';
import styles from './style';
import {TouchableOpacity, Text} from 'react-native';

const SubmitButton = ({text, onPress}) => (
  <TouchableOpacity style={styles.buttonStyle} onPress={() => onPress()}>
    <Text style={styles.textStyle}>{text}</Text>
  </TouchableOpacity>
);

export default SubmitButton;
