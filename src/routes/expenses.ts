import express, { NextFunction, Request, Response } from "express";
import ExpensesRepo from "../repos/expenses";
import asyncErrorHandler from "../middleware/async-error-handler";

const router = express.Router();

router.get(
  "/api/expenses",
  asyncErrorHandler(
    async (_req: Request, res: Response, _next: NextFunction) => {
      const resData = await ExpensesRepo.getAllExpenses();
      res.status(200).send(resData);
    }
  )
);

router.get(
  "/api/expenses/:expenseId",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { expenseId } = req.params;
      const resData = await ExpensesRepo.getExpense(expenseId);
      res.status(200).send(resData);
    }
  )
);

router.post(
  "/api/expenses",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const body = req.body;
      const resData = await ExpensesRepo.createExpense(body);
      res.status(201).send(resData);
    }
  )
);

router.delete(
  "/api/expenses/:expenseId",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { expenseId } = req.params;
      await ExpensesRepo.deleteExpense(expenseId);
      res.status(200).send("Expense deleted successfully");
    }
  )
);
router.put(
  "/api/expenses/:expenseId",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { expenseId } = req.params;
      const body = req.body;
      const resData = await ExpensesRepo.updateExpense(expenseId, body);
      res.status(200).send(resData);
    }
  )
);

export default router;
