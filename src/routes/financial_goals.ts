import express from "express";
import FinancialGoalRepo from "../repos/financial_goals";

const router = express.Router();

router.post("/api/financial_goals", async (req, res, next) => {
  const payload = req.body;
  try {
    const resData = await FinancialGoalRepo.createFinancialGoal(payload);
    return res.status(201).send(resData);
  } catch (error) {
    next(error);
  }
});

router.get("/api/financial_goals/:year", async (req, res, next) => {
  const { year } = req.params;
  try {
    const resData = await FinancialGoalRepo.getAllFinancialGoals(Number(year));
    return res.status(200).send(resData);
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/api/financial_goals/:financialGoalId",
  async (req, res, next) => {
    const { financialGoalId } = req.params;
    const payload = req.body;
    try {
      const resData = await FinancialGoalRepo.updateFinancialGoal(
        financialGoalId,
        payload
      );
      return res.status(200).send(resData);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/api/financial_goals/:financialGoalId",
  async (req, res, next) => {
    const { financialGoalId } = req.params;
    try {
      const resData = await FinancialGoalRepo.deleteFinancialGoal(
        financialGoalId
      );
      return res.status(200).send("Successfully deleted!");
    } catch (error) {
      next(error);
    }
  }
);

// Financial goal contributions

router.post("/api/financial_goals/contributions", async (req, res, next) => {
  const payload = req.body;
  try {
    const resData = await FinancialGoalRepo.createFinancialGoalContrubutions(
      payload
    );
    return res.status(201).send(resData);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/api/financial_goals/contributions/:financialGoalId",
  async (req, res, next) => {
    const { financialGoalId } = req.params;
    try {
      const resData =
        await FinancialGoalRepo.getAllContributionsForFinancialGoalContribution(
          Number(financialGoalId)
        );

      return res.status(200).send(resData);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/api/financial_goals/contributions/:goalContributionId",
  async (req, res, next) => {
    const { goalContributionId } = req.params;
    const payload = req.body;
    try {
      const resData = await FinancialGoalRepo.updateFinancialGoalContribution(
        goalContributionId,
        payload
      );
      return res.status(200).send(resData);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/api/financial_goals/contributions/:goalContributionId",
  async (req, res, next) => {
    const { goalContributionId } = req.params;
    try {
      const resData = await FinancialGoalRepo.deleteFinancialGoalContribution(
        goalContributionId
      );
      return res.status(200).send("Deleted successfully!");
    } catch (error) {
      next(error);
    }
  }
);

export default router;
