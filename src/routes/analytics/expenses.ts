import express from "express";
import ExpenseAnalytics from "../../repos/analytics/expenses/analytics";

const router = express.Router();

router.get("/api/analytics/expenses/monthly_data", async (req, res, next) => {
  const { month, year } = req.query;
  try {
    const resData = await ExpenseAnalytics.getMonthlyAnalytics(
      Number(month),
      Number(year)
    );

    return res.status(200).send(resData);
  } catch (error) {
    next(error);
  }
});
router.get(
  "/api/analytics/expenses/monthly_daily_spend",
  async (req, res, next) => {
    const { month, year } = req.query;

    try {
      const resData = await ExpenseAnalytics.getMonthlyDailySpend(
        Number(month),
        Number(year)
      );

      return res.status(200).send(resData);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/api/analytics/expenses/yearly_data", async (req, res, next) => {
  try {
    const { year } = req.query;
    const resData = await ExpenseAnalytics.getYearlyAnalytics(Number(year));
    return res.status(200).send(resData);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/api/analytics/expenses/yearly_monthly_spend",
  async (req, res, next) => {
    const { year } = req.query;
    try {
      const resData = await ExpenseAnalytics.getYearlyMonthlySpend(
        Number(year)
      );
      return res.status(200).send(resData);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
