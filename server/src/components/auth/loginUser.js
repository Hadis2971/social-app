import passport from 'passport';
import authServices from './authServices';
export const loginUser = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.json({ Error: 'Wrong Credentials' });
    }

    req.login(user, { session: false }, async (err) => {
      if (err) {
        next(err);
      }

      try {
        const tokens = await authServices.createAuthTokens(user);
        if (tokens) {
          return res.json(tokens);
        } else {
          return res.json({ Error: 'Something Went Wrong Please Try Again' });
        }
      } catch (error) {
        next(error);
      }
    });
  })(req, res);
};
