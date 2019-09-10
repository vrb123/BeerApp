import * as ValidationTypes from './validationTypes';

export default class Validation {
  constructor(type, minLength = 0, maxLength = Infinity) {
    this.type = type;
    this.minLength = minLength;
    this.maxLength = maxLength;
  }

  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  validatePhoneNumber = phoneNumber => {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(String(phoneNumber).toLowerCase());
  };

  getLog = (text = '') => {
    const {type, minLength, maxLength} = this;
    const currentTextLength = text.length;
    if (!(currentTextLength > minLength && currentTextLength < maxLength)) {
      return `Length must lie between ${minLength} and ${maxLength} characters...`;
    }
    return this.getTypeLog(text, type);
  };

  getTypeLog = text => {
    switch (this.type) {
      case ValidationTypes.EMAIL:
        if (!this.validateEmail(text)) {
          return 'Text should be email-like';
        }
        break;
      case ValidationTypes.PHONE:
        if (!this.validatePhoneNumber(text)) {
          return 'Text should be phone number like';
        }
        break;
      default:
        break;
    }
    return '';
  };
}
