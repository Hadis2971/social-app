import passport from 'passport';
import { createAuthToken } from '../../helpers/authToken';
export const loginUser = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.json({ Error: 'Wrong Credentials' });
    }

    req.login(user, { session: false }, async (err) => {
      if (err) {
        next(err);
      }

      const tokens = await createAuthToken({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        userID: user.id,
        userEmail: user.email,
        profileImage: user.profileImage
      }, next);
      if (tokens) {
        return res.json(tokens);
      } else {
        return res.json({ Error: 'Something Went Wrong Please Try Again' });
      }
    });
  })(req, res);
};
