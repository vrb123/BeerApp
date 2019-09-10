import React, {Component} from 'react';
import {View, Button, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import DatePickerButton from '../../layout/DatePickerButton';

export default class App extends Component {
  state = {
    date: new Date(),
    mode: 'date',
    show: false,
  };

  setDate = async (event, date) => {
    date = date || this.state.date;

    const datePart = this.state.date.toISOString().split('T')[0];
    const timePart = date.toISOString().split('T')[1];

    await this.setState({
      show: Platform.OS === 'ios' ? true : false,
      date,
    });

    this.state.mode === 'date'
      ? this.show('time')
      : this.props.onChange(new Date(`${datePart}T${timePart}`));
  };

  show = mode => {
    this.setState({
      show: true,
      mode,
    });
  };

  datepicker = () => {
    this.show('date');
  };

  render() {
    const {show, date, mode} = this.state;

    return (
      <View>
        <View>
          <DatePickerButton onPress={this.datepicker} text={this.props.title} />
        </View>
        {show && (
          <DateTimePicker
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={this.setDate}
          />
        )}
      </View>
    );
  }
}
