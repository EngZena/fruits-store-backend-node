import mongoose from 'mongoose';

const fruitSchema = new mongoose.Schema({
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
    type: mongoose.Decimal128,
  },
  fruitType: {
    type: String,
    enum: ['SUMMER_FRUITS', 'WINTER_FRUITS'],
    default: 'SUMMER_FRUITS',
  },
  dateCreated: {
    type: Date,
  },
});

fruitSchema.pre('save', async function (next) {
  this.dateCreated = new Date();
  next();
});

const Fruit = mongoose.model('Fruit', fruitSchema);

export default Fruit;
