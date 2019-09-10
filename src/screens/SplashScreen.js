import React from 'react';
import {Text, StyleSheet, ImageBackground} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 56,
    top: 40,
    fontFamily: 'Lobster-Regular',
  },
});

const SPLASH_SCREEN_PATH = '../assets/splash_beer.png';

export default class SplashScreen extends React.Component {
  render() {
    return (
      <ImageBackground
        source={require(SPLASH_SCREEN_PATH)}
        style={styles.container}>
        <Text style={styles.text}>Beer App</Text>
      </ImageBackground>
    );
  }
}
