import React from 'react';
import {View, Text, Button} from 'react-native';

import * as ValidationTypes from '../../validation/validationTypes';

import TextInput from '../../components/TextInput';

export default class LoginForm extends React.Component {
  state = {
    showError: false,
    Email: '',
    Password: '',
    errors: {},
  };

  onSubmit = async () => {
    await this.setState({showError: true});
    if (this.isFormValid()) {
      this.props.onSubmit();
    }
  };

  isFormValid = () => Object.keys(this.state.errors).every(txt => txt === '');

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
      <View>
        {this.state.showError && (
          <Text style={{color: 'red'}}>{this.state.errors.Email}</Text>
        )}
        <TextInput
          label="Email"
          provideLog={this.handleLog}
          validationRules={{
            type: ValidationTypes.EMAIL,
            minLength: 10,
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
            minLength: 10,
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
