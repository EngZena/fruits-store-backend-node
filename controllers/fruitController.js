import * as Factory from './handlerFactory';
import Fruit from '../models/fruitModel';

export const createFruit = Factory.createOne(Fruit);
export const updateFruit = Factory.updateOne(Fruit);
export const getFruit = Factory.getOne(Fruit);
export const getAllFruits = Factory.getAll(Fruit);
export const deleteFruit = Factory.deleteOne(Fruit);
