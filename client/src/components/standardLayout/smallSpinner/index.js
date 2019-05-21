import React from 'react';

import './smallSpinner.css';

const SmallSpinner = (props) => {
  return (
    <div className='lds-small-spinner'><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /></div>
  );
};

export default SmallSpinner;
