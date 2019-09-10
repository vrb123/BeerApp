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

export default class MiniatureImage extends React.Component {

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.onPreview(this.props.index)}
        >
        <View style={styles.container}>
            <Image source={{uri: this.props.uri}} style={styles.image} />
        </View>
      </TouchableOpacity>
    );
  }
}
