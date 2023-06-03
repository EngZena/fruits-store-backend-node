const Factory = require('./handlerFactory');
const Fruit = require('../models/fruitModel');

exports.createFruit = Factory.createOne(Fruit);
exports.updateFruit = Factory.updateOne(Fruit);
exports.getFruit = Factory.getOne(Fruit);
exports.getAllFruits = Factory.getAll(Fruit);
exports.deleteFruit = Factory.deleteOne(Fruit);
