import * as yup from 'yup';

const registerValidation = yup.object().shape({
  firstName: yup.string()
    .required('The First Name Field is Required!!!'),
  lastName: yup.string()
    .required('The Last Name Field is Required!!!'),
  username: yup.string()
    .required('The Username Field is Required!!!'),
  email: yup.string()
    .required('The Email Filed is Required!!!')
    .email('Please Enter a Valid Email Address!!!'),
  password: yup.string()
    .required('The Password Field is Required')
    .min(5, 'The Pssword Must be at Least 5 Characters Long'),
  password2: yup.string()
    .required('The Confirm Password Field is Required')
});

export default registerValidation;
