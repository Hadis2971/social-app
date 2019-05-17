import validator from "validator";

const loginSanitize = (input) => {
    
    input.email = validator.trim(input.email);
    input.email = validator.escape(input.email);

    input.password = validator.trim(input.password);
    input.password = validator.escape(input.password);
};

export default loginSanitize;