import { connect } from 'react-redux';
import NavbarComponent from './navbarComponent';

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.login.isAuthenticated
  };
};

const NavbarContainer = connect(mapStateToProps, null)(NavbarComponent);

export default NavbarContainer;
