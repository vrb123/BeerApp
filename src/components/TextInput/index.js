import React from 'react';
import {TextInput, Text, View} from 'react-native';

import Validation from '../../validation';

import styles from './styles';

export default class InputText extends React.Component {
  constructor(props) {
    super(props);
    const {type, minLength, maxLength} = this.props.validationRules;
    this.validation = new Validation(type, minLength, maxLength);
  }

  componentDidUpdate() {
    if (this.props.showError) {
      const log = this.validation.getLog(this.props.inputProps.value);
      this.props.provideLog(this.props.label, log);
    }
  }

  render() {
    const {label = '', inputProps = {}, containerStyle = {}} = this.props;
    return (
      <View style={[styles.container, containerStyle]}>
        <Text>{label}</Text>
        <TextInput {...inputProps} />
      </View>
    );
  }
}
