import Joi from 'joi'

const userSignUpSchema = Joi.object({
    first_name: Joi.string().required().min(3).max(20).pattern(/^[a-zA-Z\s-]+$/),
    last_name: Joi.string().required().min(3).max(20).pattern(/^[a-zA-Z\s-]+$/),
    email: Joi.string().email().required().pattern(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i),
    contact: Joi.string().required().pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/),
    password: Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/)
})

export default userSignUpSchema