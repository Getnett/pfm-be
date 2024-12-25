import express, { NextFunction, Request, Response } from "express";
import asyncErrorHandler from "../middleware/async-error-handler";
import TransactionsRepo from "../repos/transactions";

const router = express.Router();

router.get(
  "/api/transactions",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { month, year } = req.query;
      const resData = await TransactionsRepo.getTransactions(
        Number(month),
        Number(year)
      );
      res.status(200).send(resData);
    }
  )
);

export default router;
