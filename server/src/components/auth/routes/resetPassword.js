import resetPassword from '../resetPassword';
const router = require('express').Router();

router.post('/', resetPassword.forgotPassword);

router.get('/resetPassword/:token', resetPassword.createResetPasswordView);
router.post('/resetPassword/', resetPassword.resetPassword);

export default router;
