import express from "express";
import expensesRoute from "./routes/expenses";
import incomesRoute from "./routes/incomes";
import budgetsRoute from "./routes/budgets";
import expenseAnalyticsRoute from "./routes/analytics/expenses";
import incomeAnalyticsRoute from "./routes/analytics/incomes";
import financialGoalsRoute from "./routes/financial_goals";

export default () => {
  const app = express();

  app.use(express.json());

  app.use(expensesRoute);

  app.use(incomesRoute);

  app.use(expenseAnalyticsRoute);

  app.use(incomeAnalyticsRoute);

  app.use(budgetsRoute);

  app.use(financialGoalsRoute);

  return app;
};
