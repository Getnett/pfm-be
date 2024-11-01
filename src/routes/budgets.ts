import express, { NextFunction, Request, Response } from "express";
import BudgetRepo from "../repos/budgets";
import asyncErrorHandler from "../middleware/async-error-handler";

const router = express.Router();

router.get(
  "/api/budgets/monthly/:month/:year",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { month, year } = req.params;
      const resData = await BudgetRepo.getAllMonthlyBudgets(
        Number(month),
        Number(year)
      );
      res.status(200).send(resData);
    }
  )
);
router.get(
  "/api/budgets/yearly/:year",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { year } = req.params;
      const resData = await BudgetRepo.getAllYearlyBudgets(Number(year));
      res.status(200).send(resData);
    }
  )
);

router.post(
  "/api/budgets",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const payload = req.body;
      const resData = await BudgetRepo.createMonthlyBudget(payload);
      res.status(201).send(resData);
    }
  )
);

router.patch(
  "/api/budgets/:budgetId",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { budgetId } = req.params;
      const payload = req.body;
      const resData = await BudgetRepo.updateBudget(budgetId, payload);
      res.status(200).send(resData);
    }
  )
);

router.delete(
  "/api/budgets/:budgetId",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { budgetId } = req.params;
      await BudgetRepo.deleteBudget(budgetId);
      res.status(200).send("Deleted successfully");
    }
  )
);

export default router;
