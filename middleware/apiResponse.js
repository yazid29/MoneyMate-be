const { logEvents } = require('./logger'); 

function success(res, data, message = "Operation successful", metadata = {}) {
    return res.status(200).json({
        status: "success",
        code: 200,
        message: message,
        data: data,
        metadata: { ...metadata, timestamp: new Date().toISOString() }
    });
}

// Middleware untuk respons error (dengan integrasi logging)
function error(err, req, res, next) {
    let statusCode = err.statusCode || 500;
    let customMessage = err.message || "An unexpected error occurred.";
    let errors = [];

    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin || 'N/A'}`, 'errLog.log');
    
    if (err.stack) {
        logEvents(`Stack: ${err.stack}`, 'errLog.log');
    }
    
    if (err.name === 'ValidationError') {
        statusCode = 400;
        customMessage = "Input validation failed.";
        errors = err.details ? err.details.map(detail => ({
            field: detail.path,
            message: detail.message,
            code: 'VALIDATION_ERROR'
        })) : [{ message: err.message }];
    } else if (err.name === 'UnauthorizedError' || statusCode === 401) {
        statusCode = 401;
        customMessage = "Authentication required.";
        errors.push({ message: err.message || "Invalid credentials or token expired.", code: 'UNAUTHORIZED' });
    } else if (err.name === 'NotFoundError' || statusCode === 404) {
        statusCode = 404;
        customMessage = err.message || "Resource not found.";
        errors.push({ message: err.message || "Resource not found.", code: 'NOT_FOUND' });
    } else {
        errors.push({ message: "Internal server error." });
        console.error("Internal Server Error:", err); 
    }

    return res.status(statusCode).json({
        status: "error",
        code: statusCode,
        message: customMessage,
        errors: errors,
        metadata: {
            timestamp: new Date().toISOString(),
            trace_id: req.headers['x-request-id'] || 'N/A'
        }
    });
}

module.exports = {
    successResponse: success,
    errorResponse: error
};