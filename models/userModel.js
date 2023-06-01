const mangoose = require('mongoose');
const validator = require('validator');

const userSchema = new mangoose.Schema({
  name: {
    type: String,
    requierd: [true, 'Please provide your name'],
  },
  email: {
    type: String,
    requierd: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provice a valid email'],
  },
  role: {
    type: String,
    enum: ['admin', 'customer'],
    default: 'customer',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: 'Password and passwordConfirm are not same',
    },
  },
  passwordChangedAt: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre('/^find/', function (next) {
  this.find({ active: { $ne: false } });
  next();
});

const User = mangoose.model('User', userSchema);

module.exports = User;
