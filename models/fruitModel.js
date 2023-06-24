const mangoose = require('mongoose');

const fruitSchema = new mangoose.Schema({
  name: {
    type: String,
    requierd: [true, 'Please provide a fruit name'],
    unique: true,
  },
  image: {
    type: String,
    validate: {
      validator: function (val) {
        return val.includes('data:image/png;base64,');
      },
      message: 'image should be encoded into Base64',
    },
  },
  price: {
    type: mangoose.Decimal128,
  },
  fruitType: {
    type: String,
    enum: ['SUMMER_FRUITS', 'WINTER_FRUITS'],
    default: 'SUMMER_FRUITS',
  },
});

const Fruit = mangoose.model('Fruit', fruitSchema);

module.exports = Fruit;
