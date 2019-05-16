import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import CropableImage from '../../../common/cropableImage';
import Button from '../../../standardLayout/button';
import Errors from '../../../common/errors';
import UserMsg from '../../../common/userMsg';

import { createUpdateObject, createFormData } from '../../../../helpers';

import './updateUserProfile.css';

class UpdateUserInfo extends Component {

    constructor (props) {
      super(props);
      this.state = {
        newImage: null
      };
    }

    submitUpdateInfoForm = (newInfo) => {
        const { newImage } = this.state;
        const { updateUserInfo } = this.props;
        const file = (newImage) ? newImage : null;
        const updateObject = createUpdateObject(newInfo, file);
        const formData = createFormData(updateObject);
        updateUserInfo(formData);
    }

    getNewProfileImage = (newImage) => {
      this.setState({
        newImage: newImage
      });
    } 

  render () {
    const { src, errors, updateUserInfoSuccess } = this.props;
    const { username, userEmail, firstName, lastName, fetchingSuccess } = this.props;
    const initialValues = {
      username, userEmail, firstName, lastName
    }
    console.log('new Image', this.state.newImage);
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={this.submitUpdateInfoForm}
        render={(props) => {
          return (
            <div id='update-info-box'>
            {(!fetchingSuccess) && <Errors errors='Failed To Load Profile Picture!!!' />}
            <Form className='mt-3' encType='multipart/form-data'>
              <h1 className='text-center' style={{ color: '#3399ff' }}>Update Your Profile Information</h1>
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
              <CropableImage src={src} getNewProfileImage={this.getNewProfileImage}/>
              {errors && <Errors errors={errors} />}
              {updateUserInfoSuccess && <UserMsg msgType='alert-success' message='Profile Update Success' />}
              <Button
                btnType='submit'
                btnClass='btn btn-primary btn-block'
                btnText='Submit' />
            </Form>
            </div>
          );
        }}
      />
    );
  }
}

export default UpdateUserInfo;
