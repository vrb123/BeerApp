import React, {Component} from 'react';

import {View, Text, ActivityIndicator, Button, StyleSheet} from 'react-native';

import EventList from '../components/EventList';

// import events from '../../mockData';

import SocketIOClient from 'socket.io-client';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#40C574',
  },
  text: {
    fontFamily: 'Lobster-Regular',
    fontSize: 21,
  },
});

class EventsScreen extends Component {
  static navigationOptions = {
    title: 'Events',
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#499467',
    },
    headerTintColor: '#8EE2B0',
    headerTitleStyle: {
      fontWeight: '400',
    },
  };

  state = {
    events: [],
  };
  onSingleEventPress = event => {
    console.log(event);
    this.props.navigation.push('EventDetails', {
      id: event._id,
      title: event.title,
      onDelete: () => this._getData(),
      onEdit: () => this._getData(),
    });
  };

  componentDidMount() {
    this._getData();
    this.initSocket();
    this.props.navigation.setParams({
      openCreateNew: () => {
        this.props.navigation.navigate('AddEvent', {
          onSuccess: () => this._getData(),
        });
      },
    });
  }

  _getData = () => {
    fetch('https://rn-bootcamp-09-2019.herokuapp.com/api/event', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Events');
        console.log(data);
        this.setState({
          events: data.allEvents,
        });
      })
      .catch(err => {
        console.log('Error');
      });
  };

  //todo fetch events and save user data in async storage
  initSocket = () => {
    this.socket = new SocketIOClient(
      'https://rn-bootcamp-09-2019.herokuapp.com',
    );
    this.socket.on('test', data => {});
  };

  render() {
    if (!this.state.events) {
      return <ActivityIndicator />;
    }
    return (
      <View style={styles.container}>
        <EventList
          events={this.state.events}
          onSingleEventPress={this.onSingleEventPress}
        />
      </View>
    );
  }
}

export default EventsScreen;
