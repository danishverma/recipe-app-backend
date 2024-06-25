export const generateResponse = (res, data=[], statusCode=200, message= "SUCCESS") => {
    return res.status(statusCode).json({
        status: statusCode,
        message,
        data
    })
}