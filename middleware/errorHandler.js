// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);  // Log the error to the console (you can improve logging here)

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;  // Default to 500 if status code is 200
    res.status(statusCode).json({
        message: err.message,  // Send the error message to the client
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,  // Show stack trace only in non-production environments
    });
};

module.exports = errorHandler;
