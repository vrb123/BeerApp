import React from 'react';
import {View, Text, Button} from 'react-native';

import * as ValidationTypes from '../../validation/validationTypes';

import styles from './styles';

import TextInput from '../../components/TextInput';

export default class Form extends React.Component {
  state = {
    showError: false,
    // Email: '',
    // Password: '',
    errors: {},
  };

  onSubmit = async () => {
    await this.setState({showError: true});
    if (this.isFormValid()) {
      console.log(this.state);
      this.props.onSubmit({
        email: this.state.email,
        password: this.state.password,
      });
    }
  };

  isFormValid = () =>
    Object.keys(this.state.errors).every(txt => this.state.errors[txt] === '');

  handleLog = (name, log) => {
    if (this.state.errors[name] === log) return;
    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        [name]: log,
      },
    }));
  };

  handleTextChange = key => text => {
    this.setState({
      [key]: text,
      showError: false,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.showError && (
          <Text style={{color: 'red'}}>{this.state.errors.Email}</Text>
        )}
        <TextInput
          label="Email"
          provideLog={this.handleLog}
          validationRules={{
            type: ValidationTypes.EMAIL,
            minLength: 6,
            maxLength: 20,
          }}
          inputProps={{
            placeholder: 'Enter email',
            fontSize: 18,
            value: this.state.email,
            onChangeText: this.handleTextChange('email'),
          }}
          showError={this.state.showError}
        />
        {this.state.showError && (
          <Text style={{color: 'red'}}>{this.state.errors.Password}</Text>
        )}
        <TextInput
          label="Password"
          provideLog={this.handleLog}
          validationRules={{
            minLength: 3,
            maxLength: 20,
          }}
          inputProps={{
            placeholder: 'Enter password',
            fontSize: 18,
            value: this.state.password,
            secureTextEntry: true,
            onChangeText: this.handleTextChange('password'),
          }}
          showError={this.state.showError}
        />
        <Button title={this.props.submitTitle} onPress={this.onSubmit} />
      </View>
    );
  }
}
