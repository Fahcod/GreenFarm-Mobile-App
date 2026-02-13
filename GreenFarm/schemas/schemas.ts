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

// validate the edit product data
export const editProductVlidationSchema = yup.object().shape({
     new_title:yup.string().required("The title is required"),
     new_category:yup.string().required("The category is required"),
     new_price:yup.string().required("The price is required"),
     new_description:yup.string().required("The description is required")
});