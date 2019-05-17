import validator from "validator";

const registerSanitize = (input) => {
    
    input.username = validator.trim(input.username);
    input.username = validator.escape(input.username);

    input.email = validator.trim(input.email);
    input.email = validator.escape(input.email);

    input.password = validator.trim(input.password);
    input.password = validator.escape(input.password);

    input.password2 = validator.trim(input.password2);
    input.password2 = validator.escape(input.password2);
};

export default registerSanitize;