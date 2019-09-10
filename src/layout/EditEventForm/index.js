import React, {Component} from 'react';
import {Animated, Text, ScrollView, View} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import SubmitButton from '../SubmitButton/index';

import DateTimePicker from '../../components/DateTimePicker';

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

export default class EditEventForm extends Component {
  constructor(props) {
    super(props);

    this.onFocus = this.onFocus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);

    this.onSubmitTitle = this.onSubmitTitle.bind(this);
    this.onSubmitDescription = this.onSubmitDescription.bind(this);

    this.titleRef = this.updateRef.bind(this, 'title');
    this.descriptionRef = this.updateRef.bind(this, 'description');

    const {timeStart, timeEnd, title, description} = this.props.event;
    console.log('Event props : ');
    console.log(this.props.event.description);

    this.state = {
      opacity: new Animated.Value(0),
      timeStart: new Date(timeStart),
      timeEnd: new Date(timeEnd),
      title,
      description,
    };
  }

  _compareDates = () =>
    this.state.timeStart &&
    this.state.timeEnd &&
    this.state.timeStart < this.state.timeEnd;

  componentDidMount() {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 1500,
    }).start();
  }

  setTimeStart = date => this.setState({timeStart: date});

  setTimeEnd = date => this.setState({timeEnd: date});

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
    ['title', 'description']
      .map(name => ({name, ref: this[name]}))
      .forEach(({name, ref}) => {
        if (ref.isFocused()) {
          this.setState({[name]: text});
        }
      });
  }

  onSubmitTitle() {
    this.description.focus();
  }

  onSubmitDescription() {
    this.description.blur();
  }

  async onSubmit() {
    let errors = {};

    ['title', 'description'].forEach(name => {
      let value = this[name].value();

      if (!value) {
        errors[name] = 'Should not be empty';
      }
    });

    await this.setState({errors});

    const errNum = Object.keys(this.state.errors).length;

    if (errNum === 0 && this._compareDates()) {
      console.log(this.state.timeStart.toString());
      console.log(this.state.timeEnd.toString());
      console.log(this.state.timeStart < this.state.timeEnd);
      let {
        errors = {},
        opacity,
        timeStart,
        timeEnd,
        title,
        description,
      } = this.state;
      const formData = {
        title,
        description,
        timeStart: timeStart.toISOString(),
        timeEnd: timeEnd.toISOString(),
      };
      this.props.onSubmit(formData);
    }
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  render() {
    let {errors = {}, opacity, ...data} = this.state;

    return (
      <Animated.ScrollView
        style={[styles.scroll, {opacity: this.state.opacity}]}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <TextField
            ref={this.titleRef}
            tintColor="#499467"
            baseColor="#158040"
            value={data.title}
            autoCapitalize="none"
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            onFocus={this.onFocus}
            onChangeText={this.onChangeText}
            onSubmitEditing={this.onSubmitTitle}
            returnKeyType="next"
            label="Title"
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

          <DateTimePicker onChange={this.setTimeStart} title="Set time start" />
          <DateTimePicker onChange={this.setTimeEnd} title="Set time end" />
        </View>

        <View style={styles.container}>
          <SubmitButton onPress={this.onSubmit} text={this.props.submitTitle} />
        </View>
      </Animated.ScrollView>
    );
  }
}
