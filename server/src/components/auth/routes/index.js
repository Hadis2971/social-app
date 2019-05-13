import { validateRegisterInput,
  sanitizeRegisterInput,
  validateLoginInput,
  sanitizeLoginInput } from '../validateSanitize';
import { registerUser } from '../registerUser';
import { loginUser } from '../loginUser';
const router = require('express').Router();

router.post('/register', validateRegisterInput, sanitizeRegisterInput, registerUser);

router.post('/login', validateLoginInput, sanitizeLoginInput, loginUser);

export default router;
