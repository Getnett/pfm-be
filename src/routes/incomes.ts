import express, { NextFunction, Request, Response } from "express";
import IncomesRepo from "../repos/incomes";
import asyncErrorHandler from "../middleware/async-error-handler";

const router = express.Router();

router.get(
  "/api/incomes",
  asyncErrorHandler(
    async (_req: Request, res: Response, _next: NextFunction) => {
      const resData = await IncomesRepo.getAllIncomes();
      res.status(200).send(resData);
    }
  )
);

router.get(
  "/api/incomes/:incomeId",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { incomeId } = req.params;
      const resData = await IncomesRepo.getIncome(incomeId);
      res.status(200).send(resData);
    }
  )
);

router.post(
  "/api/incomes",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const body = req.body;
      const resData = await IncomesRepo.createIncome(body);
      res.status(201).send(resData);
    }
  )
);

router.put(
  "/api/incomes/:incomeId",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { incomeId } = req.params;
      const body = req.body;
      const resData = await IncomesRepo.updateIncome(incomeId, body);
      res.status(200).send(resData);
    }
  )
);

router.delete(
  "/api/incomes/:incomeId",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { incomeId } = req.params;
      await IncomesRepo.deleteIncome(incomeId);
      return res.status(200).send("Income deleted successfully");
    }
  )
);

export default router;
