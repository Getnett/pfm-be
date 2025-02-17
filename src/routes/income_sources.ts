import express, { NextFunction, Request, Response } from "express";
import asyncErrorHandler from "../middleware/async-error-handler";
import IncomeSourceRepo from "../repos/income_sources";
const router = express.Router();

router.get(
  "/api/income-sources",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const resData = await IncomeSourceRepo.getAllIncomeSources();
      res.status(200).send(resData);
    }
  )
);
// addIncomeSource

router.post(
  "/api/income-sources",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { incomeSource } = req.body;
      const resData = await IncomeSourceRepo.createIncomeSource(incomeSource);
      res.status(200).send(resData);
    }
  )
);
export default router;
