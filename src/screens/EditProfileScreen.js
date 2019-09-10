import React from 'react';
import {View, Text} from 'react-native';

import EditProfileForm from '../layout/EditProfileForm';

export default class EditProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Edit profile',
    headerStyle: {
      backgroundColor: '#499467',
    },
    headerTintColor: '#8EE2B0',
    headerTitleStyle: {
      fontWeight: '400',
    },
  };

  _saveProfile = async data => {
    fetch('https://rn-bootcamp-09-2019.herokuapp.com/api/user', {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          ...data,
        },
        userId: this.props.screenProps.userId,
      }),
    })
      .then(resp => resp.json())
      .then(result => {
        console.log(result);
        this.props.navigation.getParam('onSuccess')();
        this.props.navigation.goBack();
      })
      .catch(e => console.log('Error occured while saving...'));
  };

  render() {
    const {displayName, imageUrl} = this.props.navigation.getParam('user');
    return (
      <EditProfileForm
        displayName={displayName}
        image={imageUrl}
        onSubmit={this._saveProfile}
        onSave={this._saveProfile}
        submitTitle="Save profile"
      />
    );
  }
}
