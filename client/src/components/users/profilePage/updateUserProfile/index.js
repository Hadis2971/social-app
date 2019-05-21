import React, { PureComponent } from 'react';
import { Formik, Form, Field } from 'formik';
import CropableImage from '../../../common/cropableImage';
import Button from '../../../standardLayout/button';
import Errors from '../../../common/errors';
import UserMsg from '../../../common/userMsg';
import usersHelpers from '../../../../helpers/usersHelpers';
import { createFormData } from '../../../../helpers';

import './updateUserProfile.css';

class UpdateUserInfo extends PureComponent {

    constructor (props) {
      super(props);
      this.state = {
        newImage: null,
        imageUpdatedSuccess: false,
        imageUpdatedFail: false
      };
    }

      submitUpdateInfoForm = async (newInfo) => {
        const { newImage } = this.state;
        const { updateUserInfo } = this.props;
        const file = (newImage) ? newImage : null;
        const updateObject = usersHelpers.createUpdateUserObject(newInfo, file);
        const formData = createFormData(updateObject);
        await updateUserInfo(formData);
        
    }

    getNewProfileImage = (newImage) => {
      if (newImage) {
        this.setState({
          newImage: newImage,
          imageUpdatedSuccess: true,
          imageUpdatedFail: false
        });
      } else {
        this.setState({
          newImage: newImage,
          imageUpdatedSuccess: false,
          imageUpdatedFail: true
        });
      }
      
    } 

  render () {
    const { imageUpdatedSuccess, imageUpdatedFail } = this.state;
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
              {imageUpdatedSuccess && <UserMsg msgType='alert-success' message='Succeffully Addedd New Image' />}
              {(errors && <Errors errors={errors} />) || (imageUpdatedFail && <Errors errors='Add New Image Failed Please Tyr Again!!!' />)}
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
