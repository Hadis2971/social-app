import experss from 'express';
import exphbs from 'express-handlebars';
import passport from 'passport';
import path from 'path';
import passportConfig from './config/passportConfig';
import dbConnection from './database';
import { port } from './config';

import authRouter from './components/auth/routes';
import resetPasswordRouter from './components/auth/routes/resetPassword';
import usersRouter from './components/users/routes/usersRoutes';
import usersProfileRouter from './components/users/routes/profileRoutes';
import usersFriendsRouter from './components/users/routes/friendsRoutes';
import twitterPostsRouter from './components/twitter/posts/routes';
import postsCommentsRouter from './components/twitter/posts/routes/commets';
import likesPostsRouter from './components/twitter/posts/routes/likes';
import dislikesPostsRouter from './components/twitter/posts/routes/dislikes';
import clientErrorHandler from './components/error_handling/clientError';
import genericErrorHandler from './components/error_handling/serverError';

const app = experss();

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization, refreshToken');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

app.use(experss.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(experss.json());
app.use(experss.static(path.resolve(__dirname, 'public')));

const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// Connect to database
dbConnection.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

// Setup passport config
app.use(passport.initialize());
(passportConfig(passport));

app.use('/auth/forgotPassword', resetPasswordRouter);
app.use('/auth', authRouter);
app.use('/users/profile', usersProfileRouter);
app.use('/users/friends', usersFriendsRouter);
app.use('/users', usersRouter);
app.use('/twitter/posts/likes', likesPostsRouter);
app.use('/twitter/posts/dislikes', dislikesPostsRouter);
app.use('/twitter/posts/comments', postsCommentsRouter);
app.use('/twitter/posts', twitterPostsRouter);
app.use(clientErrorHandler);
app.use(genericErrorHandler);

app.listen(port, console.log(`Server Started On Port ${port}`));
