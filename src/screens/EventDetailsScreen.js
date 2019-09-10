import React from 'react';
import {View, ActivityIndicator, Alert} from 'react-native';

import EventDetails from '../components/EventDetails';

export default class EventDetailsScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('title') || 'Event details',
    headerStyle: {
      backgroundColor: '#499467',
    },
    headerTintColor: '#8EE2B0',
    headerTitleStyle: {
      fontWeight: '400',
    },
  });

  state = {
    event: null,
    isLoading: true,
    isOwner: false,
    isRegistered: false,
    publishedEntry: false,
  };

  _askConfirmationDeleteEvent = () => {
    Alert.alert(
      'Delete prompt',
      'Are you sure you want to delete event?',
      [
        {
          text: 'Delete',
          onPress: () => {
            this._onDeleteEvent();
          },
        },
        {
          text: 'Cancel',
          onPress: () => {},
        },
      ],
      {cancelable: false},
    );
  };

  _askConfirmationDeleteEntry = () => {
    Alert.alert(
      'Delete prompt',
      'Are you sure you want to delete entry?',
      [
        {
          text: 'Delete',
          onPress: () => {
            this._onDeleteEntry();
          },
        },
        {
          text: 'Cancel',
          onPress: () => {},
        },
      ],
      {cancelable: false},
    );
  };

  _onDeleteEvent = async () => {
    try {
      const response = await fetch(
        'https://rn-bootcamp-09-2019.herokuapp.com/api/event',
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: this.props.navigation.getParam('id'),
            userId: this.props.screenProps.userId,
          }),
        },
      );
      const result = await response.json();
      this.props.navigation.getParam('onDelete')();
      this.props.navigation.navigate('Events');
    } catch (e) {
      console.log('Error occured while deleting event ...' + e); //todo
    }
  };

  _onDeleteEntry = async () => {
    try {
      const response = await fetch(
        'https://rn-bootcamp-09-2019.herokuapp.com/api/event/entry',
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: this.state.publishedEntry[0]._id,
            userId: this.props.screenProps.userId,
          }),
        },
      );
      const result = await response.json();
      this.onSuccessMutation();
    } catch (e) {
      console.log('Error occured while deleting entry ...' + e);
    }
  };

  _onEdit = () => {
    this.props.navigation.navigate('EditEvent', {
      id: this.props.navigation.getParam('id'),
      event: this.state.event,
      onSuccess: () => {
        this._getData();
        this.props.navigation.getParam('onEdit')();
      },
    });
  };

  _onViewAllEntries = () => {
    this.props.navigation.navigate('EventEntries', {
      entries: this.state.event && this.state.event.eventEntries,
    });
  };

  _onRegisterEvent = async () => {
    try {
      const response = await fetch(
        'https://rn-bootcamp-09-2019.herokuapp.com/api/event/add-user',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventId: this.props.navigation.getParam('id'),
            userEmail: this.state.email,
          }),
        },
      );
      const result = await response.json();
      console.log(result);
      if (result.status === 'success') {
        this.setState({isRegistered: true});
      }
    } catch (e) {
      console.log('Error occured while registering...' + e); //todo
    }
  };

  _onAddEntry = () => {
    this.props.navigation.navigate('AddEntry', {
      eventId: this.props.navigation.getParam('id'),
      onSuccess: () => {
        this.onSuccessMutation();
      },
    });
  };

  _onEditEntry = () => {
    this.props.navigation.navigate('EditEntry', {
      entry: this.state.publishedEntry[0], //todo
      onSuccess: () => {
        this.onSuccessMutation();
      },
    });
  };

  _checkIsAlreadyRegistered = () => {
    console.log('State:');
    console.log(this.state);
    this.setState({
      isRegistered:
        this.state.event.invitedUsers.filter(
          user => user.userEmail === this.state.email,
        ).length > 0,
      isLoading: false,
    });
  };

  _checkAlreadyPublishedEntry = () => {
    this.setState({
      publishedEntry: this.state.event.eventEntries.filter(
        entry => entry.userId === this.props.screenProps.userId,
      ),
    });
  };

  _getCurrentUserEmail = async () => {
    try {
      const response = await fetch(
        'https://rn-bootcamp-09-2019.herokuapp.com/api/user/' +
          this.props.screenProps.userId,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      await this.setState({email: data.user.email});
    } catch (err) {
      console.log(err);
    }
  };

  _getData = async () => {
    try {
      const response = await fetch(
        'https://rn-bootcamp-09-2019.herokuapp.com/api/event/' +
          this.props.navigation.getParam('id'),
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      if (data.status === 'success') {
        console.log('Details: '); // Todo remove
        console.log(data);
        await this.setState({
          event: data.event,
          isOwner: data.event.ownerId === this.props.screenProps.userId,
        });
      }
    } catch (err) {
      console.log('Error'); //Todo
    }
  };

  onSuccessMutation = async () => {
    await this._getData();
    await this._checkIsAlreadyRegistered();
    if (this.state.isRegistered) {
      this._checkAlreadyPublishedEntry();
    }
  };

  async componentDidMount() {
    await this._getCurrentUserEmail();
    await this._getData();
    await this._checkIsAlreadyRegistered();
    if (this.state.isRegistered) {
      this._checkAlreadyPublishedEntry();
    }
  }

  render() {
    if (this.state.isLoading === true) return <ActivityIndicator />;
    return (
      <EventDetails
        event={this.state.event}
        isOwner={this.state.isOwner}
        onDelete={this._askConfirmationDeleteEvent}
        onEdit={this._onEdit}
        onAddEntry={this._onAddEntry}
        onEditEntry={this._onEditEntry}
        onDeleteEntry={this._askConfirmationDeleteEntry}
        isRegistered={this.state.isRegistered}
        onRegister={this._onRegisterEvent}
        onViewAllEntries={this._onViewAllEntries}
        userEntry={
          this.state.publishedEntry.length > 0
            ? this.state.publishedEntry[0]
            : null
        }
      />
    );
  }
}
