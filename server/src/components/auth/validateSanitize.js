import registerSanitize from '../../inputCheck/sanitize/register';
import registerValidation from '../../inputCheck/validate/register';

import loginValidation from '../../inputCheck/validate/login';
import loginSanitize from '../../inputCheck/sanitize/login';

export const validateRegisterInput = (req, res, next) => {
  const { errors, isValid } = registerValidation(req.body);
  if (!isValid) {
    res.json({ Error: errors });
  } else next();
};

export const sanitizeRegisterInput = (req, res, next) => {
  registerSanitize(req.body);
  next();
};

export const validateLoginInput = (req, res, next) => {
  const { errors, isValid } = loginValidation(req.body);
  if (!isValid) {
    res.json({ Error: errors });
  } else next();
};

export const sanitizeLoginInput = (req, res, next) => {
  loginSanitize(req.body);
  next();
};
