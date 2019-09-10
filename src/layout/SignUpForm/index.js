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
    this.onSubmitEmail = this.onSubmitEmail.bind(this);
    this.onSubmitPassword = this.onSubmitPassword.bind(this);
    this.onAccessoryPress = this.onAccessoryPress.bind(this);
    this.onSubmitUsername = this.onSubmitUsername.bind(this);

    this.emailRef = this.updateRef.bind(this, 'email');
    this.passwordRef = this.updateRef.bind(this, 'password');
    this.usernameRef = this.updateRef.bind(this, 'username');

    this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);

    this.state = {
      opacity: new Animated.Value(0),
      imageIsVisible: false,
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

  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  onChangeText(text) {
    ['username', 'email', 'password']
      .map(name => ({name, ref: this[name]}))
      .forEach(({name, ref}) => {
        if (ref.isFocused()) {
          this.setState({[name]: text});
        }
      });
  }

  onAccessoryPress() {
    this.setState(({secureTextEntry}) => ({secureTextEntry: !secureTextEntry}));
  }

  onSubmitUsername() {
    this.email.focus();
  }

  onSubmitEmail() {
    this.password.focus();
  }

  onSubmitPassword() {
    this.password.blur();
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

    ['email', 'password'].forEach(name => {
      let value = this[name].value();

      if (!value) {
        errors[name] = 'Should not be empty';
      } else {
        if ('password' === name && value.length < 6) {
          errors[name] = 'Too short';
        }
        if ('email' === name && !this.validateEmail(value)) {
          errors[name] = `Doesn't match with email pattern`;
        }
      }
    });

    await this.setState({errors});

    const errNum = Object.keys(this.state.errors).length;
    if (errNum === 0) {
      let {errors = {}, secureTextEntry, opacity, ...data} = this.state;
      const formData = {email: data.email, password: data.password};
      if (data.username && data.username !== '')
        formData.displayName = data.username;
      if (data.image) {
        const imageUrl = await uploadImage(data.image);
        if (imageUrl) formData.imageUrl = imageUrl;
      }
      this.props.onSubmit(formData);
    }
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  renderPasswordAccessory() {
    let {secureTextEntry} = this.state;

    let name = secureTextEntry ? 'visibility' : 'visibility-off';

    return (
      <MaterialIcon
        size={24}
        name={name}
        color={TextField.defaultProps.baseColor}
        onPress={this.onAccessoryPress}
        suppressHighlighting
      />
    );
  }

  _showPreview = () => {
    this.setState(prevState => ({
      imageIsVisible: !prevState.imageIsVisible,
    }));
  };

  render() {
    let {errors = {}, secureTextEntry, opacity, ...data} = this.state;
    let {firstname = 'name', lastname = 'mail'} = data;

    let defaultEmail = `${firstname}@${lastname}.com`
      .replace(/\s+/g, '_')
      .toLowerCase();

    return (
      <Animated.ScrollView
        style={[styles.scroll, {opacity: this.state.opacity}]}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <TextField
            ref={this.usernameRef}
            tintColor="#499467"
            baseColor="#158040"
            value={data.username}
            autoCapitalize="none"
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            onFocus={this.onFocus}
            onChangeText={this.onChangeText}
            onSubmitEditing={this.onSubmitUsername}
            returnKeyType="next"
            title="Optional"
            characterRestriction={25}
            maxLength={25}
            label="Username"
          />
          <TextField
            ref={this.emailRef}
            tintColor="#499467"
            baseColor="#158040"
            value={data.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            onFocus={this.onFocus}
            onChangeText={this.onChangeText}
            onSubmitEditing={this.onSubmitEmail}
            returnKeyType="next"
            label="Email Address"
            error={errors.email}
          />

          <TextField
            ref={this.passwordRef}
            tintColor="#499467"
            baseColor="#158040"
            value={data.password}
            secureTextEntry={secureTextEntry}
            autoCapitalize="none"
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            clearTextOnFocus={true}
            onFocus={this.onFocus}
            onChangeText={this.onChangeText}
            onSubmitEditing={this.onSubmitPassword}
            returnKeyType="done"
            label="Password"
            error={errors.password}
            maxLength={30}
            characterRestriction={30}
            renderAccessory={this.renderPasswordAccessory}
          />

          <PickImageButton text="Add profile image" onPress={this._openImage} />

          {this.state.image && (
            <MiniatureImageWithDelete
              image={this.state.image}
              onPreview={this._showPreview}
              onDelete={this._deleteImage}
            />
          )}

          <ImagePreview
            visible={this.state.imageIsVisible}
            source={{uri: this.state.image && this.state.image.uri}}
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
