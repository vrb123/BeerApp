import React from 'react';
import {View, Text, Button, ActivityIndicator, StyleSheet} from 'react-native';

import ProfileInfo from '../layout/ProfileInfo';

import SubmitButton from '../layout/SubmitButton';

import AsyncStorage from '@react-native-community/async-storage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8EE2B0',
  },
});

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
    headerStyle: {
      backgroundColor: '#499467',
    },
    headerTintColor: '#8EE2B0',
    headerTitleStyle: {
      fontWeight: '400',
    },
  };

  _logOut = async () => {
    await this.props.screenProps.clearUserId();
    this.props.navigation.navigate('Auth');
  };

  state = {
    user: null,
  };

  _getUserInfo = () => {
    fetch(
      'https://rn-bootcamp-09-2019.herokuapp.com/api/user/' +
        this.props.screenProps.userId,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(data => {
        // console.log('Data received user: ');
        // console.log(data.user);
        this.setState({user: data.user});
      })
      .catch(err => {
        console.log(this.props);
        this.setState({user: {error: true}});
      });
  };

  async componentDidMount() {
    await this._getUserInfo();
    this.props.navigation.setParams({
      OpenEdit: () => {
        this.props.navigation.navigate('EditProfile', {
          onSuccess: () => this._getUserInfo(),
          user: this.state.user,
        });
      },
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.user === null ? (
          <ActivityIndicator />
        ) : (
          <View>
            <ProfileInfo user={this.state.user} />
            <SubmitButton onPress={this._logOut} text="Log out" />
          </View>
        )}
      </View>
    );
  }
}
