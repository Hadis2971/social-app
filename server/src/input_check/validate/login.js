import validator from "validator";
import isEmpty from "is-empty";
import { handleEmptyInput } from "../../helpers";

const loginValidation = (input) => {
    let errors = {};
    handleEmptyInput(input);
    
    if (validator.isEmpty(input.email)) {
        errors.email = "The Email Field is Required!!!";
    } else if (!validator.isEmail(input.email)) {
        errors.email = "Please Enter a Valid Email Address!!!";
    }

    if (validator.isEmpty(input.password)) {
        errors.password = "The Password Field is Required!!!";
    } 
    
    return {
        errors, 
        isValid: isEmpty(errors)
    }
};

export default loginValidation;