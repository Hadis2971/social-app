import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { secretForResetPassword } from '../config';
class AuthHelpers {
  async hashUserPassword (password, next) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (error) {
      next(error);
    }
  }

  async checkUserPassword (password, hash) {
    try {
      const passwordMatch = await bcrypt.compare(password, hash);
      return passwordMatch;
    } catch (error) {
      console.log('inside check password error', error);
    }
  }

  async createTokenForPasswordReset (user) {
    const payload = {
      userID: user.id,
      userEmail: user.email
    };
    const token = await jwt.sign(payload, secretForResetPassword, { expiresIn: 300 });
    return token;
  }
}

export default new AuthHelpers();
