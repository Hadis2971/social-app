import resetPassword from './resetPassword';
import { validateRegisterInput,
  sanitizeRegisterInput,
  validateLoginInput,
  sanitizeLoginInput } from './validateSanitize';
import { registerUser } from './registerUser';
import { loginUser } from './loginUser';
const router = require('express').Router();

router.post('/register', validateRegisterInput, sanitizeRegisterInput, registerUser);

router.post('/login', validateLoginInput, sanitizeLoginInput, loginUser);

router.post('/forgotPassword', resetPassword.forgotPassword);

router.get('/resetPassword/:token', (req, res, next) => res.render('resetPasswordForm'));
router.post('/resetPassword/:token');

export default router;
