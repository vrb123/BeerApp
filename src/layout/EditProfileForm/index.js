import React, {Component} from 'react';
import {
  AppRegistry,
  Animated,
  Text,
  ScrollView,
  View,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import SubmitButton from '../SubmitButton/index';
import PickImageButton from '../PickImageButton';

import {uploadImage} from '../../api';

import ImagePreview from 'react-native-image-preview';

import ImagePicker from 'react-native-image-picker';

import MiniatureImageWithDelete from '../MiniatureImageWithDelete';

const styles = {
  scroll: {
    backgroundColor: '#8EE2B0',
  },

  container: {
    margin: 8,
    marginTop: 24,
  },

  contentContainer: {
    padding: 8,
  },
};

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.state = {
      opacity: new Animated.Value(0),
      imageIsVisible: false,
      image: this.props.image,
      displayName: this.props.displayName,
    };
  }

  componentDidMount() {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 2000,
    }).start();
  }

  _openImage = () => {
    const options = {};
    ImagePicker.showImagePicker(options, response => {
      if (response.hasOwnProperty('uri')) {
        this.setState({image: response});
      }
    });
  };

  onChangeText(displayName) {
    this.setState({displayName: displayName});
  }

  _deleteImage = () => {
    Alert.alert(
      'Delete prompt',
      'Are you sure you want to delete image?',
      [
        {
          text: 'Delete',
          onPress: () => {
            this.setState({image: null});
          },
        },
        {
          text: 'Cancel',
          onPress: () => {},
        },
      ],
      {cancelable: false},
    );
  };

  async onSubmit() {
    let {errors = {}, secureTextEntry, opacity, ...data} = this.state;
    const formData = {displayName: data.displayName};
    if (!data.image) formData.imageUrl = '';
    else if (data.image && typeof data.image === 'object') {
      const imageUrl = await uploadImage(data.image);
      if (imageUrl) formData.imageUrl = imageUrl;
    }
    this.props.onSubmit(formData);
  }

  _showPreview = () => {
    this.setState(prevState => ({
      imageIsVisible: !prevState.imageIsVisible,
    }));
  };

  getImage = () => {
    if (typeof this.state.image === 'object') return this.state.image;
    return {uri: this.state.image};
  };

  render() {
    let {errors = {}, secureTextEntry, opacity, ...data} = this.state;

    return (
      <Animated.ScrollView
        style={[styles.scroll, {opacity: this.state.opacity}]}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <TextField
            tintColor="#499467"
            baseColor="#158040"
            value={data.displayName}
            autoCapitalize="none"
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            onChangeText={this.onChangeText}
            title="Optional"
            characterRestriction={25}
            maxLength={25}
            label="Username"
          />

          <PickImageButton text="Add profile image" onPress={this._openImage} />

          {this.getImage() && (
            <MiniatureImageWithDelete
              image={this.getImage()}
              onPreview={this._showPreview}
              onDelete={this._deleteImage}
            />
          )}

          <ImagePreview
            visible={this.state.imageIsVisible}
            source={{uri: this.getImage() && this.getImage().uri}}
            close={this._showPreview}
          />
        </View>

        <View style={styles.container}>
          <SubmitButton onPress={this.onSubmit} text={this.props.submitTitle} />
        </View>
      </Animated.ScrollView>
    );
  }
}
