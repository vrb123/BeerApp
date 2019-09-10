import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import SubmitButton from '../layout/SubmitButton';

export default class ProvideLocationEntryScreen extends React.Component {
  static navigationOptions = {
    title: 'Location provider',
    headerStyle: {
      backgroundColor: '#499467',
    },
    headerTintColor: '#8EE2B0',
    headerTitleStyle: {
      fontWeight: '400',
    },
  };

  state = {
    marker: this.props.navigation.getParam('location') || null,
    region:
      (this.props.navigation.getParam('location') && {
        ...this.props.navigation.getParam('location'),
        latitudeDelta: 0.04,
        longitudeDelta: 0.05,
      }) ||
      null,
  };

  componentDidMount() {
    if (!this.state.region) {
      // if no initial location provided by props get current location
      this._getCurrentLocation();
    }
  }

  _getCurrentLocation = async () => {
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            ...position.coords,
            latitudeDelta: 0.04,
            longitudeDelta: 0.05,
          },
        });
      },
      error => {
        this.setState({error: error.message});
      },
      {enableHighAccuracy: true, timeout: 5000, maximumAge: 1000},
    );
  };

  _onSubmitLocation = () => {
    this.props.navigation.getParam('onChangeMarker')(this.state.marker);
    this.props.navigation.goBack();
  };

  _putMarker = async e => {
    await e.persist();
    this.setState({marker: e.nativeEvent.coordinate});
  };

  render() {
    if (!this.state.region) return <ActivityIndicator size={100} />;
    return (
      <View style={{flex: 1}}>
        <MapView
          style={{flex: 1}}
          initialRegion={this.state.region}
          showsUserLocation={true}
          showsCompass={true}
          zoomControlEnabled={true}
          showsTraffic={true}
          provider={PROVIDER_GOOGLE}
          onPress={this._putMarker}>
          {this.state.marker && (
            <MapView.Marker coordinate={this.state.marker} />
          )}
        </MapView>
        {this.state.marker && (
          <SubmitButton
            onPress={this._onSubmitLocation}
            text="Submit location"
          />
        )}
      </View>
    );
  }
}
