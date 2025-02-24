import express, { NextFunction, Request, Response } from "express";
import AccountsRepo from "../repos/accounts";
import asyncErrorHandler from "../middleware/async-error-handler";

const router = express.Router();

router.get(
  "/api/accounts",
  asyncErrorHandler(
    async (_req: Request, res: Response, _next: NextFunction) => {
      const resData = await AccountsRepo.getAllAccounts();
      res.status(200).send(resData);
    }
  )
);

router.get(
  "/api/account-list",
  asyncErrorHandler(
    async (_req: Request, res: Response, _next: NextFunction) => {
      const resData = await AccountsRepo.getAllAccountList();
      res.status(200).send(resData);
    }
  )
);

router.post(
  "/api/accounts",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const payload = req.body;
      const resData = await AccountsRepo.createAccount(payload);
      res.status(201).send(resData);
    }
  )
);

router.put(
  "/api/accounts/:accountId",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { accountId } = req.params;
      const payload = req.body;
      const resData = await AccountsRepo.updateAccount(accountId, payload);
      res.status(200).send(resData);
    }
  )
);

router.delete(
  "/api/accounts/:accountId",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { accountId } = req.params;
      await AccountsRepo.deleteAccount(accountId);
      res.status(200).send("Deleted successfully!");
    }
  )
);

export default router;
