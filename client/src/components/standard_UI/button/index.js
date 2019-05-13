import React from 'react';

const Button = (props) => {
  return (
    <button type={props.btnType} className={props.btnClass}>{props.btnText}</button>
  );
};

export default Button;
