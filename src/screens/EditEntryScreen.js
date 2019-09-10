import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import EditEntryForm from '../layout/EditEntryForm';

const styles = StyleSheet.create({
  moveButton: {
    flex: 1,
  },
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: '#40C575',
  },
});

export default class EditEntryScreen extends React.Component {
  static navigationOptions = {
    title: 'Edit entry',
    headerStyle: {
      backgroundColor: '#499467',
    },
    headerTintColor: '#8EE2B0',
    headerTitleStyle: {
      fontWeight: '400',
    },
  };

  _editEntry = async data => {
    const response = await fetch(
      'https://rn-bootcamp-09-2019.herokuapp.com/api/event/entry',
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          entry: {
            ...data,
          },
          userId: this.props.screenProps.userId,
          id: this.props.navigation.getParam('entry')._id,
        }),
      },
    );
    const result = await response.json();
    console.log(result);
    this.props.navigation.getParam('onSuccess')();
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <EditEntryForm
          entry={this.props.navigation.getParam('entry')}
          onSubmit={this._editEntry}
          submitTitle="Edit Entry"
        />
      </View>
    );
  }
}
