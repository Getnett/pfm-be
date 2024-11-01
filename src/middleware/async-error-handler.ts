import { NextFunction, Request, Response } from "express";

const asyncErrorHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export default asyncErrorHandler;
