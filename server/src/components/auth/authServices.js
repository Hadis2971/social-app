import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createAuthToken } from './authToken';
import { secretForResetPassword } from '../../config';
import Users from '../../database/models/Users';
const LocalStrategy = require('passport-local').Strategy;
class AuthServices {
  constructor () {
    this.createNewUser = this.createNewUser.bind(this);
  }
  async _hashUserPassword (password, next) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (error) {
      next(error);
    }
  }

  async _checkUserPassword (password, hash) {
    try {
      const passwordMatch = await bcrypt.compare(password, hash);
      return passwordMatch;
    } catch (error) {
      console.log('inside check password error', error);
    }
  }

  async createNewUser ({ ...rest }) {
    const newUser = {
      firstName: rest.firstName,
      lastName: rest.lastName,
      username: rest.username,
      email: rest.email,
      password: rest.password
    };
    newUser.password = await this._hashUserPassword(newUser.password);
    const user = await Users.create(newUser);
    return user;
  }

  loginUserConfig (passport) {
    passport.use(new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        const user = await Users.findOne({ where: { email: email } });
        if (!user) return done(null, false);
        const passwordMatch = await this._checkUserPassword(password, user.password);
        if (!passwordMatch) return done(null, false);
        return done(null, user);
      }
    ));
  }

  async createAuthTokens (user) {
    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      userID: user.id,
      userEmail: user.email,
      profileImage: user.profileImage
    };
    const tokens = await createAuthToken(payload);
    return tokens;
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

export default new AuthServices();
