import React from 'react';
import {TouchableOpacity, View, Image, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 9,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 9,
  },
});

export default class MiniatureImageWithDelete extends React.Component {
  state = {
    isPressed: false,
  };

  _onLongPress = () => {
    this.setState({
      isPressed: true,
    });
  };

  _onPressOut = () => {
    if (!this.state.isPressed) return;
    this.setState(
      {
        isPressed: false,
      },
      this.props.onDelete(this.props.index),
    );
  };

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.onPreview(this.props.index)}
        onLongPress={this._onLongPress}
        onPressOut={this._onPressOut}
        delayLongPress={500}>
        <View style={styles.container}>
          {this.state.isPressed ? (
            <Icon
              size={50}
              style={styles.icon}
              name="image-broken-variant"
              solid
            />
          ) : (
            <Image source={{uri: this.props.image.uri}} style={styles.image} />
          )}
        </View>
      </TouchableOpacity>
    );
  }
}
