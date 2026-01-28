import * as yup from "yup";


// validate the user signup data
export const signupValidationSchema = yup.object().shape({
     name:yup.string().min(8,"This name is too short!")
     .required('This field cannot be empty')
     .max(50,'This name is too long'),
     email:yup.string().email('Please enter a valid email')
     .max(100,'This is email is too long')
     .required('This field cannot be empty'),
     password:yup.string().required('This field cannot be empty')
     .min(10,'Password is too short').max(200,'Password is too long')
});

// validate the user login data
export const loginValidationSchema = yup.object().shape({
     email:yup.string().email('Please enter a valid email')
     .max(100,'This is email is too long')
     .required('This field cannot be empty'),
     password:yup.string().required('This field cannot be empty')
     .min(10,'Password is too short').max(200,'Password is too long')
});