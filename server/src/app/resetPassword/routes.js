import resetPasswordServices from './services';
const router = require('express').Router();
router.post('/', resetPasswordServices.forgotPassword);

router.get('/resetPassword/:token', resetPasswordServices.createResetPasswordView);
router.post('/resetPassword', resetPasswordServices.resetPassword);

export default router;
