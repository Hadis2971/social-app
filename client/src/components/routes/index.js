import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PrivateRoute from './privateRoute';
import NavbarContainer from '../standardLayout/navbar/navbarContainer';
import RegisterContainer from '../auth/register/registerContainer';
import LoginContainer from '../auth/login/loginContainer';
import Logout from '../auth/logout';
import ProfilePageContainer from '../users/profilePage/profilePageContainer';
import TwitterUserContainer from '../twitter/twitter_user/twitterUserContainer';
import TwitterPostsContainer from '../twitter/twitter_posts/twitterPostsContainer';
import TwitterPostsAndChat from '../twitter';
import ForgotPasswordContainer from '../auth/forgotPassword/forgotPasswordContainer';
import RequestedProfilePageContainer from '../users/requestedProfilePage/requestedProfilePageContainer';

const Routes = (props) => {
  return (
    <Router>
      <NavbarContainer />
      <Switch>
        <Route path='/register' component={RegisterContainer} />
        <Route path='/login' component={LoginContainer} />
        <Route path='/forogtPasswordUserEmal' component={ForgotPasswordContainer} />
        <Route path='/requestedProfile' component={RequestedProfilePageContainer} />
        <Route path='/logout' component={Logout} />
        <PrivateRoute exact path='/profile' component={ProfilePageContainer} />
        <PrivateRoute exact path='/' component={TwitterUserContainer} />
        <PrivateRoute exact path='/tweets' component={TwitterPostsAndChat} />
      </Switch>
    </Router>
  );
};

export default Routes;
