import React from 'react';

const FileInputField = (props) => {
  const { fileRef, changeHandler, id, fileInputBoxClassname, labelText } = props;
  return (
    <div className={fileInputBoxClassname}>
      <input
        type='file'
        ref={fileRef || null}
        onChange={changeHandler}
        className='custom-file-input'
        id={id}
      />
      <label className='custom-file-label' htmlFor='cropableImage'>{labelText}</label>
      <div className='invalid-feedback'>Invalid File Selected Please Try Different One</div>
    </div>
  );
};

export default FileInputField;
