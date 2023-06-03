const express = require('express');
const fruitController = require('../controllers/fruitController');
const authController = require('../controllers/authController');

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

module.exports = router;
