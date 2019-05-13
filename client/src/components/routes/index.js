import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PrivateRoute from './privateRoute';
import NavbarContainer from '../standard_UI/navbar/navbarContainer';
import RegisterContainer from '../auth/register/registerContainer';
import LoginContainer from '../auth/login/loginContainer';
import Logout from '../auth/logout';
import ProfilePageContainer from '../users/profile_page/profilePageContainer';
import TwitterUserContainer from '../twitter/twitter_user/twitterUserContainer';
import TwitterPostsContainer from '../twitter/twitter_posts/twitterPostsContainer';
import ForgotPasswordContainer from '../auth/forgotPassword/forgotPasswordContainer';

const Routes = (props) => {
  return (
    <Router>
      <NavbarContainer />
      <Switch>
        <Route path='/register' component={RegisterContainer} />
        <Route path='/login' component={LoginContainer} />
        <Route path='/logout' component={Logout} />
        <Route path='/forogtPasswordUserEmal' component={ForgotPasswordContainer} />
        <PrivateRoute exact path='/profile' component={ProfilePageContainer} />
        <PrivateRoute exact path='/' component={TwitterUserContainer} />
        <PrivateRoute exact path='/tweets' component={TwitterPostsContainer} />
      </Switch>
    </Router>
  );
};

export default Routes;
