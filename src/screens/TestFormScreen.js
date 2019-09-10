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

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import ImagePreview from 'react-native-image-preview';

import ImagePicker from 'react-native-image-picker';

import MiniatureImageWithDelete from '../MiniatureImageWithDelete';

let styles = {
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

    this.onFocus = this.onFocus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);

    this.displayNameRef = this.updateRef.bind(this, 'displayNameRef');

    this.state = {
      opacity: new Animated.Value(0),
      imageIsVisible: false,
      image: this.props.image,
    };
  }

  componentDidMount() {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 1500,
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

  onFocus() {
    let {errors = {}} = this.state;

    for (let name in errors) {
      let ref = this[name];

      if (ref && ref.isFocused()) {
        delete errors[name];
      }
    }

    this.setState({errors});
  }

  onChangeText(text) {
    ['displayName']
      .map(name => ({name, ref: this[name]}))
      .forEach(({name, ref}) => {
        if (ref.isFocused()) {
          this.setState({[name]: text});
        }
      });
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
    let errors = {};

    ['displayName'].forEach(name => {
      let value = this[name].value();

      if (!value) {
        errors[name] = 'Should not be empty';
      }
    });

    await this.setState({errors});

    const errNum = Object.keys(this.state.errors).length;
    if (errNum === 0) {
      let {errors = {}, secureTextEntry, opacity, ...data} = this.state;
      const formData = {displayName: data.displayName};
      if (data.image && typeof data.image === 'object') {
        const imageUrl = await uploadImage(data.image);
        if (imageUrl) formData.imageUrl = imageUrl;
      }
      this.props.onSubmit(formData);
    }
  }

  updateRef(name, ref) {
    this[name] = ref;
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
            ref={this.displayNameRef}
            tintColor="#499467"
            baseColor="#158040"
            value={data.displayName}
            autoCapitalize="none"
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            onFocus={this.onFocus}
            onChangeText={this.onChangeText}
            title="Optional"
            characterRestriction={25}
            maxLength={25}
            label="Username"
          />

          <PickImageButton text="Add profile image" onPress={this._openImage} />

          {this.getImage() && (
            <MiniatureImageWithDelete
              image={this.state.image}
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
