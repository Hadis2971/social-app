import jwt from 'jsonwebtoken';
import refreshTokenHelpers from '../../helpers/refrehTokenHelpers';
import { secretOrKey, secretOrKeyRefreshToken } from '../../config';

export const createAuthToken = async (user, next) => {
  const token = await jwt.sign(user, secretOrKey, { expiresIn: 3600 });
  const refreshToken = await refreshTokenHelpers.findRefreshToken(user.userID);
  if (refreshToken) {
    const refreshTokenIsValid = await refreshTokenHelpers.checkIfRefreshTokenIsValid(refreshToken);
    if (refreshTokenIsValid) {
      return {
        token,
        refreshToken: refreshToken.refreshToken
      };
    } else {
      const updateRefreshTokenResult = await refreshTokenHelpers.updateRefreshToken(refreshToken, user.userID, next);
      const newRefreshToken = await refreshTokenHelpers.findRefreshToken(user.userID);
      if (updateRefreshTokenResult) {
        return {
          token,
          refreshToken: newRefreshToken
        };
      } else return false;
    }
  } else {
    const brandNewRefreshToken = await jwt.sign({}, secretOrKeyRefreshToken);
    const createRefreshTokenResult = await refreshTokenHelpers.createRefreshToken(user.userID, brandNewRefreshToken, next);
    if (createRefreshTokenResult) {
      return {
        token,
        refreshToken: brandNewRefreshToken
      };
    } else return false;
  }
};

export const verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
  }

  if (token) {
    jwt.verify(token, secretOrKey, async (err, decoded) => {
      if (err) {
        if (req.headers['refreshtoken']) {
          jwt.verify(token, req.headers['refreshtoken'], async (err, decoded) => {
            if (err) {
              const payload = await jwt.decode(token);
              const newPayload = refreshTokenHelpers.createPayloadForNewToken(payload);
              const refreshToken = await refreshTokenHelpers.findRefreshToken(payload.userID);
              if (refreshToken && (refreshToken.refreshToken === req.headers['refreshtoken'])) {
                const newToken = await jwt.sign(newPayload, req.headers['refreshtoken'], { expiresIn: 3600 });
                return res.json({
                  newToken
                });
              }
            } else {
              req.decoded = decoded;
              next();
            }
          });
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
