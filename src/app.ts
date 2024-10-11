import express from "express";
import expensesRoute from "./routes/expenses";
export default () => {
  const app = express();

  app.use(express.json());

  app.use(expensesRoute);

  return app;
};
