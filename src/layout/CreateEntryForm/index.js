import React, {Component} from 'react';
import {Animated, Text, ScrollView, StyleSheet, View} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import SubmitButton from '../SubmitButton/index';

import ImagePreview from 'react-native-image-preview';

import ImagePicker from 'react-native-image-picker';

import PickImageButton from '../PickImageButton';

import MiniatureImageWithDelete from '../MiniatureImageWithDelete';

import PickLocationButton from '../PickLocationButton';

import LocationEntryProvider from '../ProvideLocationEntry';

import {uploadImage} from '../../api';

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

export default class CreateEntryForm extends Component {
  constructor(props) {
    super(props);

    this.onFocus = this.onFocus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);

    this.onSubmitBeerAmount = this.onSubmitBeerAmount.bind(this);
    this.onSubmitDescription = this.onSubmitDescription.bind(this);

    this.amountBeerRef = this.updateRef.bind(this, 'amountBeer');
    this.descriptionRef = this.updateRef.bind(this, 'description');

    this.state = {
      opacity: new Animated.Value(0),
      images: [],
      showImage: null,
    };
  }

  _addImage = () => {
    const options = {};
    ImagePicker.showImagePicker(options, response => {
      console.log(response);
      if (response.hasOwnProperty('uri')) {
        this.setState(prevState => ({
          images: [...prevState.images, response],
        }));
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

  componentDidMount() {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 1500,
    }).start();
  }

  onChangeText(text) {
    ['amountBeer', 'description']
      .map(name => ({name, ref: this[name]}))
      .forEach(({name, ref}) => {
        if (ref.isFocused()) {
          this.setState({[name]: text});
        }
      });
  }

  onSubmitBeerAmount() {
    this.description.focus();
  }

  onSubmitDescription() {
    this.description.blur();
  }

  uploadSingleImage = async image => {
    const uploadedImageUrl = await uploadImage(image);
    return uploadedImageUrl;
  };

  getImagesUrls = async () => {
    const imageUrls = [];
    const {images} = this.state;
    for (let i = 0; i < images.length; i++) {
      const url = await this.uploadSingleImage(images[i]);
      imageUrls.push(url);
    }
    return imageUrls;
  };

  async onSubmit() {
    let errors = {};

    ['amountBeer'].forEach(name => {
      let value = this[name].value();

      if (!value) {
        errors[name] = 'Should not be empty';
      }
    });

    await this.setState({errors});

    const errNum = Object.keys(this.state.errors).length;

    if (errNum === 0 && this.state.images.length > 0) {
      let {amountBeer, description, images} = this.state;
      const imageUrls = await this.getImagesUrls();

      const formData = {
        amountBeer,
        description,
        images: imageUrls,
      };
      this.props.onSubmit(formData);
    }
  }

  _saveLocation = location => {
    console.log(location);
    this.setState(prevState => ({
      location,
    }));
  };

  updateRef(name, ref) {
    this[name] = ref;
  }

  _showPreview = index => {
    this.setState({showImage: this.state.images[index]});
  };

  _hidePreview = () => {
    this.setState({showImage: null});
  };

  _deleteImage = deleteIndex => {
    this.setState(prevState => ({
      images: [...prevState.images].filter(
        (image, index) => index !== deleteIndex,
      ),
    }));
  };

  render() {
    let {errors = {}, opacity, ...data} = this.state;

    return (
      <Animated.ScrollView
        style={[styles.scroll, {opacity: this.state.opacity}]}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <TextField
            ref={this.amountBeerRef}
            tintColor="#499467"
            baseColor="#158040"
            value={data.amountBeer}
            autoCapitalize="none"
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            onFocus={this.onFocus}
            onChangeText={this.onChangeText}
            onSubmitEditing={this.onSubmitBeerAmount}
            returnKeyType="next"
            label="Beer amount"
            error={errors.title}
          />

          <TextField
            ref={this.descriptionRef}
            tintColor="#499467"
            baseColor="#158040"
            value={data.description}
            autoCapitalize="none"
            autoCorrect={false}
            multiline={true}
            enablesReturnKeyAutomatically={true}
            clearTextOnFocus={true}
            onFocus={this.onFocus}
            onChangeText={this.onChangeText}
            onSubmitEditing={this.onSubmitDescription}
            returnKeyType="done"
            label="Description"
            error={errors.description}
            maxLength={30}
            characterRestriction={30}
          />
        </View>

        <PickImageButton text="Add image" onPress={this._addImage} />

        {this.state.images.map((image, index) => (
          <MiniatureImageWithDelete
            image={image}
            index={index}
            key={index}
            onPreview={this._showPreview}
            onDelete={this._deleteImage}
          />
        ))}

        {this.state.showImage && (
          <ImagePreview
            visible={!!this.state.showImage}
            source={{uri: this.state.showImage && this.state.showImage.uri}}
            close={this._hidePreview}
          />
        )}

        <PickLocationButton
          text="Pick location"
          onPress={this.props.onProvideLocation}
        />

        <View style={styles.container}>
          <SubmitButton onPress={this.onSubmit} text={this.props.submitTitle} />
        </View>
      </Animated.ScrollView>
    );
  }
}
