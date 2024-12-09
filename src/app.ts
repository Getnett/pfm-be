import express from "express";
import cors from "cors";
import expensesRoute from "./routes/expenses";
import incomesRoute from "./routes/incomes";
import budgetsRoute from "./routes/budgets";
import expenseAnalyticsRoute from "./routes/analytics/expenses";
import incomeAnalyticsRoute from "./routes/analytics/incomes";
import financialGoalsRoute from "./routes/financial_goals";
import accountsRoute from "./routes/accounts";
import notFoundRoute from "./routes/not-found";
import globalErrorHandler from "./middleware/global-error-handler";

export default () => {
  const app = express();

  app.use(cors());

  app.use(express.json());

  app.get("/", (_req, res) => {
    // Send a response to the client
    res.send(`
     <html>
           <head>
             <title>Personal finance managment project</title>
           </head>
           <body>
            <h1>Personal finance managment app updated!</h1>
           </body>
      </html>`);
  });

  app.use(expensesRoute);

  app.use(incomesRoute);

  app.use(expenseAnalyticsRoute);

  app.use(incomeAnalyticsRoute);

  app.use(budgetsRoute);

  app.use(financialGoalsRoute);

  app.use(accountsRoute);

  // before all other routes
  app.use(notFoundRoute);

  // before all middlewares

  app.use(globalErrorHandler);

  return app;
};
