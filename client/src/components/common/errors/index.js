import React from 'react';
import UserMsg from '../userMsg';

const Errors = (props) => {
  if (typeof props.errors === 'string') {
    return <UserMsg msgType='alert-danger' message={props.errors} />;
  }
  return (
    props.errors.map(error =>
      <UserMsg key={error} msgType='alert-danger' message={error} />)
  );
};

export default Errors;
