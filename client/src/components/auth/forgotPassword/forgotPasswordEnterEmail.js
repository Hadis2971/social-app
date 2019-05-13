import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordEnterEmail = (props) => {
  return (
    <div className='text-center mt-3'>
      <Link to={'/forogtPasswordUserEmal'}>
          Forgot Your Password
      </Link>
    </div>
  );
};

export default ForgotPasswordEnterEmail;
