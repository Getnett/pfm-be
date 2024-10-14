import express from "express";
import IncomesRepo from "../repos/incomes";

const router = express.Router();

router.get("/api/incomes", async (_req, res, next) => {
  try {
    const resData = await IncomesRepo.getAllIncomes();
    return res.status(200).send(resData);
  } catch (error) {
    next(error);
  }
});

router.get("/api/incomes/:incomeId", async (req, res, next) => {
  const { incomeId } = req.params;
  try {
    const resData = await IncomesRepo.getIncome(incomeId);
    return res.status(200).send(resData);
  } catch (error) {
    next(error);
  }
});

router.post("/api/incomes", async (req, res, next) => {
  const body = req.body;
  try {
    const resData = await IncomesRepo.createIncome(body);
    return res.status(201).send(resData);
  } catch (error) {
    next(error);
  }
});

router.patch("/api/incomes/:incomeId", async (req, res, next) => {
  const { incomeId } = req.params;
  const body = req.body;
  try {
    const resData = await IncomesRepo.updateIncome(incomeId, body);
    return res.status(200).send(resData);
  } catch (error) {
    next(error);
  }
});

router.delete("/api/incomes/:incomeId", async (req, res) => {
  const { incomeId } = req.params;
  const resData = await IncomesRepo.deleteIncome(incomeId);
  console.log(resData);
  return res.status(200).send("Income deleted successfully");
});

export default router;
