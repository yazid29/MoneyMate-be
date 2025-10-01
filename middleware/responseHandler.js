const { logEvents } = require('../utils/logger'); 
const { statusMsg } = require('../utils/constant');
function success(data,res,statusCode, detailMessage,metadata = {}) {
    return res.status(statusCode).json({
        code: statusCode,
        status: statusMsg[statusCode],
        message: detailMessage,
        data: data,
        metadata: { ...metadata, timestamp: new Date().toISOString() }
    });
}

// Middleware untuk respons error (dengan integrasi logging)
function error(errorMessage, req, res, code) {
    // console.log('errorMessage.statusCode',code);
    
    let statusCode = code!=null && code != undefined? code : 500;
    let statusMessage = statusMsg[statusCode];
    let errors = errorMessage.message? errorMessage.message:errorMessage;

    let errorMsg = `${req.method}\t${req.url}\t`;
    if(errorMessage.message != undefined) {
        errorMsg = errorMsg+`${errorMessage.statusCode}\t${errorMessage.message}`;
    }else{
        errorMsg = errorMsg+`${errorMessage}`;
    }
    
    if (errorMessage.stack) {
        logEvents(`Stack: ${errorMessage.stack}`, 'errLog.log');
    }else{
        logEvents(errorMsg, 'errLog.log');
    }

    return res.status(statusCode).json({
        code: statusCode,
        status: "error",
        message: statusMessage,
        message_detail: errors,
        metadata: {
            timestamp: new Date().toISOString(),
            trace_id: req.headers['x-request-id'] || 'N/A'
        }
    });
}
const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const errorLogMsg = `${req.method}\t${req.url}\t${statusCode}\t${err.message}`;
    if (statusCode === 500 && err.stack) {
        logEvents(`Stack: ${err.stack}`, 'errLog.log');
    } else {
        logEvents(errorLogMsg, 'errLog.log');
    }

    const statusMessage = statusMsg[statusCode] || 'Server Error';

    const messageDetail = (statusCode === 500 && process.env.NODE_ENV === 'production') 
        ? 'Something went wrong on the server.' 
        : err.message; 
    
    return res.status(statusCode).json({
        code: statusCode,
        status: "error",
        message: statusMessage,
        message_detail: messageDetail,
        metadata: {
            timestamp: new Date().toISOString(),
            trace_id: req.headers['x-request-id'] || 'N/A'
        }
    });
};

module.exports = {
    successResponse: success,
    errorResponse: globalErrorHandler
    // errorResponse: error
};