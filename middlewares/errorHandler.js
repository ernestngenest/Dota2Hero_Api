let errorHandler = (error, req, res, next) => {
    // console.log(error, "ini err");
    let status = error.status || 500;
    // console.log(error.status, "ini status ");
    let message = error.message || "Internal Server Error";
    // console.log("message: ", message);

    switch (error.name) {
        case "SequelizeUniqueConstraintError":
        case "SequelizeValidationError":
            status = 401;
            message = error.errors[0].message;
            break;
        case "JsonWebTokenError":
            status = 401;
            message = "invalid token";
            break;
    }

    res.status(status).json({
        message: message,
    });
};

module.exports = errorHandler;