import express from "express";
import ExpensesRepo from "../repos/incomes";

const router = express.Router();

router.get("/api/incomes", async (_req, res, next) => {
  try {
    const resData = await ExpensesRepo.getAllIncomes();
    return res.status(200).send(resData);
  } catch (error) {
    next(error);
  }
});

router.get("/api/incomes/:incomeId", async (req, res, next) => {
  const { incomeId } = req.params;
  try {
    const resData = await ExpensesRepo.getIncome(incomeId);
    return res.status(200).send(resData);
  } catch (error) {
    next(error);
  }
});

router.post("/api/incomes", async (req, res, next) => {
  const body = req.body;
  try {
    const resData = await ExpensesRepo.createIncome(body);
    return res.status(201).send(resData);
  } catch (error) {
    next(error);
  }
});

export default router;
