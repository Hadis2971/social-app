import RefreshTokens from '../database/models/RefreshTokens';
import moment from 'moment';

class RefreshTokenHelpers {
  async findRefreshToken (userID) {
    const refreshToken = await RefreshTokens.findOne({
      where: { user: userID }
    });
    return refreshToken;
  }

  async checkIfRefreshTokenIsValid (refreshToken) {
    const now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    const expirationDate = moment(new Date(refreshToken.expirationDate)).format('YYYY-MM-DD HH:mm:ss');
    console.log('now', now);
    console.log('expirationDate', expirationDate);
    if (now >= expirationDate) {
      return false;
    } else {
      return true;
    }
  }

  async updateRefreshToken (refreshToken, userID) {
    const expirationDate = moment(new Date()).add(1, 'days').format('YYYY-MM-DD HH:mm:ss');
    const updateRefreshTokenResult = await refreshToken.update(
      { expirationDate: expirationDate },
      { where: { user: userID } }
    );
    if (updateRefreshTokenResult.length > 0) return true;
    else return false;
  }

  async createRefreshToken (userID, refreshToken, next) {
    const expirationDate = moment(new Date()).add(1, 'days').format('YYYY-MM-DD HH:mm:ss');
    try {
      const createRefreshTokenResult = await RefreshTokens.create({
        user: userID,
        refreshToken: refreshToken,
        expirationDate: expirationDate
      });
      if (createRefreshTokenResult) {
        return true;
      }
    } catch (error) {
      console.log('inside refresh token creator error', error);
      next(error);
    }
  }

  createPayloadForNewToken (payload) {
    console.log('create payload for new token', payload);
    const newPayload = {
      userID: payload.userID,
      firstName: payload.firstName,
      lastName: payload.lastName,
      profileImage: payload.profileImage,
      userEmail: payload.userEmail,
      username: payload.username
    };
    return newPayload;
  }
}

export default new RefreshTokenHelpers();
