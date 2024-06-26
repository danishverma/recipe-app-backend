import userSignUpSchema from "../../validations/users-validations/users.validaitons.js";

const signUpMiddleware = (req, res, next) => {
    const { error, value } = userSignUpSchema.validate(req.body, {
        aboutEarly: false
    })
    if (error) {
        const fieldErrors = {};
        error.details.forEach(detail => {
            const fieldName = detail.path.join('.');
            fieldErrors[fieldName] = detail.message;
        });
        return res.status(400).send({ errors: fieldErrors });
    }
    next()

}

export default signUpMiddleware