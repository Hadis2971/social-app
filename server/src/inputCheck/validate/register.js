import validator from "validator";
import isEmpty from "is-empty";
import { handleEmptyInput } from "../../helpers";

const registerValidation = (input) => {
    let errors = {};
    handleEmptyInput(input);
    
    if (validator.isEmpty(input.username)) {
        errors.username = "The Username Field is Required!!!";
    }

    if (validator.isEmpty(input.email)) {
        errors.email = "The Email Field is Required!!!";
    } else if (!validator.isEmail(input.email)) {
        errors.email = "Please Enter a Valid Email Address!!!";
    }

    if (validator.isEmpty(input.password)) {
        errors.password = "The Password Field is Required!!!";
    } else if (!validator.isLength(input.password, {min: 5})) {
        errors.password = "The Password Must be at Least 5 Characters Long!!!";
    }

    if (validator.isEmpty(input.password2)) {
        errors.password2 = "The Confirm Password Field is Required!!!";
    } else if (!validator.equals(input.password2, input.password)) {
        errors.password2 = "The Two Password Fields Must Match!!!";
    }
    
    return {
        errors, 
        isValid: isEmpty(errors)
    }
};

export default registerValidation;