import React from 'react';
import {View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import BackButton from '../BackButton';

export default class ProvideLocationEntry extends React.Component {
  state = {
    marker: this.props.marker || null,
    region: this.props.location || null,
  };

  componentDidMount() {
    // if (!this.state.region) {
    //   console.log('Ggetting position current');
    //   // if no initial location provided by props get current location
    //   this._getCurrentLocation();
    // }
  }

  _onFinish = () => this.props.onFinish(this.state.marker);

  _getCurrentLocation = async () => {
    Geolocation.getCurrentPosition(
      info => console.log(info),
      error => console.log(error),
      {
        // enableHighAccuracy: false,
        // timeout: 20000,
        // maximumAge: 10000,
      },
    );
    // console.log('Ggetting position current');
    // Geolocation.getCurrentPosition(
    //   position => {
    //     console.log('Position');
    //     console.log(position);
    //     this.setState({
    //       region: position.coords,
    //     });
    //   },
    //   error => {
    //     console.log('Error');
    //     console.log(error.message);
    //     this.setState({error: error.message})
    //   },
    //   {enableHighAccuracy: false, timeout: 200000, maximumAge: 1000},
    // );
  };

  _putMarker = e => this.setState({marker: e.nativeEvent.coordinate});

  render() {
    // console.log('Region');
    // console.log(this.state.region);
    // if (!this.state.region) {
    //   return null;
    // }
    return (
      <View style={{flex: 1}}>
        <BackButton onPress={this._onFinish} text="Back" />
        <MapView
          style={{flex: 1}}
          // initialRegion={this.state.region}
          showsUserLocation={true}
          showsCompass={true}
          zoomControlEnabled={true}
          showsTraffic={true}
          onPress={this._putMarker}>
          {this.state.marker && (
            <MapView.Marker coordinate={this.state.marker} />
          )}
        </MapView>
      </View>
    );
  }
}
