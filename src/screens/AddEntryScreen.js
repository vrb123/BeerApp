import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CreateEntryForm from '../layout/CreateEntryForm';

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

export default class AddEntryScreen extends React.Component {
  static navigationOptions = {
    title: 'Add entry',
    headerStyle: {
      backgroundColor: '#499467',
    },
    headerTintColor: '#8EE2B0',
    headerTitleStyle: {
      fontWeight: '400',
    },
  };

  state = {
    markerLocation: null,
  };

  _updateMarkerLocation = markerLocation => {
    this.setState({markerLocation});
  };

  _createEntry = async data => {
    if (this.state.markerLocation) data.location = this.state.markerLocation;
    const response = await fetch(
      'https://rn-bootcamp-09-2019.herokuapp.com/api/event/entry',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          userId: this.props.screenProps.userId,
          eventId: this.props.navigation.getParam('eventId'),
        }),
      },
    );
    const result = await response.json();
    console.log(result);
    this.props.navigation.getParam('onSuccess')();
    this.props.navigation.goBack();
  };

  _onProvideLocation = () => {
    this.props.navigation.navigate('ProvideLocationEntry', {
      onChangeMarker: this._updateMarkerLocation,
      location: this.state.markerLocation,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <CreateEntryForm
          onSubmit={this._createEntry}
          onProvideLocation={this._onProvideLocation}
          submitTitle="Add entry"
        />
      </View>
    );
  }
}
