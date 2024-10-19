import express from "express";
import IncomeAnalytics from "../../repos/analytics/incomes/analytics";

const router = express.Router();

router.get("/api/analytics/incomes/monthly_data", async (req, res, next) => {
  const { month, year } = req.query;
  try {
    const resData = await IncomeAnalytics.getMonthlyAnalytics(
      Number(month),
      Number(year)
    );

    return res.status(200).send(resData);
  } catch (error) {
    next(error);
  }
});
router.get(
  "/api/analytics/incomes/monthly_daily_sources",
  async (req, res, next) => {
    const { month, year } = req.query;

    try {
      const resData = await IncomeAnalytics.getMonthlyDailySourceIncomes(
        Number(month),
        Number(year)
      );

      return res.status(200).send(resData);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/api/analytics/incomes/yearly_data", async (req, res, next) => {
  try {
    const { year } = req.query;
    const resData = await IncomeAnalytics.getYearlyAnalytics(Number(year));
    return res.status(200).send(resData);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/api/analytics/incomes/yearly_monthly_sources",
  async (req, res, next) => {
    const { year } = req.query;
    try {
      const resData = await IncomeAnalytics.getYearlyMontlyIncomeSources(
        Number(year)
      );
      return res.status(200).send(resData);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
