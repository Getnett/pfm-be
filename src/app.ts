import express from "express";
import expensesRoute from "./routes/expenses";
import incomesRoute from "./routes/incomes";
import expenseAnalyticsRoute from "./routes/analytics/expenses";
import incomeAnalyticsRoute from "./routes/analytics/incomes";

export default () => {
  const app = express();

  app.use(express.json());

  app.use(expensesRoute);

  app.use(incomesRoute);

  app.use(expenseAnalyticsRoute);

  app.use(incomeAnalyticsRoute);

  return app;
};
