import React, { PureComponent } from "react";
import { Formik, Form, Field } from "formik";
import Button from "../../standardLayout/button";
import Spinner from "../../standardLayout/spinner";
import Errors from "../../common/errors";

import { turnObjectIntoArray } from "../../../helpers";
import initialValues from "./formInitialValues";
import registerValidation from "./validation";

import "./register.css";

class RegisterComponent extends PureComponent {

    submitRegisterForm = async (user) => {
        const { registerUser, loginUser } = this.props.actions;
        const { history } = this.props;
        const registerUserResult = await registerUser(user);
        console.log(registerUserResult);
        if (registerUserResult && !registerUserResult.data.Error) {
            await loginUser({email: user.email, password: user.password});
            history.push('/');
        }
    };

    render () {
        const { registerStart, errors } = this.props;
        
        return(
            <Formik 
                initialValues={initialValues}
                validationSchema={registerValidation}
                onSubmit={this.submitRegisterForm}
                render={(props) => {
                    return(
                        <Form id="register-form">
                        {registerStart && <Spinner />}
                        {errors && <Errors errors={turnObjectIntoArray(errors)} />}
                        <h1 className="text-center display-3 header">Sign Up</h1>
                        <div className="form-group">
                        <div className='form-group'>
                            <Field 
                                className="form-control" 
                                type="text" 
                                name="firstName" 
                                placeholder="Your First Name..."/>
                            {props.touched.firstName && 
                                props.errors.firstName && 
                                <p className="lead error-msg mt-1">{props.errors.firstName}</p>}
                        </div>
                        <div className='form-group'>
                            <Field 
                                className="form-control" 
                                type="text" 
                                name="lastName" 
                                placeholder="Your Last Name..."/>
                            {props.touched.lastName && 
                                props.errors.lastName && 
                                <p className="lead error-msg mt-1">{props.errors.lastName}</p>}
                        </div>
                        <div className='form-group'>
                            <Field 
                                className="form-control" 
                                type="text" 
                                name="username" 
                                placeholder="Your Username..."/>
                            {props.touched.username && 
                                props.errors.username && 
                                <p className="lead error-msg mt-1">{props.errors.username}</p>}
                        </div>
                        </div>
                        <div className="form-group">
                            <Field 
                                className="form-control" 
                                type="email" 
                                name="email" 
                                placeholder="Your Email..."/>
                            {props.touched.email && 
                                props.errors.email && 
                                <p className="lead error-msg mt-1">{props.errors.email}</p>}
                        </div>
                        <div className="form-group">
                            <Field 
                                className="form-control" 
                                type="password" 
                                name="password" 
                                placeholder="Your Password..."/>
                            {props.touched.password && 
                                props.errors.password && 
                                <p className="lead error-msg mt-1">{props.errors.password}</p>}
                        </div>
                        <div className="form-group">
                            <Field 
                                className="form-control" 
                                type="password" 
                                name="password2" 
                                placeholder="Confirm Password..."/>
                            {props.touched.password2 && 
                                props.errors.password2 && 
                                <p className="lead error-msg mt-1">{props.errors.password2}</p>}
                        </div>
                        <Button 
                            btnType="submit" 
                            btnClass="btn btn-block btn-primary"
                            btnText="Register"
                        />
                    </Form>
                    );
                }}
            />
        );
    }
}

export default RegisterComponent;