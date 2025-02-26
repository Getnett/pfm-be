import express, { NextFunction, Request, Response } from "express";
import ExpenseAnalytics from "../../repos/analytics/expenses/analytics";
import asyncErrorHandler from "../../middleware/async-error-handler";

const router = express.Router();

router.get(
  "/api/analytics/expenses/monthly_data",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { month, year } = req.query;
      console.log("req.query", req.query);
      const resData = await ExpenseAnalytics.getMonthlyAnalytics(
        Number(month),
        Number(year)
      );
      res.status(200).send(resData);
    }
  )
);
router.get(
  "/api/analytics/expenses/monthly_daily_spend",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { month, year } = req.query;
      const resData = await ExpenseAnalytics.getMonthlyDailySpend(
        Number(month),
        Number(year)
      );
      res.status(200).send(resData);
    }
  )
);

router.get(
  "/api/analytics/expenses/monthly_total_spend",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { month, year } = req.query;
      const resData = await ExpenseAnalytics.getMonthlyTotalSpend(
        Number(month),
        Number(year)
      );
      res.status(200).send(resData);
    }
  )
);

router.get(
  "/api/analytics/expenses/yearly_data",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { year } = req.query;
      const resData = await ExpenseAnalytics.getYearlyAnalytics(Number(year));
      res.status(200).send(resData);
    }
  )
);

router.get(
  "/api/analytics/expenses/category_yearly_data",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { catId, year } = req.query;
      const resData =
        await ExpenseAnalytics.getYearlyExpenseAnalyticsByCategory(
          Number(catId),
          Number(year)
        );

      res.status(200).send(resData);
    }
  )
);

router.get(
  "/api/analytics/expenses/category_monthly_data",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { catId, month, year } = req.query;
      const resData =
        await ExpenseAnalytics.getMonthlyExpenseAnalyticsByCategory(
          Number(catId),
          Number(month),
          Number(year)
        );

      res.status(200).send(resData);
    }
  )
);

router.get(
  "/api/analytics/expenses/yearly_monthly_spend",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { year } = req.query;
      const resData = await ExpenseAnalytics.getYearlyMonthlySpend(
        Number(year)
      );
      res.status(200).send(resData);
    }
  )
);

export default router;
