/* eslint-disable linebreak-style */
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (input) => validator.isEmail(input),
      message: 'Enter a valid email',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
  },
},
{ versionKey: false });

/** URL VALIDATION RULE */
// eslint-disable-next-line func-names
const validationRule = function (value) {
  return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(value);
};
userSchema.path('avatar').validate(validationRule, 'invalid link', 'Invalid link');

module.exports = mongoose.model('User', userSchema);
