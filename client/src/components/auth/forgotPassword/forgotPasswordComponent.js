import React, { PureComponent } from 'react';
import { Formik, Form, Field } from 'formik';
import UserMsg from '../../common/userMsg';
import Spinner from '../../standard_UI/spinner';
import { validationSchema } from './validation';
import Button from '../../standard_UI/button';

import './forgotPasswordForm.css';

class ForgotPasswordComponent extends PureComponent {

  submitForgotPasswordForm = (userEmail) => {
    const { forgotPassword } = this.props.actions;
    forgotPassword(userEmail);
  };  

  render () {
    const { forgotPasswordEmailSendStart, 
      forgotPasswordEmailSendSuccess, 
      forgotPasswordEmailSendFail } = this.props;
    return (
      <Formik
        initialValues={{ userEmail: '' }}
        validationSchema={validationSchema}
        onSubmit={this.submitForgotPasswordForm}
        render={(props) => {
          return (
            <Form id='forgot-password-form'>
            {forgotPasswordEmailSendStart && <Spinner />}
            {forgotPasswordEmailSendSuccess && <UserMsg msgType='alert-success' message='Email Successfully Sent Please Check Your Emails' />}
            {forgotPasswordEmailSendFail && <UserMsg msgType='alert-danger' message='Email Send Failed Please Try Again!!!' />}
            <h4 id='forgot-password-form-hdr' className='text-center display-5'>Please Enter Your Email Address</h4>
              <div className='form-group'>
                <Field 
                    className='form-control' 
                    type='text' 
                    name='userEmail' 
                    placeholder='Your Email Address' 
                />
                {props.touched.userEmail && props.errors.userEmail && <p className='lead error mt-1'>{props.errors.userEmail}</p>}
              </div>
              <Button btnType='submit' btnClass='btn btn-primary btn-block' btnText='Submit' />
            </Form>
          );
        }}
      />
    );
  }
}

export default ForgotPasswordComponent;
