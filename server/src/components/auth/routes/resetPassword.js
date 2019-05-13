import resetPassword from '../resetPassword';
const router = require('express').Router();

router.post('/', resetPassword.forgotPassword);

router.get('/resetPassword/:token', (req, res, next) => res.render('resetPasswordForm'));
router.post('/resetPassword/:token');

export default router;
