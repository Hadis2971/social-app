import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import Picture from '../../../standard_UI/picture';
import Button from '../../../standard_UI/button';
import Errors from '../../../common/errors';
import UserMsg from '../../../common/userMsg';

import { createUpdateObject, createFormData } from '../../../../helpers';

class UpdateUserInfo extends Component {

    constructor (props) {
      super(props);
      this.fileInput = React.createRef();
    }

    submitUpdateInfoForm = (newInfo) => {
        const { updateUserInfo } = this.props;
        const updateObject = createUpdateObject(newInfo, this.fileInput.current.files[0]);
        const formData = createFormData(updateObject);
        updateUserInfo(formData);
    }

  render () {
    const { src, errors, updateUserInfoSuccess } = this.props;
    const { username, userEmail, firstName, lastName, fetchingSuccess } = this.props;
    const initialValues = {
      username, userEmail, firstName, lastName
    }
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={this.submitUpdateInfoForm}
        render={(props) => {
          return (
            <Picture src={src}>
            {(!fetchingSuccess) && <Errors errors='Failed To Load Profile Picture!!!' />}
            <Form className='mt-3' encType='multipart/form-data'>
              <h1 className='text-center display-3' style={{ color: '#3399ff' }}>Update Your Profile Information</h1>
              <div className='form-group'>
                <Field
                  type='text'
                  name='firstName'
                  className='form-control'
                  />
              </div>
              <div className='form-group'>
                <Field
                  type='text'
                  name='lastName'
                  className='form-control'
                  />
              </div>
              <div className='form-group'>
                <Field
                  type='text'
                  name='username'
                  className='form-control'
                  />
              </div>
              <div className='form-group'>
                <Field
                  type='email'
                  name='userEmail'
                  className='form-control'
                  />
              </div>
              <div className='custom-file mb-3'>
                <input ref={this.fileInput} type='file' name='userProfilePicture' className='custom-file-input' id='userProfilePicture' />
                <label className='custom-file-label' htmlFor='userProfilePicture'>Choose file...</label>
                <div className='invalid-feedback'>Example invalid custom file feedback</div>
              </div>
              {errors && <Errors errors={errors} />}
              {updateUserInfoSuccess && <UserMsg msgType='alert-success' message='Profile Update Success' />}
              <Button
                btnType='submit'
                btnClass='btn btn-primary btn-block'
                btnText='Submit' />
            </Form>
            </Picture>
          );
        }}
      />
    );
  }
}

export default UpdateUserInfo;
