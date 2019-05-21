import experss from 'express';
import exphbs from 'express-handlebars';
import passport from 'passport';
import path from 'path';
import dbConnection from './database';
import { port } from './config';
import authServices from './app/auth/authServices';

import authRouter from './app/auth/routes';
import resetPasswordRouter from './app/resetPassword/routes';
import usersRouter from './app/users/routes/users';
import usersProfileRouter from './app/users/routes/profile';
import usersFriendsRouter from './app/users/routes/friends';
import twitterPostsRouter from './app/twitter/posts/routes';
import postsCommentsRouter from './app/twitter/posts/routes/commets';
import likesPostsRouter from './app/twitter/posts/routes/likes';
import dislikesPostsRouter from './app/twitter/posts/routes/dislikes';
import clientErrorHandler from './app/error_handling/clientError';
import genericErrorHandler from './app/error_handling/serverError';

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
authServices.loginUserConfig(passport);

app.use('/auth', authRouter);
app.use('/forgotPassword', resetPasswordRouter);
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
