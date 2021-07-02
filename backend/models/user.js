/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

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
},
{ versionKey: false });

/** URL VALIDATION RULE */
// eslint-disable-next-line func-names
const validator = function (value) {
  return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(value);
};
userSchema.path('avatar').validate(validator, 'invalid link', 'Invalid link');

module.exports = mongoose.model('User', userSchema);
