import {check} from "express-validator";


// validate the user data on signup
export const validateSignupData = [
    check('name').trim().notEmpty().withMessage("The username is required")
    .isLength({min:5}).withMessage("The user name is too short!")
    .isLength({max:40}).withMessage("The user name is too long"),
    check('role').trim().notEmpty().withMessage("The user role is required"),
    check('password').trim().notEmpty().withMessage("The user passwordis required")
    .isLength({min:10}).withMessage("The user pwassword is too short!"),
    check('email').trim().isEmail().withMessage("Please enter a valid email")
    .notEmpty().withMessage("The user email is required").isLength({max:100})
    .withMessage("This email is too long!")
];

// validate the user data on login
export const validateLoginData = [
    check('password').trim().notEmpty().withMessage("The user passwordis required")
    .isLength({min:10}).withMessage("The user pwassword is too short!"),
    check('email').trim().isEmail().withMessage("Please enter a valid email")
    .notEmpty().withMessage("The user email is required").isLength({max:100})
    .withMessage("This email is too long!")
];

// validate store form data
export const validateStoreData = [
    check('name').trim().notEmpty().withMessage("The store name is required")
    .isLength({min:8}).withMessage("The store name is too short!")
    .isLength({max:60}).withMessage("The store name is too long"),
    check('description').trim().notEmpty().withMessage("The store description is required")
    .isLength({min:50}).withMessage("The store description is too short")
    .isLength({max:400}).withMessage("This store description is too long"),
    check('location').notEmpty().withMessage("Store location is required")
    .isObject({strict:true}).withMessage("Location should be an object"),
    check('dealing_in').notEmpty().withMessage("Please tell us what your store deals in")
    .isArray({min:1,max:20}).withMessage("Dealing in should be an array"),
    check('store_contacts').notEmpty().withMessage("Store contacts are required").isArray()
    .withMessage("Store contacts should be an array"),
    check("plan").notEmpty().withMessage("Payment plan is required")
];

// validate product data
export const validateProductData = [
    check('title').trim().notEmpty().withMessage("The product title is required")
    .isLength({min:8}).withMessage("The product name is too short")
    .isLength({max:40}).withMessage("The product name is too long"),
    check('price').trim().isNumeric().withMessage("The product price must be a number")
    .notEmpty().withMessage("The product price is required")
    .isLength({max:20}).withMessage("The product price may be invalid"),
    check('category').trim().notEmpty().withMessage("The product category is required"),
    check('description').trim().notEmpty().withMessage("The product description is required")
    .isLength({min:100}).withMessage("The product description is too short")
    .isLength({max:400}).withMessage("The product description is too long"),
    check('quantity').isNumeric().withMessage("The quantity should be numeric")
    .notEmpty().withMessage("The product quantity is required")
]