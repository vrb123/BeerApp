import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

// tintColor="#499467"
// baseColor="#158040"

const styles = StyleSheet.create({
  row: {
    paddingBottom: 10,
    color: '#499467',
    fontSize: 17,
    fontStyle: 'italic',
  },
  fieldName: {
    color: '#158040',
    fontFamily: 'Lobster-Regular',
    fontStyle: 'normal',
    fontSize: 20,
    paddingBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 15,
  },
});

export default ({user}) => (
  <View>
    <Text style={styles.row}>
      <Text style={styles.fieldName}>Email: </Text> {user.email}
    </Text>
    <Text style={styles.row}>
      <Text style={styles.fieldName}>Username: </Text>
      {user.displayName === null ? 'Not set' : user.displayName}
    </Text>
    {user.imageUrl ? (
      <Image source={{uri: user.imageUrl}} style={styles.image} />
    ) : (
      <Text style={styles.fieldName}>Image not set</Text>
    )}
  </View>
);
