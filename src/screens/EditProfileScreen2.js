import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  Image,
  TextInput,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class EditProfileScreen extends React.Component {
  state = {
    image: null,
    displayName: this.props.navigation.getParam('user').displayName || '',
    imageUrl: this.props.navigation.getParam('user').imageUrl || '',
  };

  openImage = () => {
    const options = {};
    ImagePicker.showImagePicker(options, response => {
      if (response.hasOwnProperty('uri')) {
        this.setState({image: response});
      }
    });
  };

  onNameChange = displayName => {
    this.setState({displayName});
  };

  render() {
    console.log(this.state);
    let img = null;
    const imgState = this.state.image && this.state.image.uri;
    if (imgState === null) {
      img = this.props.navigation.getParam('user').imageUrl;
    } else {
      img = imgState;
    }

    return (
      <View>
        <TextInput
          value={this.state.displayName}
          onChangeText={this.onNameChange}
        />
        <Button title="Add Image" onPress={this.openImage} />
        {img ? (
          <Image style={{width: 300, height: 300}} source={{uri: img}} />
        ) : null}
        <Button onPress={this._saveProfile} title="Save" />
      </View>
    );
  }

  _saveProfile = async () => {
    if (this.state.image !== null) await this.uploadImage();
    console.log('IMAGE URL : ' + this.state.imageUrl);
    fetch('https://rn-bootcamp-09-2019.herokuapp.com/api/user', {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          displayName: this.state.displayName,
          imageUrl: this.state.imageUrl,
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

  uploadImage = async () => {
    const formData = new FormData();
    const {uri, fileName, type} = this.state.image;
    const imgObj = {uri, name: fileName, type};
    formData.append('image', imgObj);
    try {
      const response = await fetch(
        'https://rn-bootcamp-09-2019.herokuapp.com/api/image/upload',
        {
          method: 'POST',
          Accept: 'application/json',
          ContentType: 'multipart/form-data',
          body: formData,
        },
      );
      const result = await response.json();

      if (result.status === 'success') {
        await this.setState({
          imageUrl: result.imageUrl,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
}
