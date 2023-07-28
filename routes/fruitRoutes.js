import express from 'express';

import * as authController from '../controllers/authController';
import * as fruitController from '../controllers/fruitController';

const router = express.Router();
router
  .route('/')
  .get(fruitController.getAllFruits)
  .post(authController.protect, fruitController.createFruit);

router
  .route('/:id')
  .get(fruitController.getFruit)
  .patch(authController.protect, fruitController.updateFruit)
  .delete(authController.protect, fruitController.deleteFruit);

export default router;
