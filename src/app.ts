import express from "express";
import expensesRoute from "./routes/expenses";
import incomesRoute from "./routes/incomes";
import expenseAnalyticsRoute from "./routes/analytics/expenses";

export default () => {
  const app = express();

  app.use(express.json());

  app.use(expensesRoute);

  app.use(incomesRoute);

  app.use(expenseAnalyticsRoute);

  return app;
};
