import express from "express";
import expensesRoute from "./routes/expenses";
import incomesRoute from "./routes/incomes";
export default () => {
  const app = express();

  app.use(express.json());

  app.use(expensesRoute);

  app.use(incomesRoute);

  return app;
};
