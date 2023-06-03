const mangoose = require('mongoose');

const fruitSchema = new mangoose.Schema({
  name: {
    type: String,
    requierd: [true, 'Please provide a fruit name'],
    unique: true,
  },
  imageName: {
    type: String,
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
