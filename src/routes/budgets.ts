import express from "express";
import BudgetRepo from "../repos/budgets";

const router = express.Router();

router.get("/api/budgets/monthly/:month/:year", async (req, res, next) => {
  const { month, year } = req.params;
  try {
    const resData = await BudgetRepo.getAllMonthlyBudgets(
      Number(month),
      Number(year)
    );
    return res.status(200).send(resData);
  } catch (error) {
    next(error);
  }
});
router.get("/api/budgets/yearly/:year", async (req, res, next) => {
  const { year } = req.params;
  try {
    const resData = await BudgetRepo.getAllYearlyBudgets(Number(year));
    return res.status(200).send(resData);
  } catch (error) {
    next(error);
  }
});

router.post("/api/budgets", async (req, res, next) => {
  const payload = req.body;

  try {
    const resData = await BudgetRepo.createMonthlyBudget(payload);
    return res.status(201).send(resData);
  } catch (error) {
    next(error);
  }
});

router.patch("/api/budgets/:budgetId", async (req, res, next) => {
  const { budgetId } = req.params;
  const payload = req.body;
  try {
    const resData = await BudgetRepo.updateBudget(budgetId, payload);
    return res.status(200).send(resData);
  } catch (error) {
    next(error);
  }
});

router.delete("/api/budgets/:budgetId", async (req, res, next) => {
  const { budgetId } = req.params;

  try {
    const resData = await BudgetRepo.deleteBudget(budgetId);
    res.status(200).send("Deleted successfully");
  } catch (error) {
    next(error);
  }
});

export default router;
