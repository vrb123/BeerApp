import React from 'react';
import {View, StyleSheet} from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';

import MoveButton from '../layout/MoveButton';

import SignUpForm from '../layout/SignUpForm';

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

export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign Up',
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
        'https://rn-bootcamp-09-2019.herokuapp.com/api/user/register',
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
      // await AsyncStorage.setItem('userId', result.id);
      await this.props.screenProps.setUserId(result.id);
      this.props.navigation.navigate('Main');
    } catch (error) {
      console.log('error');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <SignUpForm onSubmit={this.onSubmit} submitTitle="Sign Up" />
        </View>
        <View style={styles.moveButton}>
          <MoveButton
            text="Already registered?"
            onPress={() => this.props.navigation.navigate('Login')}
          />
        </View>
      </View>
    );
  }
}
