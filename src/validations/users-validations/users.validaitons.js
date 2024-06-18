import Joi from 'joi'

const userSignUpSchema = Joi.object({
    first_name: Joi.string().required().min(3).max(15),
    last_name: Joi.string().required().min(3).max(15),
    email: Joi.string().email().required(),
    contact: Joi.string().required().length(10).pattern(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/),
    password: Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).message({ "string.pattern.base": "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character" })
})

export default userSignUpSchema