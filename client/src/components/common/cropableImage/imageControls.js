import React from 'react';

const ImageControls = (props) => {
  const { sendBackNewProfileImage, handleClearToDefault } = props;
  return (
    <div style={{ textAlign: 'center', margin: 'auto' }}>
      <div style={{ padding: '2.1%', margin: '1.5% 0' }}>
        <button type='button' className='btn btn-success' onClick={sendBackNewProfileImage}>Save Image</button>
                &nbsp;
        <button type='button' className='btn btn-warning' onClick={handleClearToDefault}>Cancel</button>
      </div>
    </div>
  );
};

export default ImageControls;
