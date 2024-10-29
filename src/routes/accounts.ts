import express from "express";
import AccountsRepo from "../repos/accounts";

const router = express.Router();

router.get("/api/accounts", async (_req, res, next) => {
  try {
    const resData = await AccountsRepo.getAllAccounts();
    res.status(200).send(resData);
  } catch (error) {
    next(error);
  }
});

router.post("/api/accounts", async (req, res, next) => {
  const payload = req.body;
  try {
    const resData = await AccountsRepo.createAccount(payload);
    res.status(201).send(resData);
  } catch (error) {
    next(error);
  }
});

router.put("/api/accounts/:accountId", async (req, res, next) => {
  const { accountId } = req.params;
  const payload = req.body;
  try {
    const resData = await AccountsRepo.updateAccount(accountId, payload);
    res.status(200).send(resData);
  } catch (error) {
    next(error);
  }
});

router.delete("/api/accounts/:accountId", async (req, res, next) => {
  const { accountId } = req.params;
  try {
    await AccountsRepo.deleteAccount(accountId);
    res.status(200).send("Deleted successfully!");
  } catch (error) {
    next(error);
  }
});

export default router;
