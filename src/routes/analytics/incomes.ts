import express, { NextFunction, Request, Response } from "express";
import IncomeAnalytics from "../../repos/analytics/incomes/analytics";
import asyncErrorHandler from "../../middleware/async-error-handler";

const router = express.Router();

router.get(
  "/api/analytics/incomes/monthly_data",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { month, year } = req.query;
      const resData = await IncomeAnalytics.getMonthlyAnalytics(
        Number(month),
        Number(year)
      );
      res.status(200).send(resData);
    }
  )
);
router.get(
  "/api/analytics/incomes/monthly_daily_sources",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { month, year } = req.query;
      const resData = await IncomeAnalytics.getMonthlyDailySourceIncomes(
        Number(month),
        Number(year)
      );
      res.status(200).send(resData);
    }
  )
);

router.get(
  "/api/analytics/incomes/monthly_total_income",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { month, year } = req.query;
      const resData = await IncomeAnalytics.getTotalMonthlyIncome(
        Number(month),
        Number(year)
      );
      res.status(200).send(resData);
    }
  )
);

// income-source-yearly-data?icsId
router.get(
  "/api/analytics/incomes/yearly_data",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { year } = req.query;
      const resData = await IncomeAnalytics.getYearlyAnalytics(Number(year));
      res.status(200).send(resData);
    }
  )
);
router.get(
  "/api/analytics/incomes/income-source-yearly-data",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { icsId, year } = req.query;
      const resData =
        await IncomeAnalytics.getYearlyIncomeAnalyticsByIncomeSource(
          Number(icsId),
          Number(year)
        );
      res.status(200).send(resData);
    }
  )
);

router.get(
  "/api/analytics/incomes/yearly_monthly_sources",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { year } = req.query;
      const resData = await IncomeAnalytics.getYearlyMontlyIncomeSources(
        Number(year)
      );
      res.status(200).send(resData);
    }
  )
);

export default router;
