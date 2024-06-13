import Joi from 'joi'

const userSignUpSchema = Joi.object({
    first_name: Joi.string().required().min(3).max(15),
    last_name: Joi.string().required().min(3).max(15),
    email: Joi.string().email().required(),
    contact: Joi.string().required().length(10).pattern(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/),
    password: Joi.string().required().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).message({ "string.pattern.base": "Password should be must contain minimum one character and one digit." })
})

export default userSignUpSchema