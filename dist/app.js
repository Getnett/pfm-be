"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const expenses_1 = __importDefault(require("./routes/expenses"));
const incomes_1 = __importDefault(require("./routes/incomes"));
const transactions_1 = __importDefault(require("./routes/transactions"));
const budgets_1 = __importDefault(require("./routes/budgets"));
const expenses_2 = __importDefault(require("./routes/analytics/expenses"));
const incomes_2 = __importDefault(require("./routes/analytics/incomes"));
const financial_goals_1 = __importDefault(require("./routes/financial_goals"));
const accounts_1 = __importDefault(require("./routes/accounts"));
const categories_1 = __importDefault(require("./routes/categories"));
const income_sources_1 = __importDefault(require("./routes/income_sources"));
const account_types_1 = __importDefault(require("./routes/account-types"));
const ai_assistant_1 = __importDefault(require("./routes/ai-assistant"));
const not_found_1 = __importDefault(require("./routes/not-found"));
const global_error_handler_1 = __importDefault(require("./middleware/global-error-handler"));
exports.default = () => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    }));
    app.use(expenses_1.default);
    app.use(incomes_1.default);
    app.use(transactions_1.default);
    app.use(expenses_2.default);
    app.use(incomes_2.default);
    app.use(budgets_1.default);
    app.use(financial_goals_1.default);
    app.use(accounts_1.default);
    app.use(categories_1.default);
    app.use(income_sources_1.default);
    app.use(account_types_1.default);
    app.use(ai_assistant_1.default);
    // before all other routes
    app.use(not_found_1.default);
    // before all middlewares
    app.use(global_error_handler_1.default);
    return app;
};
