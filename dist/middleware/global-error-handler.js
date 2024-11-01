"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (err, _req, res, _next) => {
    const statusCode = err.statusCode || 500;
    const response = {
        status: "error",
        message: err.isOperational ? err.message : "Something went wrong",
    };
    if (process.env.NODE_ENV === "development") {
        response.stack = err.stack;
    }
    return res.status(statusCode).send(response);
};
exports.default = globalErrorHandler;
