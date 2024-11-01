import express, { NextFunction, Request, Response } from "express";
import FinancialGoalRepo from "../repos/financial_goals";
import asyncErrorHandler from "../middleware/async-error-handler";

const router = express.Router();

router.post(
  "/api/financial_goals",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const payload = req.body;
      const resData = await FinancialGoalRepo.createFinancialGoal(payload);
      res.status(201).send(resData);
    }
  )
);

router.get(
  "/api/financial_goals/:year",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { year } = req.params;
      const resData = await FinancialGoalRepo.getAllFinancialGoals(
        Number(year)
      );
      res.status(200).send(resData);
    }
  )
);

router.patch(
  "/api/financial_goals/:financialGoalId",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { financialGoalId } = req.params;
      const payload = req.body;
      const resData = await FinancialGoalRepo.updateFinancialGoal(
        financialGoalId,
        payload
      );
      res.status(200).send(resData);
    }
  )
);

router.delete(
  "/api/financial_goals/:financialGoalId",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { financialGoalId } = req.params;
      await FinancialGoalRepo.deleteFinancialGoal(financialGoalId);
      res.status(200).send("Successfully deleted!");
    }
  )
);

// Financial goal contributions

router.post(
  "/api/financial_goals/contributions",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const payload = req.body;
      const resData = await FinancialGoalRepo.createFinancialGoalContrubutions(
        payload
      );
      res.status(201).send(resData);
    }
  )
);

router.get(
  "/api/financial_goals/contributions/:financialGoalId",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { financialGoalId } = req.params;
      const resData =
        await FinancialGoalRepo.getAllContributionsForFinancialGoalContribution(
          Number(financialGoalId)
        );

      res.status(200).send(resData);
    }
  )
);

router.patch(
  "/api/financial_goals/contributions/:goalContributionId",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { goalContributionId } = req.params;
      const payload = req.body;
      const resData = await FinancialGoalRepo.updateFinancialGoalContribution(
        goalContributionId,
        payload
      );
      res.status(200).send(resData);
    }
  )
);

router.delete(
  "/api/financial_goals/contributions/:goalContributionId",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { goalContributionId } = req.params;
      await FinancialGoalRepo.deleteFinancialGoalContribution(
        goalContributionId
      );
      res.status(200).send("Deleted successfully!");
    }
  )
);

export default router;
