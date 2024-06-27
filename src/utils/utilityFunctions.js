import mongoose from "mongoose"

export const generateResponse = (res, data=[], statusCode=200, message= "SUCCESS") => {
    return res.status(statusCode).json({
        status: statusCode,
        message,
        data
    })
}

export const convertMongoosId = (id) => {
    return new mongoose.Types.ObjectId(id)
}