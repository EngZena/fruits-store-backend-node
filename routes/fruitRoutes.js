import express from 'express';

import * as authController from '../controllers/authController';
import * as fruitController from '../controllers/fruitController';

const router = express.Router();
router.route('/').get(fruitController.getAllFruits);

router.route('/:id').get(fruitController.getFruit);

router.use(authController.protect, authController.restrictTo('admin'));

router.route('/').post(fruitController.createFruit);
router
  .route('/:id')
  .patch(fruitController.updateFruit)
  .delete(fruitController.deleteFruit);

export default router;
