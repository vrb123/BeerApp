import React from 'react';
import {View, Text} from 'react-native';

import EditEventForm from '../layout/EditEventForm';

export default class EditEventScreen extends React.Component {
  static navigationOptions = {
    title: 'Edit event',
    headerStyle: {
      backgroundColor: '#499467',
    },
    headerTintColor: '#8EE2B0',
    headerTitleStyle: {
      fontWeight: '400',
    },
  };

  _onEditEvent = async data => {
    const response = await fetch(
      'https://rn-bootcamp-09-2019.herokuapp.com/api/event',
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.props.navigation.getParam('id'),
          event: {
            ...data,
          },
          userId: this.props.screenProps.userId,
        }),
      },
    );
    const result = await response.json();
    this.props.navigation.getParam('onSuccess')();
    this.props.navigation.goBack();
  };

  render() {
    const event = this.props.navigation.getParam('event');
    return (
      <EditEventForm
        event={event}
        onSubmit={this._onEditEvent}
        submitTitle="Edit event"
      />
    );
  }
}
