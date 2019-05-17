import Users from '../database/models/Users';
import authHelpers from '../helpers/authHelpers';

const LocalStrategy = require('passport-local').Strategy;

const passportConfig = passport => {
  passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      const user = await Users.findOne({ where: { email: email } });
      if (!user) return done(null, false);
      const passwordMatch = await authHelpers.checkUserPassword(password, user.password);
      if (!passwordMatch) return done(null, false);
      return done(null, user);
    }
  ));
};

export default passportConfig;
