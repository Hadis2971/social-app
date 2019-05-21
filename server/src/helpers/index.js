import isEmpty from 'is-empty';
import bcrypt from 'bcryptjs';

export const handleEmptyInput = (input) => {
  for (let key in input) {
    if (isEmpty(input[key])) input[key] = '';
  }
};

export const createHash = async (value, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(value, salt);
    return hash;
  } catch (error) {
    next(error);
  }
};
