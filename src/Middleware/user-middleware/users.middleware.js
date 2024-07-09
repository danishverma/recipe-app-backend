import { jwtDecode } from "jwt-decode";
import userSignUpSchema from "../../validations/users-validations/users.validaitons.js";
import usersServices from "../../services/users-service/users.services.js";
import { commonMessages } from "../../utils/constants.js";

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

const checkRole = async (req, res, next) => {
    try {
        const token = req.headers.token
        console.log(token, 'token from header');
        const decodedToken = jwtDecode(token)
        console.log(decodedToken, 'decodedToken');
        const userDetails = await usersServices.fetchSingleData({ "id": decodedToken.id }).catch((error) => {
            throw commonMessages.INTERNAL_SERVER_ERROR
        })
        console.log(userDetails, 'userDetails');
        const role = userDetails.data.role
        if (role === 'SUPER_ADMIN') {
            next()
        }
        else {
            return res.status(403).json({ message: "Forbidden" })
        }
    } catch (error) {
        return res.status(403).json({ message: "Forbidden" })
    }
}

export default {
    signUpMiddleware,
    checkRole
}