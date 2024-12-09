"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const expenses_1 = __importDefault(require("./routes/expenses"));
const incomes_1 = __importDefault(require("./routes/incomes"));
const budgets_1 = __importDefault(require("./routes/budgets"));
const expenses_2 = __importDefault(require("./routes/analytics/expenses"));
const incomes_2 = __importDefault(require("./routes/analytics/incomes"));
const financial_goals_1 = __importDefault(require("./routes/financial_goals"));
const accounts_1 = __importDefault(require("./routes/accounts"));
const not_found_1 = __importDefault(require("./routes/not-found"));
const global_error_handler_1 = __importDefault(require("./middleware/global-error-handler"));
exports.default = () => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
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
    app.use(expenses_1.default);
    app.use(incomes_1.default);
    app.use(expenses_2.default);
    app.use(incomes_2.default);
    app.use(budgets_1.default);
    app.use(financial_goals_1.default);
    app.use(accounts_1.default);
    // before all other routes
    app.use(not_found_1.default);
    // before all middlewares
    app.use(global_error_handler_1.default);
    return app;
};
