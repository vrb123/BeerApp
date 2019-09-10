import React, {Component} from 'react';

import {View, Button, StyleSheet} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Form from '../layout/Form';

import MoveButton from '../layout/MoveButton';

import LoginForm from '../layout/LogForm';

const styles = StyleSheet.create({
  moveButton: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#8EE2B0',
  },
  form: {
    flex: 7,
  },
});

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login',
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#499467',
    },
    headerTintColor: '#8EE2B0',
    headerTitleStyle: {
      fontWeight: '400',
    },
  };

  onSubmit = async data => {
    try {
      const response = await fetch(
        'https://rn-bootcamp-09-2019.herokuapp.com/api/user/login',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({...data}),
        },
      );
      const result = await response.json();
      if (result.status === 'error') return;
      await this.props.screenProps.setUserId(result.id);
      this.props.navigation.navigate('Main');
    } catch (error) {
      console.log('error');
    }

    //this.props.navigation.navigate('Main');
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <LoginForm onSubmit={this.onSubmit} submitTitle="Log in" />
        </View>
        <View style={styles.moveButton}>
          <MoveButton
            text="Not yet registered?"
            onPress={() => this.props.navigation.navigate('SignUp')}
          />
        </View>
      </View>
    );
  }
}

export default LoginScreen;
