import express from 'express';

import * as authController from '../controllers/authController';

const router = express.Router();
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/updateMyPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

export default router;
