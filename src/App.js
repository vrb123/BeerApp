import React from 'react';
import {Text, View, YellowBox} from 'react-native';
import Navigator from './navigation';
import {StackActions, SwitchActions} from 'react-navigation';

import SplashScreen from '../src/screens/SplashScreen';

import AsyncStorage from '@react-native-community/async-storage';

import codePush from 'react-native-code-push';

const codePushOptions = {checkFrequence: codePush.CheckFrequenc.ON_APP_RESUME};

YellowBox.ignoreWarnings(['WebSocket', 'componentWillMount']);

class App extends React.Component {
  state = {
    userId: '',
    isLoading: false,
  };

  _provideUserId = async (onLoad = () => {}, wait = true) => {
    const value = await AsyncStorage.getItem('userId');
    if (value !== null) {
      await this.setState({userId: value, isLoading: false});
    }
    wait ? setTimeout(onLoad, 2000) : onLoad();
  };

  setUserId = async userId => {
    await AsyncStorage.setItem('userId', userId);
    this._provideUserId(this._onUserInfoLoaded);
  };

  clearUserId = async () => {
    await AsyncStorage.setItem('userId', '');
    this._provideUserId();
  };

  componentDidMount() {
    this._provideUserId(this._onUserInfoLoaded), false;
  }

  _onUserInfoLoaded = () => {
    this.navigation &&
      this.navigation.dispatch(
        SwitchActions.jumpTo({
          routeName: this.state.userId !== '' ? 'Main' : 'Auth',
        }),
      );
  };

  render() {
    if (this.state.isLoading) return <SplashScreen />;
    return (
      <Navigator
        ref={nav => {
          this.navigation = nav;
        }}
        screenProps={{
          userId: this.state.userId,
          setUserId: this.setUserId,
          clearUserId: this.clearUserId,
        }}
      />
    );
  }
}

export default codePush(codePushOptions)(App);
