import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './navbar.css';

class NavbarComponent extends Component {
  render () {
    const { isAuthenticated } = this.props;

    return (
      <nav className='navbar navbar-expand-lg' style={{ backgroundColor: '#3399ff' }}>
        {isAuthenticated && <Link className='navbar-brand' style={{ color: '#FFF' }} to='/'>Twitter Clone 2.0</Link>}
        <ul className='navbar-nav mr-auto'>
          {isAuthenticated && <li className='nav-item'>
            <Link className='nav-link link-style' to='/'>Home</Link>
          </li>}
          {isAuthenticated && <li className='nav-item'>
            <Link className='nav-link link-style' to='/tweets'>Happenings</Link>
          </li>}
          {!isAuthenticated && <li className='nav-item'>
            <Link className='nav-link link-style' to='/register'>Register</Link>
          </li>}
          {!isAuthenticated && <li className='nav-item'>
            <Link className='nav-link link-style' to='/login'>Login</Link>
          </li>}
        </ul>
        <ul className='navbar-nav ml-auto'>
          {isAuthenticated && <li className='nav-item'>
            <Link className='nav-link link-style' to='/profile'>Your Profile</Link>
          </li>}
          {isAuthenticated && <li className='nav-item'>
            <Link className='nav-link link-style' to='/logout'>Logout</Link>
          </li>}
        </ul>
      </nav>
    );
  }
}

export default NavbarComponent;
