import { NextFunction, Request, Response } from "express";

interface ErrorResponseType {
  status: string;
  message: string;
  stack?: Object;
}
const globalErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const response: ErrorResponseType = {
    status: "error",
    message: err.isOperational ? err.message : "Something went wrong",
  };

  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  return res.status(statusCode).send(response);
};

export default globalErrorHandler;
