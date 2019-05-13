import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  userEmail: yup.string()
    .required('The Email Field is Required!!!')
    .email('Please Enter a Valid Email Address!!!')
});
