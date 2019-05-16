import React from 'react';

import './spinner.css';

const Spinner = (props) => {
  return (
    <div id='spinner-box'>
      <div className='lds-spinner'><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /></div>

    </div>
  );
};

export default Spinner;
