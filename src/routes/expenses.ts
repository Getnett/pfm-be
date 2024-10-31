import express from "express";
import ExpensesRepo from "../repos/expenses";

const router = express.Router();

router.get("/api/expenses", async (_req, res, next) => {
  try {
    const resData = await ExpensesRepo.getAllExpenses();
    return res.status(200).send(resData);
  } catch (error) {
    next(error);
  }
});

router.get("/api/expenses/:expenseId", async (req, res, next) => {
  const { expenseId } = req.params;
  try {
    const resData = await ExpensesRepo.getExpense(expenseId);
    return res.status(200).send(resData);
  } catch (error) {
    next(error);
  }
});

router.post("/api/expenses", async (req, res, next) => {
  const body = req.body;
  try {
    const resData = await ExpensesRepo.createExpense(body);
    return res.status(201).send(resData);
  } catch (error) {
    next(error);
  }
});

router.delete("/api/expenses/:expenseId", async (req, res, next) => {
  const { expenseId } = req.params;
  try {
    await ExpensesRepo.deleteExpense(expenseId);

    return res.status(200).send("Expense deleted successfully");
  } catch (error) {
    next(error);
  }
});
router.put("/api/expenses/:expenseId", async (req, res, next) => {
  const { expenseId } = req.params;
  const body = req.body;
  try {
    const resData = await ExpensesRepo.updateExpense(expenseId, body);
    return res.status(200).send(resData);
  } catch (error) {
    next(error);
  }
});

export default router;
