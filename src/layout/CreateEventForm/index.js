import React from 'react';
import {View, Text, Button} from 'react-native';

import * as ValidationTypes from '../../validation/validationTypes';

import styles from './styles';

import TextInput from '../../components/TextInput';

import DateTimePicker from '../../components/DateTimePicker';

export default class CreateEventForm extends React.Component {
  state = {
    showError: false,
    errors: {},
    title: '',
    description: '',
    timeStart: null,
    timeEnd: null,
  };

  onSubmit = async () => {
    await this.setState({showError: true});
    if (this.isFormValid() && this.timeIsCorrect()) {
      this.props.onSubmit({
        title: this.state.title,
        description: this.state.description,
        timeStart: this.state.timeStart.toISOString(),
        timeEnd: this.state.timeEnd.toISOString(),
      });
    }
  };

  setTimeStart = date => this.setState({timeStart: date});

  setTimeEnd = date => this.setState({timeEnd: date});

  isFormValid = () =>
    Object.keys(this.state.errors).every(txt => this.state.errors[txt] === '');

  timeIsCorrect = () => {
    const {timeStart, timeEnd} = this.state;
    console.log(+timeStart);
    console.log(+timeEnd);
    if (timeStart === null && timeEnd === null) {
      return false;
    }
    return +timeStart < +timeEnd;
  };

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
          label="Enter event name:"
          provideLog={this.handleLog}
          validationRules={{
            minLength: 5,
            maxLength: 20,
          }}
          inputProps={{
            placeholder: 'Enter event name',
            fontSize: 18,
            value: this.state.title,
            onChangeText: this.handleTextChange('title'),
          }}
          showError={this.state.showError}
        />
        {this.state.showError && (
          <Text style={{color: 'red'}}>{this.state.errors.Password}</Text>
        )}
        <TextInput
          label="Description: "
          provideLog={this.handleLog}
          validationRules={{
            minLength: 3,
            maxLength: 20,
          }}
          inputProps={{
            placeholder: 'Enter event description',
            fontSize: 18,
            value: this.state.description,
            onChangeText: this.handleTextChange('description'),
          }}
          showError={this.state.showError}
        />
        
        <DateTimePicker onChange={this.setTimeStart} title="Set time start" />
        <DateTimePicker onChange={this.setTimeEnd} title="Set time end" />
        <Button title={this.props.submitTitle} onPress={this.onSubmit} />
      </View>
    );
  }
}

{
  /* <Text>
          {this.state.timeStart && this.state.timeStart.toISOString()}
        </Text>
        <Text>{this.state.timeEnd && this.state.timeEnd.toISOString()}</Text> */
}
