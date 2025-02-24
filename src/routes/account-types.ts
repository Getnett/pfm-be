import express, { NextFunction, Request, Response } from "express";
import asyncErrorHandler from "../middleware/async-error-handler";
import AccountTypeRepo from "../repos/account-types";

const router = express.Router();

router.get(
  "/api/account-type",
  asyncErrorHandler(
    async (_req: Request, res: Response, _next: NextFunction) => {
      const resData = await AccountTypeRepo.getAllAccountTypes();
      res.status(200).send(resData);
    }
  )
);

router.post(
  "/api/account-type",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { accountType } = req.body;
      const resData = await AccountTypeRepo.createAccountType(accountType);
      res.status(200).send(resData);
    }
  )
);

export default router;
