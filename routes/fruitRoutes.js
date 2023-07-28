import express from 'express';

import * as authController from '../controllers/authController';
import * as fruitController from '../controllers/fruitController';

const router = express.Router();
router.route('/').get(fruitController.getAllFruits);

router.route('/:id').get(fruitController.getFruit);

router.use(authController.restrictTo('admin'));

router.route('/').post(authController.protect, fruitController.createFruit);
router
  .route('/:id')
  .patch(authController.protect, fruitController.updateFruit)
  .delete(authController.protect, fruitController.deleteFruit);

export default router;
