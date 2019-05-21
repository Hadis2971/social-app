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
    if (now >= expirationDate) {
      return false;
    } else {
      return true;
    }
  }

  async updateRefreshToken (refreshToken, userID, next) {
    const expirationDate = moment(new Date()).add(1, 'days').format('YYYY-MM-DD HH:mm:ss');
    try {
      const updateRefreshTokenResult = await refreshToken.update(
        { expirationDate: expirationDate },
        { where: { user: userID } }
      );
      console.log('inside updateRefreshToken result', updateRefreshTokenResult);
      if (updateRefreshTokenResult) return true;
      else return false;
    } catch (error) {
      next(error);
    }
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
      next(error);
    }
  }

  createPayloadForNewToken (payload) {
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
