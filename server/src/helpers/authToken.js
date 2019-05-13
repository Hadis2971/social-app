import jwt from 'jsonwebtoken';
import randToken from 'rand-token';
import { secretOrKey, secretOrKeyRefreshToken } from '../config';
let refreshTokens = {};

export const createAuthToken = async (user) => {
  const token = await jwt.sign(user, secretOrKey, { expiresIn: 3600 });
  const refreshToken = await jwt.sign(user, secretOrKeyRefreshToken, { expiresIn: 8660 });
  const response = {
    token,
    refreshToken
  };
  refreshTokens[refreshToken] = user.username;
  console.log('inside crate auth token refershtoken', refreshTokens);
  return response;
};

export const verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, secretOrKey, async (err, decoded) => {
      if (err) {
        if (req.headers['refreshtoken'] && req.headers['refreshtoken'] in refreshTokens) {
          const user = await jwt.decode(token);
          const newSecretOrKey = randToken.generate(16);
          const newToken = await jwt.sign(user, newSecretOrKey);
          res.json({ newToken });
        }
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};
