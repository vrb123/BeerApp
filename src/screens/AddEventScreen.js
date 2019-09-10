import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CreateEventForm from '../layout/CreateNewEventForm';

const styles = StyleSheet.create({
  moveButton: {
    flex: 1,
  },
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: '#40C575',
  },
});

export default class AddEventScreen extends React.Component {
  static navigationOptions = {
    title: 'Add event',
    headerStyle: {
      backgroundColor: '#499467',
    },
    headerTintColor: '#8EE2B0',
    headerTitleStyle: {
      fontWeight: '400',
    },
  };

  _createEvent = async event => {
    try {
      const response = await fetch(
        'https://rn-bootcamp-09-2019.herokuapp.com/api/event',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...event,
            ownerId: this.props.screenProps.userId,
          }),
        },
      );
      const result = await response.json();
      this.props.navigation.getParam('onSuccess')();
      this.props.navigation.navigate('Events');
    } catch (err) {
      console.log('Error while creating new event');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <CreateEventForm
          onSubmit={this._createEvent}
          submitTitle="Create event"
        />
      </View>
    );
  }
}
