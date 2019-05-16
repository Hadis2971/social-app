import * as yup from 'yup';

const validationSchema = yup.object().shape({
  username: yup.string().required('The Username Field is Required!!!'),
  email: yup.string()
    .required('The Email Field is Required!!!')
    .email('Please Enter a Valid Email Address!!!')
});

export default validationSchema;
